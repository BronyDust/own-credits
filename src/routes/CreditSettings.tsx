import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import MainSurface from '../atoms/MainSurface';
import useStorage from '../hooks/useStorage';

const CreditSettings: FC = () => {
  const { creditId } = useParams();
  const credit = useStorage((s) => (creditId ? s.get(creditId) || null : null));

  console.log(credit);

  if (creditId === undefined || credit === null)
    return <Navigate replace to="/" />;

  return <MainSurface>ds</MainSurface>;
};

export default CreditSettings;
