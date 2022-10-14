import { transform } from "./transform";

describe("transform", () => {
  it("should throw if not passed config object", () => {
    // @ts-ignore
    expect(() => transform()).toThrowError("Config is required");
  });

  it("should throw if config.layers is not an array", () => {
    // @ts-ignore
    expect(() => transform({ outDir: "out", layers: {} })).toThrowError(
      "Must have at least one layer"
    );
  });

  it("should throw if config.layers is an empty array", () => {
    // @ts-ignore
    expect(() => transform({ outDir: "out", layers: [] })).toThrowError(
      "Must have at least one layer"
    );
  });

  it("should throw if config.outDir is not passed", () => {
    // @ts-ignore
    expect(() => transform({ layers: ["a"] })).toThrowError(
      "Output directory is required"
    );
  });

  it("should return a string", () => {
    const css = transform({
      outDir: "out",
      layers: [
        {
          type: "import",
          path: "./fixtures/layer1.css",
        },
      ],
    });

    expect(typeof css).toBe("string");
  });

  it("should give each layer a unique name", () => {
    const css = transform({
      outDir: "out",
      layers: [
        {
          type: "import",
          path: "./fixtures/layer1.css",
        },
        {
          type: "import",
          path: "./fixtures/layer2.css",
        },
      ],
    });

    expect(css).toMatch(/@layer a, b;/);
  });
});

describe("LayerImport", () => {
  it("should throw if layer.path is not a string", () => {
    expect(() =>
      // @ts-ignore
      transform({ outDir: "out", layers: [{ type: "import" }] })
    ).toThrowError("Layer path is required");
  });

  it("should throw if layer.path is an empty string", () => {
    expect(() =>
      transform({ outDir: "out", layers: [{ type: "import", path: "" }] })
    ).toThrowError("Layer path is required");
  });

  it("should create a relative path from outDir to layerPath", () => {
    const css = transform({
      outDir: "./fixtures",
      layers: [
        {
          type: "import",
          path: "./fixtures/layer1.css",
        },
      ],
    });

    expect(css).toMatch(/@import url\("layer1.css"\) layer\(a\);/);
  });
});
