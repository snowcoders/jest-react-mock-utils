import React from "react";

export type ChildProps = Record<string, never>;

export function Child(props: ChildProps) {
  return <span>Real child</span>;
}
