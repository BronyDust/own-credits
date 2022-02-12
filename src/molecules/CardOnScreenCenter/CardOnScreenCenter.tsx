import { FC } from "react";
import Card from "../../atoms/Card";
import buildClassName from "../../utils/buildClassName";
import css from "./CardOnScreenCenter.module.scss";

interface ICardOnScreenCenterProps {
  className?: string;
}

const CardOnScreenCenter: FC<ICardOnScreenCenterProps> = ({
  children,
  className,
}) => (
  <div className={buildClassName(css.wrapper, className)}>
    <div className={css.container}>
      <Card className={css.card}>{children}</Card>
    </div>
  </div>
);

export default CardOnScreenCenter;
