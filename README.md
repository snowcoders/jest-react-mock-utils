# jest-react-mock-utils

Simple utiltiies to help with mocking React scenarios for testing.

## Usage

### Mock dependent components

You can check our comprehesive unit tests for more examples of testing scenarios

```typescript

```

## Goals

### Why mock?

Unfortunately there exist scenarios where you may not what to render a child component; for example when that child component is delay loaded, complex, unstable, server driven, or not owned by you directly and is already covered by integration or end to end testing scenarios.

A good example scenario is [Stripe's React Elements Component](https://www.npmjs.com/package/@stripe/react-stripe-js) and [Adyen's web components](https://www.npmjs.com/package/@adyen/adyen-web) which has a significant amount of internal logic, server side driven logic, along with use of iframes for security purposes making it much more difficult to test cleanly.

To create a full integration test for this scenario would be extremely complex, costly, and constantly unpredictable as Stripe and Adyen can change the rendering of the components from their server side causing random instability of your tests.

Instead of constantly being on the backfoot and your CI breaking because another company updated their systems, mocking those dependencies provides a level of stability at the sacrifice of real world resemblance.

### Dependencies

This project's goal is to have only two dependencies: React and Jest. This way it can be utilized by any React testing system (e.g. @testing-library/react, react-test-renderer, or other) and not tie you down to a specific testing system.
