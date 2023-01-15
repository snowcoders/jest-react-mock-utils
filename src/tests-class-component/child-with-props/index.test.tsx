import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
const { Parent, parentTestIdMap } = await import("./test-asset.parent.js");
const { Child } = jest.mocked(await import("./test-asset.child.js"));

afterEach(() => {
  Child.mockClear();
});

describe("Github issue #7 - Using ReturnType on createMockComponent", () => {
  let Child: ReturnType<typeof createMockComponent<ChildProps>>;

  beforeEach(async () => {
    Child = jest.mocked((await import("./test-asset.child.js")).Child);
  });

  it("Renders dynamic import child", async () => {
    // Arrange
    const spy = jest.fn();
    const result = render(<Child onClick={spy} someData="someData" onComplicatedCallback={() => {}} />);

    // Act
    await userEvent.click(result.getByRole("button"));

    // Assert
    expect(spy).toHaveBeenCalled();
  });
});

it("Renders click count defaulted to 0", () => {
  // Arrange
  const result = render(<Parent />);

  // Assert
  const countElement = result.getByTestId(parentTestIdMap.clickCount);
  expect(countElement.innerHTML).toBe("0");
});

it("Renders with mocked child", () => {
  // Arrange
  render(<Parent />);

  // Assert
  const propCalls = getMockComponentPropCalls(Child);
  expect(propCalls).toHaveLength(1);
});

describe("Clicking via testing-library's userEvent", () => {
  it("Mock child callback causes click count to increase", async () => {
    // Arrange
    const result = render(<Parent />);

    // Act
    await userEvent.click(result.getByRole("button"));

    // Assert
    const countElement = result.getByTestId(parentTestIdMap.clickCount);
    expect(countElement.innerHTML).toBe("1");
  });

  it("Mock child callback causes mock child to re-render", async () => {
    // Arrange
    const result = render(<Parent />);

    // Act
    await userEvent.click(result.getByRole("button"));

    // Assert
    const propCalls = getMockComponentPropCalls(Child);
    expect(propCalls).toHaveLength(2);
  });
});

describe("Activating the onClick callback directly", () => {
  it("Mock child callback causes click count to increase", async () => {
    // Arrange
    const result = render(<Parent />);

    // Act
    await act(() =>
      getMockComponentPropCalls(Child)
        ?.at(-1)
        ?.onClick?.({} as any)
    );

    // Assert
    const countElement = result.getByTestId(parentTestIdMap.clickCount);
    expect(countElement.innerHTML).toBe("1");
  });

  it("Mock child callback causes mock child to re-render", async () => {
    // Arrange
    render(<Parent />);

    // Act
    await act(() =>
      getMockComponentPropCalls(Child)
        ?.at(-1)
        ?.onClick?.({} as any)
    );

    // Assert
    const propCalls = getMockComponentPropCalls(Child);
    expect(propCalls).toHaveLength(2);
  });
});
