import {
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
} from '@fluentui/react';
import { FC, useState } from 'react';
import useStorage from '../hooks/useStorage';
import storage from '../utils/storage';

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
  const item = useStorage((data) => data.get(creditUUID));

  if (!item) return null;

  return (
    <>
      <Dialog
        hidden={!isVisible}
        dialogContentProps={{ title: 'Удалить?' }}
        onDismiss={close}
      >
        Вы уверены, что хотите удалить из базы запись{' '}
        <strong>{item.metaData.name}</strong> и её внутренние записи{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          ({item.paymentsCount} штук)
        </span>
        ?
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              storage.removeCredit(creditUUID);
            }}
          >
            Удалить
          </PrimaryButton>
          <DefaultButton onClick={close}>Отменить</DefaultButton>
        </DialogFooter>
      </Dialog>
      {children(open)}
    </>
  );
};

export default DeleteCreditDialog;
