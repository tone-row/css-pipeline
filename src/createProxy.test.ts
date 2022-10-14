import { createProxy } from "./createProxy";

describe("createProxy", () => {
  it("should throw if property is not found", () => {
    expect(() => {
      const proxy = createProxy({ a: 1 });
      // @ts-ignore
      proxy.b;
    }).toThrow("Property not found: ROOT.b");
  });

  it("should throw if nested property is not found", () => {
    expect(() => {
      const proxy = createProxy({ a: { b: 1 } });
      // @ts-ignore
      proxy.a.c;
    }).toThrow("Property not found: ROOT.a.c");
  });
});
