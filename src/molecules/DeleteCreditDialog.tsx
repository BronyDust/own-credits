import {
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
} from '@fluentui/react';
import { FC, useState } from 'react';

interface IDeleteCreditDialogProps {
  creditUUID: string;
  children: (openModal: VoidFunction) => JSX.Element;
}

const DeleteCreditDialog: FC<IDeleteCreditDialogProps> = ({
  creditUUID,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  return (
    <>
      <Dialog hidden={isVisible} onDismiss={close}>
        <DialogFooter>
          <PrimaryButton onClick={()}>Удалить</PrimaryButton>
          <DefaultButton onClick={close}>Отменить</DefaultButton>
        </DialogFooter>
      </Dialog>
      {children(open)}
    </>
  );
};

export default DeleteCreditDialog;
