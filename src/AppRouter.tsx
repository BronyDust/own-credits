import { Route, Routes } from "react-router-dom";
import NewCredit from "./routes/NewCredit";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<NewCredit />} />
  </Routes>
);

export default AppRouter;
