# jest-react-mock-utils

[![CI](https://img.shields.io/github/actions/workflow/status/snowcoders/jest-react-mock-utils/ci.yml)](https://github.com/snowcoders/jest-react-mock-utils/actions/workflows/publish.yml)
[![Coverage Status](https://coveralls.io/repos/github/snowcoders/jest-react-mock-utils/badge.svg?branch=main)](https://coveralls.io/github/snowcoders/jest-react-mock-utils?branch=main)
[![npm version](https://img.shields.io/npm/v/jest-react-mock-utils.svg)](https://www.npmjs.com/package/jest-react-mock-utils)
[![Downloads](https://img.shields.io/npm/dm/jest-react-mock-utils.svg)](https://www.npmjs.com/package/jest-react-mock-utils)

Simple utiltiies to help with mocking React scenarios for testing.

## Usage

The best option is to check out our [integration tests](./src/tests-functional-component/child-with-props/index.test.tsx) to see more real world scenarios.

```typescript
import { render } from "@testing-library/react";
import React from "react";
import { it, jest } from "@jest/globals";
import { createMockComponent, getMockComponentPropCalls } from "../../index.js";

// Step 1: if using typescript, import the Prop types for the child component
import type { ChildProps } from "./test-asset.child.js";

// Step 2: Now mock the child component
jest.unstable_mockModule("./test-asset.child.js", () => ({
  Child: createMockComponent<ChildProps>("button"),
}));

// Step 3: Import the parent and child, mocking the child
const { Parent, parentTestIdMap } = await import("./parent.js");
const { Child } = jest.mocked(await import("./test-asset.child.js"));

afterEach(() => {
  Child.mockClear();
});

// Step 4: Write your test
it("Child callback causes click count to increase", async () => {
  // Arrange
  const result = render(<Parent />);

  // Act - Fires the onComplicatedCallback for the last render cycle
  await act(() =>
    getMockComponentPropCalls(Child)
      ?.at(-1)
      ?.onClick?.({} as any)
  );

  // Assert
  const countElement = result.getByTestId("click-count");
  expect(countElement.innerHTML).toBe("1");
});

it("Clicking child causes click count to increase", async () => {
  // Arrange
  const result = render(<Parent />);

  // Act
  await userEvent.click(result.getByRole("button"));

  // Assert
  const countElement = result.getByTestId("click-count");
  expect(countElement.innerHTML).toBe("1");
});
```

### I get an error when using await import

There's two halves to this problem:

1. Dynamic imports (e.g. `import("...")`) were implemented in ES2020:
   - Does your runtime environment support this? Node started [support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#browser_compatibility) in 13.2.0
   - If using typescript, is your `module` set to [ES2020](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#es2020-for-target-and-module) or later?
1. Top level await statements were implemented in ES2022:
   - Does your runtime environment support this? Node started [support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#browser_compatibility) in 14.8.0.
   - If using typescript, is your `module` set to [ES2022](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#module-es2022) or later?

## Purpose

Unfortunately there exist scenarios where you may not want to render a child component; for example when that child component is delay loaded, complex, unstable, server driven, or not owned by you directly and is already covered by integration or end to end testing scenarios.

A good example scenario is [Stripe's React Elements Component](https://www.npmjs.com/package/@stripe/react-stripe-js) and [Adyen's web components](https://www.npmjs.com/package/@adyen/adyen-web) both of which have the following implementation details which make it difficult to test cleanly:

- a significant amount of internal logic
- server side driven logic
- the use of iframes limiting access to textfields (for credit card security purposes)

To create a full integration test for this scenario would be extremely complex, costly, and constantly unpredictable as Stripe and Adyen can change the rendering of the components from their server side causing random instability of your tests.

Instead of constantly being on the backfoot and your CI breaking because another company updated their systems, mocking those dependencies provides a level of stability at the sacrifice of real world resemblance.

### How is this similar/different than enzyme's shallow?

Enzyme's shallow would be able to mock all the imports for you by calling `shallow(<Parent />)`. This library requires you to:

1. Use `jest.unstable_mockModule` to mock all the child components the Parent component is dependent on
1. Dynamically load the Parent component after mocking all the child components

Theoretically if you mocked all the children a Parent component was dependent on, it would be fairly similar to Enzyme's shallow render.

## Goals

### Dependencies

This project's goal is to have only two dependencies: React and Jest. This way it can be utilized by any React testing system (e.g. @testing-library/react, react-test-renderer, or other) and not tie you down to a specific testing system.
