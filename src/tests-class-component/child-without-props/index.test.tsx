// This test verifies that this library can work with class components

import { render } from "@testing-library/react";
import React from "react";
import { it, jest } from "@jest/globals";
import { createMockComponent, getMockComponentPropCalls } from "../../index.js";
import "@testing-library/jest-dom";

// Step 1:
// import type allows you to import just the types and not the actual file.
// As ChildProps is just a type definition, Typescript is smart enough to remove this import.
// However from a code documentation standpoint, it's safer to add `type` incase someone tries
// to import non-type information which would cause the import to not be removed
// and therefore run before mockModule get's executed (breaking the mock)
import type { ChildProps } from "./test-asset.child.js";

// Step 2:
// Now mock the child component
jest.unstable_mockModule("./test-asset.child.js", () => ({
  Child: createMockComponent<ChildProps>({ elementType: "button" }),
}));

// Step 3:
// Import the parent now that the child is mocked
// Note that if you're using below ES2022 you'll need to run the `await import`
// statements in a beforeEach
const { Parent } = await import("./test-asset.parent.js");
const { Child } = jest.mocked(await import("./test-asset.child.js"));

afterEach(() => {
  Child.mockClear();
});

it("Returns propCalls with getMockComponentPropCalls", () => {
  // Arrange
  const result = render(<Parent />);

  // Assert
  const propCalls = getMockComponentPropCalls(Child);
  expect(propCalls).toHaveLength(1);
});

it("Renders a button instead of the real element's span", async () => {
  // Arrange
  const result = render(<Parent />);

  // Assert
  const buttons = await result.findAllByRole("button");
  expect(buttons).toHaveLength(1);
});

it("Doesn't contain the real child's innerText content", async () => {
  // Arrange
  const result = render(<Parent />);

  // Assert
  await expect(result.findAllByText("Real child")).rejects.toBeTruthy();
});
