import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = {
  onClick: HtmlHTMLAttributes<HTMLButtonElement>["onClick"];
  someData: string;
  onComplicatedCallback: () => void;
};

export class Child extends React.Component<ChildProps> {
  render() {
    const { onClick } = this.props;
    return <button onClick={onClick}>Real child</button>;
  }
}
