import { FC } from "react";
import buildClassName from "../../utils/buildClassName";
import css from "./Card.module.scss";

interface ICardProps {
  className?: string;
}

const Card: FC<ICardProps> = ({ children, className }) => (
  <div className={buildClassName(css.card, className)}>{children}</div>
);

export default Card;
