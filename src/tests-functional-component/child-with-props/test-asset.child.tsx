import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = Pick<HtmlHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  someData: string;
  onPointerEnter: () => void;
};

export function Child(props: ChildProps) {
  const { onClick } = props;
  return <button onClick={onClick}>Real child</button>;
}
