import React, { HtmlHTMLAttributes } from "react";

export type ChildProps = Pick<HtmlHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  someData: string;
  onPointerEnter: () => void;
};

export class Child extends React.Component<ChildProps> {
  render() {
    const { onClick } = this.props;
    return <button onClick={onClick}>Real child</button>;
  }
}
