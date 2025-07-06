import { f as forEach } from "./vendor.js";
function _bem(prefixName, blockSuffix = "", element = "", modifier = "") {
  let className = prefixName;
  if (blockSuffix) {
    className += `-${blockSuffix}`;
  }
  if (element) {
    className += `__${element}`;
  }
  if (modifier) {
    className += `--${modifier}`;
  }
  return className;
}
function createBEM(prefixName) {
  const b = (blockSuffix = "") => _bem(prefixName, blockSuffix);
  const e = (element = "") => element ? _bem(prefixName, "", element) : "";
  const m = (modifier = "") => modifier ? _bem(prefixName, "", "", modifier) : "";
  const be = (blockSuffix = "", element = "") => blockSuffix && element ? _bem(prefixName, blockSuffix, element) : "";
  const bm = (blockSuffix = "", modifier = "") => blockSuffix && modifier ? _bem(prefixName, blockSuffix, "", modifier) : "";
  const em = (element = "", modifier = "") => element && modifier ? _bem(prefixName, "", element, modifier) : "";
  const bem = (blockSuffix = "", element = "", modifier = "") => blockSuffix && element && modifier ? _bem(prefixName, blockSuffix, element, modifier) : "";
  const is = (name, state) => state ? `is-${name}` : "";
  return { b, e, m, be, bm, em, bem, is };
}
function createNamespace(name) {
  const prefixName = `su-${name}`;
  return createBEM(prefixName);
}
function makeInstaller(components) {
  const installer = (app) => forEach(components, (c) => app.use(c));
  return installer;
}
const withInstall = (component) => {
  component.install = (app) => {
    const name = component.name;
    app.component(name, component);
  };
  return component;
};
const typeIconMap = /* @__PURE__ */ new Map([
  ["info", "circle-info"],
  ["success", "check-circle"],
  ["warning", "circle-exclamation"],
  ["danger", "circle-xmark"],
  ["error", "circle-xmark"]
]);
const getDeepValue = (obj, path) => {
  if (!obj || typeof path !== "string") {
    return void 0;
  }
  const keys = path.replace(/^\./, "").split(".");
  return keys.reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return void 0;
  }, obj);
};
const getItemDeep = (arr, value, keyPath) => {
  if (!Array.isArray(arr) || value === void 0) {
    return null;
  }
  return arr.find((item) => getDeepValue(item, keyPath) == value) || null;
};
const popItemDeep = (arr, itemToPop, keyPath) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  if (!itemToPop) {
    return [...arr];
  }
  const valueToPop = getDeepValue(itemToPop, keyPath);
  if (valueToPop === void 0) {
    return [...arr];
  }
  return arr.filter((item) => getDeepValue(item, keyPath) !== valueToPop);
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
export {
  _export_sfc as _,
  getItemDeep as a,
  createNamespace as c,
  getDeepValue as g,
  makeInstaller as m,
  popItemDeep as p,
  typeIconMap as t,
  withInstall as w
};
