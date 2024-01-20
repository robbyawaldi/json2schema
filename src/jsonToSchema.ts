export function jsonToOpenApiSchema(jsonData: any) {
  function parseObject(obj: any) {
    const properties: any = {};
    for (const [key, value] of Object.entries(obj)) {
      properties[key] = parseValue(value);
    }
    if (Object.entries(obj).length < 1) {
      properties["name"] = {
        type: "string",
      };
    }
    return { type: "object", properties: properties };
  }

  function parseArray(arr: any[]) {
    const items: any = arr.length ? parseValue(arr[0]) : { type: "string" };
    return { type: "array", items: items };
  }

  function parseValue(value: any) {
    if (Array.isArray(value)) {
      return parseArray(value);
    } else if (typeof value === "object" && value !== null) {
      return parseObject(value);
    } else {
      return { type: typeof value };
    }
  }

  return parseValue(jsonData);
}
