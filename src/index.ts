import React from "react";
import { jest } from "@jest/globals";

const defaultOptions: Required<Options> = {
  elementType: "div",
};

export type Options = {
  /**
   * The HTMLElement type to render. Default is div.
   */
  elementType?: string;
};

/**
 * Generates a new mock component with the prop signature provided.
 *
 * @param {string} elementType the HTMLElement type to render. Default is div.
 * @returns A mock component to be used in conjunction with other utilities in this library
 */
export function createMockComponent<TProps>(options?: Options): jest.Mocked<React.ComponentType<TProps>> {
  const { elementType } = {
    ...defaultOptions,
    ...options,
  };

  // Our implementation renders all components (class and function) as function components
  // so forcing the type to function here
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

export function getMockComponentPropCalls<TProps>(
  mockComponent:
    | jest.MockedFunction<React.FC<TProps>> // Function components
    | typeof React.Component<TProps> // Class components
): Readonly<TProps>[] {
  // Our implementation renders all components (class and function) as function components
  // so forcing the type to function here
  const castedMockComponent = mockComponent as jest.MockedFunction<React.FC<TProps>>;
  const calls = castedMockComponent?.mock?.calls;
  if (calls == null) {
    throw new Error(
      "Parameter to getMockComponentPropCalls must be a MockComponent. Did you forget to call createMockComponent?"
    );
  }
  const propCalls = calls.map((value) => {
    return value[0];
  });
  return propCalls;
}
