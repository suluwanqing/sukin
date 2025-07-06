import { defineComponent, computed, createElementBlock, openBlock, mergeProps, unref, createVNode, normalizeProps, guardReactiveProps } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { c as createNamespace, _ as _export_sfc, w as withInstall } from "./utils.js";
import { o as omit } from "./vendor.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuIcon",
    inheritAttrs: false
  },
  __name: "Icon",
  props: {
    border: { type: Boolean },
    fixedWidth: { type: Boolean },
    flip: {},
    icon: {},
    mask: {},
    listItem: { type: Boolean },
    pull: {},
    pulse: { type: Boolean },
    rotation: {},
    swapOpacity: { type: Boolean },
    size: {},
    spin: { type: Boolean },
    transform: {},
    symbol: { type: [Boolean, String] },
    title: {},
    inverse: { type: Boolean },
    bounce: { type: Boolean },
    shake: { type: Boolean },
    beat: { type: Boolean },
    fade: { type: Boolean },
    beatFade: { type: Boolean },
    spinPulse: { type: Boolean },
    spinReverse: { type: Boolean },
    type: {},
    color: {}
  },
  setup(__props) {
    const props = __props;
    const bem = createNamespace("icon");
    const filterProps = computed(() => omit(props, ["type", "color"]));
    const customStyles = computed(() => ({ color: props.color ?? void 0 }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", mergeProps({
        class: [unref(bem).b(), _ctx.type && unref(bem).m(_ctx.type)],
        style: customStyles.value
      }, _ctx.$attrs), [
        createVNode(unref(FontAwesomeIcon), normalizeProps(guardReactiveProps(filterProps.value)), null, 16)
      ], 16);
    };
  }
});
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c99bd54d"]]);
const SuIcon = withInstall(Icon);
export {
  Icon as I,
  SuIcon as S
};
