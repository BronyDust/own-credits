import { FC } from 'react';
import buildClassName from '../../utils/buildClassName';
import css from './MainSurface.module.scss';

interface IProps {
  className?: string;
}

/** Just a wrapper with paddings on right, left and top */
const MainSurface: FC<IProps> = ({ children, className }) => (
  <div className={buildClassName(css.wrapper, className)}>{children}</div>
);

export default MainSurface;
