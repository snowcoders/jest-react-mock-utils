import React, { useState } from "react";
import { Child } from "./test-asset.child.js";

export const parentTestIdMap = {
  clickCount: "click-count",
  child: "child",
};

export type ParentProps = Record<keyof any, never>;

type ParentState = {
  clickCount: number;
};

export class Parent extends React.Component<ParentProps, ParentState> {
  constructor(props: ParentProps) {
    super(props);

    this.state = {
      clickCount: 0,
    };
  }

  handleChildClick = () => {
    this.setState((value) => ({
      ...value,
      clickCount: value.clickCount + 1,
    }));
  };

  render() {
    const { clickCount } = this.state;
    return (
      <div>
        <h1>Real parent</h1>
        <div>
          Click count is <span data-testid={parentTestIdMap.clickCount}>{clickCount}</span>
        </div>
        <Child
          data-testid={parentTestIdMap.child}
          onClick={this.handleChildClick}
          someData="someData"
          onComplicatedCallback={() => {}}
        />
      </div>
    );
  }
}
