import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = React.PropsWithChildren<Pick<HtmlHTMLAttributes<HTMLButtonElement>, "onClick">>;

export class Child extends React.Component<ChildProps> {
  render() {
    const { onClick, children } = this.props;
    return <button onClick={onClick}>{children}</button>;
  }
}
