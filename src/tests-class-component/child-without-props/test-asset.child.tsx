import React from "react";

export type ChildProps = Record<string, never>;

export class Child extends React.Component<ChildProps> {
  render() {
    return <span>Real child</span>;
  }
}
