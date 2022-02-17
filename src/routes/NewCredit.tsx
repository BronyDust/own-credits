import {
  DatePicker,
  DayOfWeek,
  DefaultButton,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';
import { FC, FormEventHandler, useState } from 'react';
import useStorage from '../hooks/useStorage';
import CardOnScreenCenter from '../molecules/CardOnScreenCenter';
import storage from '../utils/storage';

const NewCredit: FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const hasCredits = useStorage((storage) => storage.size > 0);

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name'));
    const cost = parseFloat(String(formData.get('cost')) || '0');

    storage.addCredit(name, cost, {
      startDate: selectedDate,
    });
  };

  const dateSelectionHandler = (date: Date | null | undefined) => {
    if (date) setSelectedDate(date);
  };

  return (
    <CardOnScreenCenter>
      <form onSubmit={submitHandler}>
        <Stack tokens={{ childrenGap: 10 }}>
          <Text as="h1" variant="xxLarge">
            Создайте кредит
          </Text>
          <TextField name="name" label="Название или назначение" required />
          <TextField
            name="cost"
            required
            type="number"
            label="Сумма"
            prefix="₽"
          />
          <DatePicker
            onSelectDate={dateSelectionHandler}
            label="Дата траты"
            firstDayOfWeek={DayOfWeek.Sunday}
            showMonthPickerAsOverlay
          />
          <Stack.Item align="end">
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              {hasCredits && (
                <DefaultButton text="Назад" type="button" href="/" />
              )}
              <PrimaryButton text="Создать" type="submit" />
            </Stack>
          </Stack.Item>
        </Stack>
      </form>
    </CardOnScreenCenter>
  );
};

export default NewCredit;
