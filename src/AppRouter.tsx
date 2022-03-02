import { Navigate, Route, Routes } from 'react-router-dom';
import useStorage from './hooks/useStorage';
import CreditSettings from './routes/CreditSettings';
import CreditsTable from './routes/CreditsTable';
import NewCredit from './routes/NewCredit';

const AppRouter = () => {
  const hasCredits = useStorage((storage) => storage.size > 0);

  if (!hasCredits)
    return (
      <Routes>
        <Route path="/" element={<NewCredit />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path="/new" element={<NewCredit />} />
      <Route path="/" element={<CreditsTable />} />
      <Route path="/credit/:creditId" element={<CreditSettings />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default AppRouter;
