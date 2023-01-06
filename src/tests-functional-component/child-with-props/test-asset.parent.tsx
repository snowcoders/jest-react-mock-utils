import React, { useState } from "react";
import { Child } from "./test-asset.child.js";

export const parentTestIdMap = {
  clickCount: "click-count",
  child: "child",
};

export type ParentProps = Record<keyof any, never>;

export function Parent(props: ParentProps) {
  const [clickCount, setClickCount] = useState(0);

  const handleChildClick = React.useCallback(() => {
    setClickCount(clickCount + 1);
  }, [clickCount, setClickCount]);

  return (
    <div>
      <h1>Real parent</h1>
      <div>
        Click count is <span data-testid={parentTestIdMap.clickCount}>{clickCount}</span>
      </div>
      <Child data-testid={parentTestIdMap.child} onClick={handleChildClick} />
    </div>
  );
}
