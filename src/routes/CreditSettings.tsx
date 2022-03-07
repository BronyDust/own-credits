import { IColumn, IconButton, Stack, StackItem, Text } from "@fluentui/react";
import { FC, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainSurface from "../atoms/MainSurface";
import useCredit from "../hooks/useCredit";
import NoCreditData from "../molecules/NoCreditData";

const columns: IColumn[] = [
  {
    key: "name",
    name: "Имя",
    minWidth: 100,
    maxWidth: 300,
  },
];

type CreditPayment = {
  uid: string;
  name: string;
  date: string;
  cost: number;
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

  if (!credit) return <NoCreditData />;

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
            onClick={() => navigate("/")}
            iconProps={{ iconName: "Add" }}
          />
          <StackItem>
            <Text as="h2" variant="xLarge">
              Платежи
            </Text>
          </StackItem>
        </Stack>
      </Stack>
    </MainSurface>
  );
};

export default CreditSettings;
