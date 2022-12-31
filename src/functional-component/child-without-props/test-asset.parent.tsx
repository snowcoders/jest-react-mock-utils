import React from "react";
import { Child } from "./test-asset.child.js";

export const parentTestIdMap = {
  clickCount: "click-count",
  child: "child",
};

export type ParentProps = {};

export function Parent(props: ParentProps) {
  return (
    <div>
      <h1>Real parent</h1>
      <Child data-testid={parentTestIdMap.child} />
    </div>
  );
}
