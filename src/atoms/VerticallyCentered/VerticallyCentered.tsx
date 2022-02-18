import { FC } from 'react';
import css from './VerticallyCentered.module.scss';

const VerticallyCentered: FC = ({ children }) => (
  <div className={css.wrapper}>{children}</div>
);

export default VerticallyCentered;
