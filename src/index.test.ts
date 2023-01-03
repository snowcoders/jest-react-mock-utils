// This file contains some basic tests, for the integration tests see `tests-class-component` and `tests-function-component`

import { describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { createMockComponent, getMockComponentPropCalls } from "./index.js";
import React from "react";
import "@testing-library/jest-dom";

describe("createMockComponent", () => {
  it("returns without any parameters", () => {
    // Arrange
    const result = createMockComponent();

    // Assert
    expect(result).toBeDefined();
  });

  it("returns with empty options", () => {
    // Arrange
    const result = createMockComponent({});

    // Assert
    expect(result).toBeDefined();
  });

  it("returns with custom elementType", () => {
    // Arrange
    const result = createMockComponent({ elementType: "custom" });

    // Assert
    expect(result).toBeDefined();
  });
});

describe("getMockComponentPropCalls", () => {
  describe("Success scenarios", () => {
    it("has 0 calls if not rendered", () => {
      // Arrange
      const result = createMockComponent();

      // Assert
      const calls = getMockComponentPropCalls(result);
      expect(calls).toHaveLength(0);
    });

    it("has 1 call if rendered", () => {
      // Arrange
      const result = createMockComponent();

      // Act
      render(React.createElement(result));

      // Assert
      const calls = getMockComponentPropCalls(result);
      expect(calls).toHaveLength(1);
    });
  });

  describe("Negative tests", () => {
    it("throws an error if passed nothing", () => {
      expect(() => {
        // @ts-expect-error I'm testing a negative scenario here so I need to break typescript a bit
        getMockComponentPropCalls();
      }).toThrowError("Did you forget to call createMockComponent");
    });

    it("throws an error if passed a real component", () => {
      expect(() => {
        getMockComponentPropCalls(
          // @ts-expect-error I'm testing a negative scenario here so I need to break typescript a bit
          () => React.createElement("span")
        );
      }).toThrowError("Did you forget to call createMockComponent");
    });
  });
});
