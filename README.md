# jest-react-mock-utils

Simple utiltiies to help with mocking React scenarios for testing.

## Usage

The best option is to check out our [unit tests](./src/functional-component/index.test.tsx) to see different uses however here's a quick code snippet.

```typescript
// Step 1: if using typescript, import the Props for the child component
import type { ChildProps } from "./test-asset.child.js";

// Step 2: Now mock the child component
jest.unstable_mockModule("./test-asset.child.js", () => ({
  Child: createMockFunctionComponent<ChildProps>("button"),
}));

// Step 3: Import the parent and child, mocking the child
const { Parent, parentTestIdMap } = await import("./parent.js");
const { Child } = jest.mocked(await import("./test-asset.child.js"));

afterEach(() => {
  Child.mockClear();
});

// Step 4: Write your test
it("Mock child callback causes click count to increase", async () => {
  // Act
  const result = render(<Parent />);
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

## Goals

### Why mock?

Unfortunately there exist scenarios where you may not want to render a child component; for example when that child component is delay loaded, complex, unstable, server driven, or not owned by you directly and is already covered by integration or end to end testing scenarios.

A good example scenario is [Stripe's React Elements Component](https://www.npmjs.com/package/@stripe/react-stripe-js) and [Adyen's web components](https://www.npmjs.com/package/@adyen/adyen-web) both of which have the following implementation details which make it difficult to test cleanly:

- a significant amount of internal logic
- server side driven logic
- the use of iframes limiting access to textfields (for credit card security purposes)

To create a full integration test for this scenario would be extremely complex, costly, and constantly unpredictable as Stripe and Adyen can change the rendering of the components from their server side causing random instability of your tests.

Instead of constantly being on the backfoot and your CI breaking because another company updated their systems, mocking those dependencies provides a level of stability at the sacrifice of real world resemblance.

### Dependencies

This project's goal is to have only two dependencies: React and Jest. This way it can be utilized by any React testing system (e.g. @testing-library/react, react-test-renderer, or other) and not tie you down to a specific testing system.
