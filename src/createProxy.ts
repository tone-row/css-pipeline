import {
  deleteProperty,
  getProperty,
  hasProperty,
  setProperty,
} from "dot-prop";

/**
 * Creates a proxy object which runs getProperty and setProperty
 * under the hood and throws a very descriptive error if a property
 * is not found.
 */
export function createProxy<T extends object>(
  obj: T,
  path: string = "ROOT"
): T {
  return new Proxy(obj, {
    get(target, prop) {
      let propAsString = prop as string;
      if (hasProperty(target, propAsString)) {
        const value = getProperty(target, propAsString);
        if (typeof value === "object") {
          return createProxy(value, `${path}.${propAsString}`);
        }
        return getProperty(target, propAsString);
      } else {
        throw new Error(`Property not found: ${path}.${propAsString}`);
      }
    },
    set(target, prop, value) {
      let propAsString = prop as string;
      setProperty(target, propAsString, value);
      return true;
    },
    deleteProperty(target, prop) {
      let propAsString = prop as string;
      deleteProperty(target, propAsString);
      return true;
    },
  });
}
