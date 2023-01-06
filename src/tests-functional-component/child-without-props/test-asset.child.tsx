import React from "react";

export type ChildProps = Record<keyof any, never>;

export function Child(props: ChildProps) {
  return <span>Real child</span>;
}
