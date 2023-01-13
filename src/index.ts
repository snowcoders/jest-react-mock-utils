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
    const propsWithReactHack = {
      ...props,
      // All the react checks seem to be based off a function isCustomComponent
      // - Uses of isCustomComponent https://github.com/facebook/react/search?q=isCustomComponent&type=code
      // - Function itself https://github.com/facebook/react/blob/8e2bde6f2751aa6335f3cef488c05c3ea08e074a/packages/react-dom-bindings/src/shared/isCustomComponent.js
      // By providing "props.is" we can bypass the property checks all together
      is: elementType,
    };

    return React.createElement(elementType, propsWithReactHack);
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
