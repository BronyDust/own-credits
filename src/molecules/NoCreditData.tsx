import { Dialog, DialogFooter, PrimaryButton } from "@fluentui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NoCreditData: FC = ({ children }) => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate("/");
  };

  return (
    <Dialog onDismiss={goMain} hidden={false}>
      {children}
      <DialogFooter>
        <PrimaryButton onClick={goMain}>На главную</PrimaryButton>
      </DialogFooter>
    </Dialog>
  );
};

export default NoCreditData;
