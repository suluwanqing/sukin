import { computed, defineComponent, createElementBlock, openBlock, normalizeClass, unref, toDisplayString, ref, onMounted, onUnmounted, withKeys, createCommentVNode, createVNode, createElementVNode, Transition, withCtx, withDirectives, withModifiers, Fragment, renderList, createBlock, vShow } from "vue";
import { c as createNamespace, _ as _export_sfc, w as withInstall } from "./utils.js";
import { S as SuIcon } from "./Icon.js";
const SELECTION_UPDATE_MODEL_EVENT = "update:modelValue";
const SELECTION_CHANGE_EVENT = "change";
function useSelection(props, emit) {
  const handleSelect = (item, onSelectCallback) => {
    if (props.disabled || item.disabled) return;
    let newValue;
    if (props.multiple) {
      const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
      const index = currentValue.indexOf(item.value);
      if (index > -1) {
        currentValue.splice(index, 1);
      } else {
        currentValue.push(item.value);
      }
      newValue = currentValue;
    } else {
      newValue = props.modelValue === item.value ? null : item.value;
    }
    emit(SELECTION_UPDATE_MODEL_EVENT, newValue);
    emit(SELECTION_CHANGE_EVENT, newValue);
    onSelectCallback == null ? void 0 : onSelectCallback();
  };
  const itemMap = computed(() => new Map(
    props.items.filter((item) => "value" in item).map((item) => [item.value, item])
  ));
  const isActive = (item) => {
    const checkDisabledInModel = (value) => {
      var _a;
      return (_a = itemMap.value.get(value)) == null ? void 0 : _a.disabled;
    };
    if (props.multiple) {
      if (!Array.isArray(props.modelValue)) return false;
      const enabledModelValue = props.modelValue.filter((val) => !checkDisabledInModel(val));
      return enabledModelValue.includes(item.value);
    }
    if (checkDisabledInModel(props.modelValue)) return false;
    return props.modelValue === item.value;
  };
  const displayLabel = computed(() => {
    if (props.multiple) {
      if (!Array.isArray(props.modelValue) || props.modelValue.length === 0) {
        return props.placeholder || "请选择";
      }
      return props.modelValue.map((val) => {
        var _a;
        return (_a = itemMap.value.get(val)) == null ? void 0 : _a.label;
      }).filter(Boolean).join(", ");
    }
    const selectedItem = itemMap.value.get(props.modelValue);
    return (selectedItem == null ? void 0 : selectedItem.label) || props.placeholder || "请选择";
  });
  return { isActive, handleSelect, displayLabel };
}
const _hoisted_1 = ["tabindex"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Item",
  props: {
    item: {},
    active: { type: Boolean }
  },
  setup(__props) {
    const bem = createNamespace("selection");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(bem).e("option"), unref(bem).is("active", _ctx.active), unref(bem).is("disabled", _ctx.item.disabled)]),
        tabindex: _ctx.item.disabled ? -1 : 0
      }, toDisplayString(_ctx.item.label), 11, _hoisted_1);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuSelection"
  },
  __name: "Selection",
  props: {
    modelValue: {},
    items: { default: () => [] },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: { default: "default" },
    shape: { default: "round" },
    mode: { default: "box" },
    placeholder: { default: "请选择" }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const bem = createNamespace("selection");
    const isDropdownOpen = ref(false);
    const selectionRef = ref(null);
    const { isActive, handleSelect, displayLabel } = useSelection(props, emit);
    const isPanelVisible = computed(() => props.mode === "dropdown" ? isDropdownOpen.value : true);
    const closeDropdown = () => isDropdownOpen.value = false;
    const toggleDropdown = () => {
      if (!props.disabled) isDropdownOpen.value = !isDropdownOpen.value;
    };
    const handleSelectAndClose = (item) => {
      handleSelect(item, () => {
        if (!props.multiple && props.mode === "dropdown") closeDropdown();
      });
    };
    const handleClickOutside = (event) => {
      if (selectionRef.value && !selectionRef.value.contains(event.target)) closeDropdown();
    };
    onMounted(() => document.addEventListener("click", handleClickOutside));
    onUnmounted(() => document.removeEventListener("click", handleClickOutside));
    const isOption = (item) => "value" in item;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "selectionRef",
        ref: selectionRef,
        class: normalizeClass([unref(bem).b(), unref(bem).m(props.mode), unref(bem).m(props.size), unref(bem).m(props.shape), unref(bem).is("disabled", props.disabled)]),
        onKeydown: withKeys(closeDropdown, ["esc"]),
        tabindex: "0"
      }, [
        props.mode === "dropdown" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(bem).e("trigger")),
          onClick: toggleDropdown
        }, [
          createElementVNode("span", {
            class: normalizeClass(unref(bem).e("trigger-text"))
          }, toDisplayString(unref(displayLabel)), 3),
          createVNode(SuIcon, {
            class: normalizeClass([unref(bem).e("caret"), unref(bem).is("open", isDropdownOpen.value)]),
            icon: "chevron-down"
          }, null, 8, ["class"])
        ], 2)) : createCommentVNode("", true),
        createVNode(Transition, { name: "su-selection-zoom" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              class: normalizeClass(unref(bem).e("panel")),
              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"]))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item, index) => {
                return openBlock(), createElementBlock(Fragment, { key: index }, [
                  isOption(item) ? (openBlock(), createBlock(_sfc_main$1, {
                    key: 0,
                    item,
                    active: unref(isActive)(item),
                    onClick: ($event) => handleSelectAndClose(item),
                    onKeydown: [
                      withKeys(withModifiers(($event) => handleSelectAndClose(item), ["prevent"]), ["enter"]),
                      withKeys(withModifiers(($event) => handleSelectAndClose(item), ["prevent"]), ["space"])
                    ]
                  }, null, 8, ["item", "active", "onClick", "onKeydown"])) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(unref(bem).e("group-label"))
                  }, toDisplayString(item.label), 3))
                ], 64);
              }), 128))
            ], 2), [
              [vShow, isPanelVisible.value]
            ])
          ]),
          _: 1
        })
      ], 34);
    };
  }
});
const Selection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-146bd0ac"]]);
const SuSelection = withInstall(Selection);
export {
  SuSelection as S
};
