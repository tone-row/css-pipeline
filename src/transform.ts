import path from "path";

type LayerImport = {
  type: "import";
  path: string;
};

type Layer = LayerImport;

export type Config = {
  outDir: string;
  layers: Layer[];
};

export function transform(config: Config) {
  if (!config) throw new Error("Config is required");

  // throw if no outputDir
  if (!config.outDir) throw new Error("Output directory is required");

  // throw if no layers
  if (!config.layers || !config.layers.length) {
    throw new Error("Must have at least one layer");
  }

  // get absolute outDir path
  const outDir = path.resolve(config.outDir);

  const layersNames: string[] = [];
  const layerStrs: string[] = [];

  // store layer names
  for (let i = 0; i < config.layers.length; i++) {
    const layer = config.layers[i];
    const layerName = indexToLayerName(i);
    layersNames.push(layerName);

    switch (layer.type) {
      case "import": {
        // throw if layer.path is not a string
        if (typeof layer.path !== "string") {
          throw new Error("Layer path is required");
        }

        // throw if layer.path is an empty string
        if (!layer.path) {
          throw new Error("Layer path is required");
        }

        const isRemote = layer.path.startsWith("http");
        if (isRemote) {
          layerStrs.push(`@import url("${layer.path}") layer(${layerName});`);
        } else {
          const layerPath = path.resolve(layer.path);
          // get relative path from outDir to layerPath
          const relativePath = path.relative(outDir, layerPath);
          layerStrs.push(`@import url("${relativePath}") layer(${layerName});`);
        }
        break;
      }
      default:
        // @ts-ignore
        throw new Error(`Unknown layer type: ${layer?.type}`);
    }
  }

  const priorityStr = `@layer ${layersNames.join(", ")};`;

  let css: string = [priorityStr, ...layerStrs].join("\n");

  return css;
}

// convert number to 'a', 'b'... 'aa', 'ab', etc.
function indexToLayerName(index: number) {
  let name = "";
  let i = index;

  while (i >= 0) {
    name = String.fromCharCode(97 + (i % 26)) + name;
    i = Math.floor(i / 26) - 1;
  }

  return name;
}
