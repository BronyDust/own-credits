import { DefaultButton, DetailsList, Stack, Text } from '@fluentui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSurface from '../atoms/MainSurface';
import useStorage from '../hooks/useStorage';

type CreditListItem = {
  cost: number;
  name: string;
  uid: string;
  date: string;
  debt: number;
};

const CreditsTable: FC = () => {
  const navigate = useNavigate();
  const creditsAsItems = useStorage((credits) => {
    const items: CreditListItem[] = [];

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
    }

    return items;
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
          <DetailsList disableSelectionZone items={creditsAsItems} />
        </Stack.Item>
      </Stack>
    </MainSurface>
  );
};

export default CreditsTable;
