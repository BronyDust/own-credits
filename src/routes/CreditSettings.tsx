import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import MainSurface from "../atoms/MainSurface";
import useStorage from "../hooks/useStorage";
import NoCreditData from "../molecules/NoCreditData";

const CreditSettings: FC = () => {
  const { creditId } = useParams();
  const credit = useStorage((s) => (creditId ? s.get(creditId) || null : null));

  if (creditId === undefined) return <Navigate replace to="/" />;

  if (!credit) return <NoCreditData />;

  return <MainSurface></MainSurface>;
};

export default CreditSettings;
