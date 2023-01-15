import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = {
  onClick: HtmlHTMLAttributes<HTMLButtonElement>["onClick"];
  someData: string;
  onComplicatedCallback: () => void;
};

export function Child(props: ChildProps) {
  const { onClick } = props;
  return <button onClick={onClick}>Real child</button>;
}
