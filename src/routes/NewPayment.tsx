import {
  DatePicker,
  DayOfWeek,
  DefaultButton,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import { FC, FormEventHandler, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCredit from "../hooks/useCredit";
import CardOnScreenCenter from "../molecules/CardOnScreenCenter";
import NoCreditData from "../molecules/NoCreditData";

const NewPayment: FC = () => {
  const [date, setDate] = useState<Date>();
  const { creditId = "" } = useParams();
  const credit = useCredit(creditId);
  const navigate = useNavigate();

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!date) return event.currentTarget.checkValidity();
    if (!credit) return;

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name"));
    const cost = parseFloat(String(formData.get("cost")) || "0");

    credit.addPayment(cost, date.toDateString(), name);
    navigate(`/credit/${creditId}`);
  };

  if (!credit || !creditId)
    return <NoCreditData>Такого кредита нет</NoCreditData>;

  return (
    <CardOnScreenCenter>
      <form onSubmit={submitHandler}>
        <Stack tokens={{ childrenGap: 10 }}>
          <Text as="h1" variant="xxLarge">
            Добавьте платеж
          </Text>
          <TextField name="name" label="Название" required />
          <DatePicker
            onSelectDate={(date) => {
              if (date) setDate(date);
            }}
            isRequired
            label="Дата"
            firstDayOfWeek={DayOfWeek.Sunday}
            showMonthPickerAsOverlay
          />
          <TextField
            name="cost"
            required
            type="number"
            label="Сумма"
            prefix="₽"
          />
          <Stack.Item align="end">
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <DefaultButton
                text="Назад"
                type="button"
                onClick={() => navigate(`/credit/${creditId}`)}
              />
              <PrimaryButton text="Создать" type="submit" />
            </Stack>
          </Stack.Item>
        </Stack>
      </form>
    </CardOnScreenCenter>
  );
};

export default NewPayment;
