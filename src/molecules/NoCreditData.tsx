import { Dialog, DialogFooter, PrimaryButton } from "@fluentui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NoCreditData: FC = () => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate("/");
  };

  return (
    <Dialog onDismiss={goMain} hidden={false}>
      Такого кредита нет
      <DialogFooter>
        <PrimaryButton onClick={goMain}>Назад</PrimaryButton>
      </DialogFooter>
    </Dialog>
  );
};

export default NoCreditData;
