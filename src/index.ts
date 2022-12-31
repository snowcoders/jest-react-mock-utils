import { createMockFunctionComponent, getMockFunctionComponentPropCalls } from "./functional-component/index.js";

/**
 * Generates a new mock component with the prop signature provided.
 *
 * @param {string} elementType the HTMLElement type to render. Default is div.
 * @returns A mock component to be used in conjunction with other utilities in this library
 */
export function createMockComponent<TProps>(
  mockComponent: Parameters<typeof createMockFunctionComponent<TProps>>[0]
): ReturnType<typeof createMockFunctionComponent<TProps>> {
  return createMockFunctionComponent(mockComponent);
}

export function getMockComponentPropCalls<TProps>(
  mockComponent: Parameters<typeof getMockFunctionComponentPropCalls<TProps>>[0]
): ReturnType<typeof getMockFunctionComponentPropCalls<TProps>> {
  return getMockFunctionComponentPropCalls(mockComponent);
}
