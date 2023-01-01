import React from "react";
import { Child } from "./test-asset.child.js";

export const parentTestIdMap = {
  child: "child",
};

export type ParentProps = {};

export class Parent extends React.Component<ParentProps> {
  render() {
    return (
      <div>
        <h1>Real parent</h1>
        <Child data-testid={parentTestIdMap.child} />
      </div>
    );
  }
}
