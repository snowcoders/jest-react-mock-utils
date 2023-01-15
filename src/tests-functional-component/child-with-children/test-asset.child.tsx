import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = React.PropsWithChildren<{
  onClick: HtmlHTMLAttributes<HTMLButtonElement>["onClick"];
  someData: string;
  onComplicatedCallback: () => void;
}>;

export function Child(props: ChildProps) {
  const { onClick, children } = props;
  return <button onClick={onClick}>{children}</button>;
}
