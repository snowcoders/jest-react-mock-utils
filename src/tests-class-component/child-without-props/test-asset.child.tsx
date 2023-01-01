import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = {} & Pick<HtmlHTMLAttributes<HTMLButtonElement>, "onClick">;

export class Child extends React.Component<ChildProps> {
  render() {
    return <span>Real child</span>;
  }
}
