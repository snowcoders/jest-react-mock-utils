import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = React.PropsWithChildren<
  Pick<HtmlHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    someData: string;
    onPointerEnter: () => void;
  }
>;

export function Child(props: ChildProps) {
  const { onClick, children } = props;
  return <button onClick={onClick}>{children}</button>;
}
