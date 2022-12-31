import { jest } from "@jest/globals";
import React from "react";

export function createMockComponent<TProps>({ elementType = "div" }): jest.MockedFunction<React.FC<TProps>> {
  return jest.fn((props: TProps) => {
    if (props == null) {
      return React.createElement(elementType);
    } else if (typeof props === "object" && "children" in props) {
      const { children, ...rest } = props as React.PropsWithChildren<TProps>;
      return React.createElement(elementType, rest, children);
    } else {
      return React.createElement(elementType, props);
    }
  });
}

export function getMockComponentPropCalls<TProps>(mockComponent: jest.MockedFunction<React.FC<TProps>>): TProps[] {
  const propCalls = mockComponent.mock.calls.map((value) => {
    return value[0];
  });
  return propCalls;
}
