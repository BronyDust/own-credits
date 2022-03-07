import {
  CheckboxVisibility,
  DetailsList,
  IColumn,
  IconButton,
  Stack,
  StackItem,
  Text,
  TooltipHost,
} from "@fluentui/react";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainSurface from "../atoms/MainSurface";
import VerticallyCentered from "../atoms/VerticallyCentered";
import useStorage from "../hooks/useStorage";
import DeleteCreditDialog from "../molecules/DeleteCreditDialog";

type CreditListItem = {
  cost: number;
  name: string;
  uid: string;
  date: string;
  debt: number;
};

const columns: IColumn[] = [
  {
    key: "actions",
    name: "Действия",
    minWidth: 74,
    maxWidth: 74,
    onRender(item: CreditListItem) {
      return (
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <StackItem>
            <DeleteCreditDialog creditUUID={item.uid}>
              {(open) => (
                <TooltipHost content="Удалить">
                  <IconButton
                    onClick={open}
                    iconProps={{ iconName: "Delete" }}
                  />
                </TooltipHost>
              )}
            </DeleteCreditDialog>
          </StackItem>
          <StackItem>
            <TooltipHost content="Открыть">
              <Link to={`/credit/${item.uid}`}>
                <IconButton as="span" iconProps={{ iconName: "OpenFile" }} />
              </Link>
            </TooltipHost>
          </StackItem>
        </Stack>
      );
    },
  },
  {
    key: "name",
    name: "Название / назначение кредита",
    minWidth: 250,
    maxWidth: 250,
    isResizable: true,
    onRender(item: CreditListItem) {
      return (
        <VerticallyCentered>
          <Link to={`/credit/${item.uid}`}>
            <strong>{item.name}</strong>
          </Link>
        </VerticallyCentered>
      );
    },
  },
  {
    key: "debt",
    name: "Долг",
    minWidth: 200,
    onRender(item: CreditListItem) {
      return (
        <VerticallyCentered>
          <strong>{item.debt}₽</strong>/{item.cost}₽
        </VerticallyCentered>
      );
    },
  },
  {
    key: "date",
    name: "Дата",
    minWidth: 200,
    onRender(item: CreditListItem) {
      const date = new Date(item.date);
      return (
        <VerticallyCentered>{date.toLocaleDateString()}</VerticallyCentered>
      );
    },
  },
];

const CreditsTable: FC = () => {
  const navigate = useNavigate();
  const [creditsAsItems, fullDebt] = useStorage((credits) => {
    const items: CreditListItem[] = [];
    let fullDebt = 0;

    for (const [uid, credit] of credits) {
      const { metaData, debt } = credit;
      const { startDate } = metaData.additionalInfo;

      items.push({
        uid,
        name: metaData.name,
        cost: metaData.cost,
        date: startDate,
        debt,
      });

      fullDebt += debt;
    }

    return [items, fullDebt];
  });

  return (
    <MainSurface>
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack tokens={{ childrenGap: 10 }} horizontal verticalAlign="center">
          <Stack.Item>
            <IconButton
              onClick={() => navigate("/new")}
              iconProps={{ iconName: "Add" }}
            />
          </Stack.Item>
          <Stack.Item>
            <Text as="h1" variant="xxLarge">
              Ваши кредиты
            </Text>
          </Stack.Item>
        </Stack>

        <Stack.Item>
          <DetailsList
            disableSelectionZone
            items={creditsAsItems}
            checkboxVisibility={CheckboxVisibility.hidden}
            getKey={(item) => item.uid}
            columns={columns}
          />
        </Stack.Item>
        <Stack.Item>
          <Text>
            <strong>Общий долг: </strong>
            {fullDebt}₽
          </Text>
        </Stack.Item>
      </Stack>
    </MainSurface>
  );
};

export default CreditsTable;
