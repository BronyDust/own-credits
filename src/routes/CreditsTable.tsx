import {
  CheckboxVisibility,
  DefaultButton,
  DetailsList,
  IColumn,
  IconButton,
  Stack,
  Text,
  TooltipHost,
} from '@fluentui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSurface from '../atoms/MainSurface';
import VerticallyCentered from '../atoms/VerticallyCentered';
import useStorage from '../hooks/useStorage';

type CreditListItem = {
  cost: number;
  name: string;
  uid: string;
  date: string;
  debt: number;
};

const columns: IColumn[] = [
  {
    key: 'name',
    name: 'Название / назначение кредита',
    minWidth: 300,
    maxWidth: 500,
    onRender(item: CreditListItem) {
      return (
        <VerticallyCentered>
          <strong>{item.name}</strong>
        </VerticallyCentered>
      );
    },
  },
  {
    key: 'debt',
    name: 'Долг',
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
    key: 'date',
    name: 'Дата',
    minWidth: 200,
    onRender(item: CreditListItem) {
      const date = new Date(item.date);
      return (
        <VerticallyCentered>{date.toLocaleDateString()}</VerticallyCentered>
      );
    },
  },
  {
    key: 'actions',
    name: 'Действия',
    minWidth: 200,
    onRender(item: CreditListItem) {
      return (
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <TooltipHost content="Удалить">
            <IconButton iconProps={{ iconName: 'Delete' }} />
          </TooltipHost>
        </Stack>
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
      const { date } = metaData.additionalInfo;

      items.push({
        uid,
        name: metaData.name,
        cost: metaData.cost,
        date,
        debt,
      });

      fullDebt += debt;
    }

    return [items, fullDebt];
  });

  return (
    <MainSurface>
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <Text as="h1" variant="xxLarge">
            Ваши кредиты
          </Text>
        </Stack.Item>
        <Stack.Item>
          <DefaultButton
            onClick={() => navigate('/new')}
            iconProps={{ iconName: 'Add' }}
          >
            Добавить
          </DefaultButton>
        </Stack.Item>
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
