import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = {} & Pick<HtmlHTMLAttributes<HTMLButtonElement>, "onClick">;

export function Child() {
  return <span>Real child</span>;
}
