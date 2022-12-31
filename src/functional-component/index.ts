import { jest } from "@jest/globals";
import React from "react";

type CreateMockFunctionComponentOptions = {
  /**
   * The HTMLElement type to render. Default is div.
   */
  elementType: string;
};

/**
 * Generates a new mock component with the prop signature provided.
 * @param options The different configuration options you wish to use
 * @returns
 */
export function createMockFunctionComponent<TProps>({
  elementType = "div",
}: CreateMockFunctionComponentOptions): jest.MockedFunction<React.FC<TProps>> {
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

export function getMockFunctionComponentPropCalls<TProps>(
  mockComponent: jest.MockedFunction<React.FC<TProps>>
): TProps[] {
  const propCalls = mockComponent.mock.calls.map((value) => {
    return value[0];
  });
  return propCalls;
}
