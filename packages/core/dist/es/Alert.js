import { defineComponent, useSlots, ref, computed, createBlock, openBlock, Transition, unref, withCtx, withDirectives, createElementVNode, normalizeClass, createCommentVNode, createElementBlock, normalizeStyle, renderSlot, createTextVNode, toDisplayString, createVNode, withModifiers, vShow } from "vue";
import { S as SuIcon } from "./Icon.js";
import { t as typeIconMap, c as createNamespace, _ as _export_sfc, w as withInstall } from "./utils.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuAlert"
  },
  __name: "Alert",
  props: {
    title: {},
    type: { default: "info" },
    description: {},
    effect: { default: "light" },
    closable: { type: Boolean, default: true },
    center: { type: Boolean },
    showIcon: { type: Boolean },
    duration: {}
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const bem = createNamespace("alert");
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const visible = ref(true);
    const withDescription = computed(() => props.description || slots.default);
    const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
    function close() {
      visible.value = false;
      emits("close");
    }
    function open() {
      visible.value = true;
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(bem).m("fade")
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: normalizeClass([
              unref(bem).b(),
              unref(bem).e(_ctx.type),
              unref(bem).e(_ctx.effect),
              { "text-center": _ctx.center }
            ]),
            role: "alert"
          }, [
            _ctx.showIcon ? (openBlock(), createBlock(SuIcon, {
              key: 0,
              class: normalizeClass([
                unref(bem).e("icon"),
                { [unref(bem).m("big-icon")]: withDescription.value }
              ]),
              icon: iconName.value
            }, null, 8, ["class", "icon"])) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("content"))
            }, [
              createElementVNode("span", {
                class: normalizeClass([
                  unref(bem).e("title"),
                  { [unref(bem).m("with-desc")]: withDescription.value }
                ]),
                style: normalizeStyle({ display: _ctx.center && !_ctx.showIcon ? "flow" : "inline" })
              }, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ], true)
              ], 6),
              createElementVNode("p", {
                class: normalizeClass(unref(bem).e("description"))
              }, [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(_ctx.description), 1)
                ], true)
              ], 2),
              _ctx.closable ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(bem).e("close"))
              }, [
                createVNode(SuIcon, {
                  onClick: withModifiers(close, ["stop"]),
                  icon: "xmark"
                })
              ], 2)) : createCommentVNode("", true)
            ], 2)
          ], 2), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
      }, 8, ["name"]);
    };
  }
});
const SuAlert$1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9fbe7820"]]);
const SuAlert = withInstall(SuAlert$1);
export {
  SuAlert$1 as S,
  SuAlert as a
};
