import { DefaultButton, Stack, Text } from '@fluentui/react';
import { FC } from 'react';
import MainSurface from '../atoms/MainSurface';

const CreditsTable: FC = () => {
  return (
    <MainSurface>
      <Stack>
        <Text as="h1" variant="xxLarge">
          Ваши кредиты
        </Text>
        <Stack.Item>
          <DefaultButton iconProps={{ iconName: 'Add' }}>
            Добавить
          </DefaultButton>
        </Stack.Item>
      </Stack>
    </MainSurface>
  );
};

export default CreditsTable;
