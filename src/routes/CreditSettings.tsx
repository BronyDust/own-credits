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
import { FC, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainSurface from "../atoms/MainSurface";
import VerticallyCentered from "../atoms/VerticallyCentered";
import useCredit from "../hooks/useCredit";
import NoCreditData from "../molecules/NoCreditData";

const columns: IColumn[] = [
  {
    key: "actions",
    name: "",
    minWidth: 32,
    maxWidth: 32,
    onRender(item: CreditPayment) {
      return (
        <TooltipHost content="Удалить">
          <IconButton
            onClick={item.selfDelete}
            iconProps={{ iconName: "Delete" }}
          />
        </TooltipHost>
      );
    },
  },
  {
    key: "name",
    name: "Имя",
    minWidth: 100,
    maxWidth: 300,
    onRender(item: CreditPayment) {
      return <VerticallyCentered>{item.name}</VerticallyCentered>;
    },
  },
  {
    key: "date",
    name: "Дата",
    minWidth: 100,
    maxWidth: 100,
    onRender(item: CreditPayment) {
      if (typeof item.date === "string")
        return <VerticallyCentered>{item.date}</VerticallyCentered>;

      return (
        <VerticallyCentered>
          {item.date.toLocaleDateString()}
        </VerticallyCentered>
      );
    },
  },
  {
    key: "cost",
    name: "Сумма",
    minWidth: 100,
    onRender(item: CreditPayment) {
      return <VerticallyCentered>{item.cost}₽</VerticallyCentered>;
    },
  },
];

type CreditPayment = {
  uid: string;
  name: string;
  date: Date | "N/A";
  cost: number;
  selfDelete: VoidFunction;
};

const CreditSettings: FC = () => {
  const navigate = useNavigate();
  const { creditId = "" } = useParams();
  const credit = useCredit(creditId);

  const { metaData } = credit || {};

  const startDate = useMemo(() => {
    const { additionalInfo } = metaData || {};

    if (!additionalInfo) return null;
    if (!("startDate" in additionalInfo)) return null;

    if (additionalInfo.startDate instanceof Date)
      return additionalInfo.startDate.toLocaleDateString();

    if (typeof additionalInfo.startDate !== "string") return null;

    try {
      const dateObject = new Date(additionalInfo.startDate);
      return dateObject.toLocaleDateString();
    } catch {
      return null;
    }
  }, [metaData]);

  const tableData = useMemo(() => {
    const { payments } = credit || {};
    if (!payments) return [];

    const view: CreditPayment[] = [];

    for (const [key, payment] of payments) {
      const { date } = payment;

      let dateView: Date | "N/A";

      try {
        dateView = new Date(date);
      } catch {
        dateView = "N/A";
      }

      view.push({
        uid: key,
        name: payment.description,
        date: dateView,
        cost: payment.cost,
        selfDelete: () => {
          credit?.deletePayment(key);
        },
      });
    }

    return view;
    // metaData changes reference on any inner Credit changing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credit, metaData]);

  if (!credit) return <NoCreditData>Такого кредита нет</NoCreditData>;

  const { name } = metaData || {};

  return (
    <MainSurface>
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <IconButton
            onClick={() => navigate("/")}
            iconProps={{ iconName: "Back" }}
            style={{ marginTop: 4 }}
          />
          <Stack>
            <StackItem>
              <Text as="h1" variant="xxLarge">
                {name || "Без имени"}
              </Text>
            </StackItem>
            <Text as="p">
              Создан: <strong>{startDate || "неизвестно"}</strong>
            </Text>
          </Stack>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <IconButton
            onClick={() => navigate(`/credit/${creditId}/add-payment`)}
            iconProps={{ iconName: "Add" }}
          />
          <StackItem>
            <Text as="h2" variant="xLarge">
              Платежи
            </Text>
          </StackItem>
        </Stack>
        <DetailsList
          disableSelectionZone
          items={tableData}
          checkboxVisibility={CheckboxVisibility.hidden}
          getKey={(item) => item.uid}
          columns={columns}
        />
        {credit && (
          <Text as="p">
            Осталось выплатить <strong>{credit.debt}₽</strong>
          </Text>
        )}
      </Stack>
    </MainSurface>
  );
};

export default CreditSettings;
