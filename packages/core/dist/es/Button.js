import { defineComponent, ref, useSlots, inject, computed, createBlock, openBlock, resolveDynamicComponent, unref, normalizeClass, withCtx, renderSlot, createCommentVNode, createElementBlock, createVNode, normalizeStyle, provide, reactive, toRef } from "vue";
import { c as createNamespace, _ as _export_sfc, w as withInstall } from "./utils.js";
import { I as Icon } from "./Icon.js";
import { t as throttle } from "./vendor.js";
const BUTTON_GROUP_CTX_KEY = Symbol("buttonGroupContext");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuButton"
  },
  __name: "Button",
  props: {
    tag: { default: "button" },
    type: {},
    size: {},
    plain: { type: Boolean },
    round: { type: Boolean },
    circle: { type: Boolean },
    disabled: { type: Boolean },
    autofocus: { type: Boolean },
    nativeType: { default: "button" },
    icon: {},
    loading: { type: Boolean },
    loadingIcon: {},
    useThrottle: { type: Boolean, default: true },
    throttleDuration: { default: 300 }
  },
  emits: ["click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const bem = createNamespace("button");
    const props = __props;
    const _ref = ref();
    const slots = useSlots();
    const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0);
    const size = computed(() => (ctx == null ? void 0 : ctx.size) ?? (props == null ? void 0 : props.size) ?? "");
    const type = computed(() => (ctx == null ? void 0 : ctx.type) ?? (props == null ? void 0 : props.type) ?? "");
    const disabled = computed(() => (ctx == null ? void 0 : ctx.disabled) ?? (props == null ? void 0 : props.disabled) ?? false);
    const loading = computed(() => (ctx == null ? void 0 : ctx.loading) ?? (props == null ? void 0 : props.loading) ?? false);
    const iconStyle = computed(() => {
      if (slots.default && !props.circle && (props.icon || props.loading)) {
        return { marginRight: "6px" };
      }
      return {};
    });
    const emit = __emit;
    __expose({
      ref: _ref
    });
    const handleClick = (e) => {
      if (props.disabled || props.loading) {
        e.preventDefault();
        return;
      }
      emit("click", e);
    };
    const handleClickThrottle = throttle(handleClick, props.throttleDuration, { leading: true, trailing: false });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        ref_key: "_ref",
        ref: _ref,
        class: normalizeClass([
          unref(bem).b(),
          type.value ? unref(bem).m(type.value) : "",
          size.value ? unref(bem).m(size.value) : "",
          {
            [unref(bem).m("round")]: _ctx.round,
            [unref(bem).m("circle")]: _ctx.circle,
            [unref(bem).m("plain")]: _ctx.plain
          },
          unref(bem).is("disabled", disabled.value),
          unref(bem).is("loading", loading.value)
        ]),
        type: _ctx.tag === "button" ? _ctx.nativeType : void 0,
        disabled: disabled.value || loading.value,
        onClick: _cache[0] || (_cache[0] = (e) => _ctx.useThrottle ? unref(handleClickThrottle)(e) : handleClick(e))
      }, {
        default: withCtx(() => [
          loading.value ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
            createVNode(Icon, {
              class: normalizeClass(["loading-icon", [unref(bem).e("icon"), unref(bem).em("icon", "spinner")]]),
              icon: _ctx.loadingIcon ?? "spinner",
              style: normalizeStyle(iconStyle.value),
              spin: "",
              size: "1x"
            }, null, 8, ["class", "icon", "style"])
          ], true) : createCommentVNode("", true),
          _ctx.icon && !loading.value ? (openBlock(), createBlock(Icon, {
            key: 1,
            class: normalizeClass(unref(bem).e("icon")),
            icon: _ctx.icon,
            style: normalizeStyle(iconStyle.value),
            size: "1x"
          }, null, 8, ["class", "icon", "style"])) : createCommentVNode("", true),
          slots.default && !_ctx.circle ? (openBlock(), createElementBlock("span", {
            key: 2,
            class: normalizeClass(unref(bem).e("text"))
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["class", "type", "disabled"]);
    };
  }
});
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-72b5c5c2"]]);
const _hoisted_1 = { class: "su-button-group" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuButtonGroup"
  },
  __name: "ButtonGroup",
  props: {
    size: {},
    type: {},
    disabled: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    provide(
      BUTTON_GROUP_CTX_KEY,
      reactive({
        size: toRef(props, "size"),
        type: toRef(props, "type"),
        disabled: toRef(props, "disabled")
      })
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e89ce1cf"]]);
const SuButton = withInstall(Button);
const SuButtonGroup = withInstall(ButtonGroup);
export {
  SuButton as S,
  SuButtonGroup as a
};
