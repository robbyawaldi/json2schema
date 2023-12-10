import { expect, test } from "vitest";
import { jsonToOpenApiSchema } from "../jsonToSchema";

test("should handle an empty object", () => {
  const jsonData = {};
  const result = jsonToOpenApiSchema(jsonData);

  expect(result).toEqual({ type: "object", properties: {} });
});

test("should handle a simple object", () => {
  const jsonData = { key: "value" };
  const result = jsonToOpenApiSchema(jsonData);

  expect(result).toEqual({
    type: "object",
    properties: { key: { type: "string" } },
  });
});

test("should handle an array", () => {
  const jsonData = [1, 2, 3];
  const result = jsonToOpenApiSchema(jsonData);

  expect(result).toEqual({
    type: "array",
    items: { type: "number" },
  });
});

test("should handle nested objects", () => {
  const jsonData = { key1: { key2: "value" } };
  const result = jsonToOpenApiSchema(jsonData);

  expect(result).toEqual({
    type: "object",
    properties: {
      key1: {
        type: "object",
        properties: { key2: { type: "string" } },
      },
    },
  });
});

test("should handle mixed types", () => {
  const jsonData = {
    key1: "value1",
    key2: [1, 2, 3],
    key3: { nestedKey: "value2" },
  };
  const result = jsonToOpenApiSchema(jsonData);

  expect(result).toEqual({
    type: "object",
    properties: {
      key1: { type: "string" },
      key2: { type: "array", items: { type: "number" } },
      key3: {
        type: "object",
        properties: { nestedKey: { type: "string" } },
      },
    },
  });
});

test("should handle an array of object type", () => {
  const jsonData = [
    { key1: "value1", key2: 123 },
    { key1: "value2", key2: 456 },
  ];
  const result = jsonToOpenApiSchema(jsonData);

  expect(result).toEqual({
    type: "array",
    items: {
      type: "object",
      properties: {
        key1: { type: "string" },
        key2: { type: "number" },
      },
    },
  });
});
