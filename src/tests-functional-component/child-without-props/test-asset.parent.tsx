import React from "react";
import { Child } from "./test-asset.child.js";

export type ParentProps = Record<string, never>;

export function Parent(props: ParentProps) {
  return (
    <div>
      <h1>Real parent</h1>
      <Child />
    </div>
  );
}
