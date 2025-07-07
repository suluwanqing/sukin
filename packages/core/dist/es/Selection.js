import { toRef, ref, watch, computed, defineComponent, createElementBlock, openBlock, withKeys, normalizeClass, withModifiers, unref, toDisplayString, onMounted, onUnmounted, createCommentVNode, createVNode, Fragment, renderList, createElementVNode, createTextVNode, Transition, withCtx, createBlock, withDirectives, vShow } from "vue";
import { c as createNamespace, _ as _export_sfc, w as withInstall } from "./utils.js";
import { S as SuIcon } from "./Icon.js";
const SELECTION_UPDATE_MODEL_EVENT = "update:modelValue";
const SELECTION_CHANGE_EVENT = "change";
function useSelection(props, emit) {
  const modelValue = toRef(props, "modelValue");
  const multiple = toRef(props, "multiple");
  const placeholder = toRef(props, "placeholder");
  const items = toRef(props, "items");
  const mode = toRef(props, "mode");
  const internalSelectedValues = ref([]);
  const internalExpandedPath = ref([]);
  watch(modelValue, (newVal) => {
    if (mode.value === "cascader") {
      if (!Array.isArray(newVal) || newVal === null || newVal.length === 0) {
        internalSelectedValues.value = [];
        internalExpandedPath.value = [];
      } else {
        internalSelectedValues.value = [...newVal];
        internalExpandedPath.value = [...newVal];
      }
    } else {
      if (newVal === void 0 || newVal === null || newVal === "") {
        internalSelectedValues.value = [];
      } else if (Array.isArray(newVal)) {
        internalSelectedValues.value = newVal;
      } else {
        internalSelectedValues.value = [newVal];
      }
    }
  }, { immediate: true, deep: true });
  const allFlatOptions = computed(() => {
    if (mode.value === "cascader") return [];
    return items.value.flatMap((item) => {
      if ("value" in item) {
        if ("options" in item) {
          return item.options || [];
        }
        return [item];
      } else {
        return item.options || [];
      }
    });
  });
  const flatItemValueMap = computed(() => {
    if (mode.value === "cascader") return /* @__PURE__ */ new Map();
    return new Map(
      allFlatOptions.value.map((item) => [item.value, item])
    );
  });
  computed(() => {
    const map = /* @__PURE__ */ new Map();
    const traverse = (options) => {
      options.forEach((option) => {
        map.set(option.value, option);
        if (option.children) {
          traverse(option.children);
        }
      });
    };
    traverse(items.value);
    return map;
  });
  const selectedItems = computed(() => {
    if (mode.value === "cascader") {
      return [];
    }
    return internalSelectedValues.value.map((value) => flatItemValueMap.value.get(value)).filter((item) => item !== void 0);
  });
  const selectedLabels = computed(() => {
    if (mode.value !== "cascader") return [];
    const labels = [];
    let currentItems = items.value;
    for (const selectedValue of internalSelectedValues.value) {
      const item = currentItems.find((i) => i.value === selectedValue);
      if (item) {
        labels.push(item.label);
        if (item.children) {
          currentItems = item.children;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return labels;
  });
  const displayedCascaderOptions = computed(() => {
    if (mode.value !== "cascader") return [];
    const columns = [];
    let currentLevelItems = items.value;
    columns.push(currentLevelItems);
    for (const selectedValue of internalExpandedPath.value) {
      const selectedItem = currentLevelItems.find((item) => item.value === selectedValue);
      if (selectedItem && selectedItem.children && selectedItem.children.length > 0) {
        columns.push(selectedItem.children);
        currentLevelItems = selectedItem.children;
      } else {
        break;
      }
    }
    return columns;
  });
  const isActive = (value, levelIndex) => {
    if (mode.value === "cascader" && levelIndex !== void 0) {
      return internalSelectedValues.value[levelIndex] === value;
    }
    return internalSelectedValues.value.includes(value);
  };
  const handleSelect = (item, levelIndex, onSelectCallback) => {
    if (props.disabled || item.disabled) return;
    if (mode.value === "cascader") {
      const cascaderItem = item;
      const currentPath = internalExpandedPath.value.slice(0, levelIndex);
      currentPath.push(cascaderItem.value);
      if (!cascaderItem.children || cascaderItem.children.length === 0) {
        internalSelectedValues.value = currentPath;
        internalExpandedPath.value = currentPath;
        emit(SELECTION_UPDATE_MODEL_EVENT, internalSelectedValues.value);
        emit(SELECTION_CHANGE_EVENT, internalSelectedValues.value);
        onSelectCallback == null ? void 0 : onSelectCallback();
      } else {
        internalExpandedPath.value = currentPath;
        internalSelectedValues.value = currentPath;
      }
    } else {
      const flatItem = item;
      let newSelectedValues;
      if (multiple.value) {
        const currentIndex = internalSelectedValues.value.indexOf(flatItem.value);
        if (currentIndex > -1) {
          newSelectedValues = internalSelectedValues.value.filter((val) => val !== flatItem.value);
        } else {
          newSelectedValues = [...internalSelectedValues.value, flatItem.value];
        }
      } else {
        newSelectedValues = internalSelectedValues.value.includes(flatItem.value) ? [] : [flatItem.value];
      }
      internalSelectedValues.value = newSelectedValues;
      const emittedValue = multiple.value ? newSelectedValues : newSelectedValues[0] || null;
      emit(SELECTION_UPDATE_MODEL_EVENT, emittedValue);
      emit(SELECTION_CHANGE_EVENT, emittedValue);
      onSelectCallback == null ? void 0 : onSelectCallback();
    }
  };
  const handleRemoveTag = (itemToRemove) => {
    if (props.disabled || mode.value !== "dropdown" || !multiple.value) return;
    const newSelectedValues = internalSelectedValues.value.filter((val) => val !== itemToRemove.value);
    internalSelectedValues.value = newSelectedValues;
    emit(SELECTION_UPDATE_MODEL_EVENT, newSelectedValues);
    emit(SELECTION_CHANGE_EVENT, newSelectedValues);
  };
  const handleClear = () => {
    if (props.disabled) return;
    internalSelectedValues.value = [];
    internalExpandedPath.value = [];
    let emittedValue = null;
    if (mode.value === "cascader") {
      emittedValue = null;
    } else if (multiple.value) {
      emittedValue = [];
    } else {
      emittedValue = null;
    }
    emit(SELECTION_UPDATE_MODEL_EVENT, emittedValue);
    emit(SELECTION_CHANGE_EVENT, emittedValue);
  };
  const displayLabel = computed(() => {
    if (mode.value === "cascader") {
      return selectedLabels.value.join(" / ") || (placeholder.value || "请选择");
    }
    if (multiple.value) {
      return internalSelectedValues.value.length === 0 ? placeholder.value || "请选择" : "";
    } else {
      const selectedItem = flatItemValueMap.value.get(internalSelectedValues.value[0]);
      return (selectedItem == null ? void 0 : selectedItem.label) || (placeholder.value || "请选择");
    }
  });
  const hasSelected = computed(() => internalSelectedValues.value.length > 0);
  return {
    isActive,
    handleSelect,
    displayLabel,
    selectedItems,
    handleRemoveTag,
    handleClear,
    hasSelected,
    // 级联模式特有返回
    selectedLabels,
    displayedCascaderOptions
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Item",
  props: {
    item: {},
    active: { type: Boolean }
  },
  emits: ["click"],
  setup(__props) {
    const bem = createNamespace("selection");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(bem).e("option"), unref(bem).is("active", _ctx.active), unref(bem).is("disabled", _ctx.item.disabled)]),
        tabindex: "0",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click")),
        onKeydown: [
          _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.$emit("click"), ["prevent"]), ["enter"])),
          _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => _ctx.$emit("click"), ["prevent"]), ["space"]))
        ]
      }, toDisplayString(_ctx.item.label), 35);
    };
  }
});
const _hoisted_1 = ["onClick"];
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
    placeholder: { default: "请选择" },
    clearable: { type: Boolean, default: false }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const bem = createNamespace("selection");
    const isDropdownOpen = ref(false);
    const selectionRef = ref(null);
    const selectionPanelRef = ref(null);
    const {
      isActive,
      handleSelect,
      displayLabel,
      selectedItems,
      handleRemoveTag,
      handleClear,
      hasSelected,
      // 级联模式特有返回
      selectedLabels,
      displayedCascaderOptions
    } = useSelection(props, emit);
    const isPanelVisible = computed(() => {
      if (props.mode === "box") {
        return true;
      }
      return isDropdownOpen.value;
    });
    const closeDropdown = () => {
      isDropdownOpen.value = false;
    };
    const toggleDropdown = () => {
      if (!props.disabled) {
        isDropdownOpen.value = !isDropdownOpen.value;
      }
    };
    const handleSelectAndClose = (item) => {
      handleSelect(item, void 0, () => {
        if (!props.multiple && (props.mode === "dropdown" || props.mode === "cascader")) {
          closeDropdown();
        }
      });
    };
    const handleClickOutside = (event) => {
      if (selectionRef.value && !selectionRef.value.contains(event.target)) {
        closeDropdown();
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    const isOption = (item) => {
      return "value" in item && !("options" in item) && !("children" in item);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "selectionRef",
        ref: selectionRef,
        class: normalizeClass([unref(bem).b(), unref(bem).m(props.mode), unref(bem).m(props.size), unref(bem).m(props.shape), unref(bem).is("disabled", props.disabled)]),
        onKeydown: withKeys(closeDropdown, ["esc"]),
        tabindex: "0"
      }, [
        props.mode === "dropdown" || props.mode === "cascader" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(bem).e("trigger")),
          onClick: toggleDropdown
        }, [
          props.mode === "dropdown" && props.multiple && unref(selectedItems).length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(selectedItems), (item) => {
            return openBlock(), createElementBlock("span", {
              key: item.value,
              class: normalizeClass(unref(bem).e("tag"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(bem).e("tag-text"))
              }, toDisplayString(item.label), 3),
              createVNode(SuIcon, {
                icon: "close",
                class: normalizeClass(unref(bem).e("tag-close")),
                onClick: withModifiers(($event) => unref(handleRemoveTag)(item), ["stop"])
              }, null, 8, ["class", "onClick"])
            ], 2);
          }), 128)) : props.mode === "cascader" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            unref(selectedLabels).length > 0 ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(unref(bem).e("selected-item-text"))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedLabels), (label, index) => {
                return openBlock(), createElementBlock("span", { key: index }, [
                  createTextVNode(toDisplayString(label), 1),
                  index < unref(selectedLabels).length - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createTextVNode(" / ")
                  ], 64)) : createCommentVNode("", true)
                ]);
              }), 128))
            ], 2)) : (openBlock(), createElementBlock("span", {
              key: 1,
              class: normalizeClass([unref(bem).e("trigger-text"), { "is-placeholder": true }])
            }, toDisplayString(unref(displayLabel)), 3))
          ], 64)) : (openBlock(), createElementBlock("span", {
            key: 2,
            class: normalizeClass([unref(bem).e("trigger-text"), { "is-placeholder": !unref(hasSelected) }])
          }, toDisplayString(unref(displayLabel)), 3)),
          createVNode(Transition, { name: "su-selection-fade" }, {
            default: withCtx(() => [
              props.clearable && unref(hasSelected) && !props.disabled && isDropdownOpen.value ? (openBlock(), createBlock(SuIcon, {
                key: 0,
                icon: "close-circle",
                class: normalizeClass(unref(bem).e("clear")),
                onClick: withModifiers(unref(handleClear), ["stop"])
              }, null, 8, ["class", "onClick"])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
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
              }, ["stop"])),
              ref_key: "selectionPanelRef",
              ref: selectionPanelRef
            }, [
              props.mode === "cascader" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(displayedCascaderOptions), (levelOptions, levelIndex) => {
                return openBlock(), createElementBlock("div", {
                  key: levelIndex,
                  class: normalizeClass(unref(bem).e("column"))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(levelOptions, (option) => {
                    return openBlock(), createElementBlock("div", {
                      key: option.value,
                      class: normalizeClass([
                        unref(bem).e("option"),
                        unref(bem).is("active", unref(isActive)(option.value, levelIndex)),
                        unref(bem).is("disabled", option.disabled)
                      ]),
                      onClick: ($event) => unref(handleSelect)(option, levelIndex, closeDropdown)
                    }, [
                      createTextVNode(toDisplayString(option.label) + " ", 1),
                      option.children && option.children.length > 0 ? (openBlock(), createBlock(SuIcon, {
                        key: 0,
                        icon: "chevron-right",
                        class: normalizeClass(unref(bem).e("option-arrow"))
                      }, null, 8, ["class"])) : createCommentVNode("", true)
                    ], 10, _hoisted_1);
                  }), 128))
                ], 2);
              }), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(props.items, (item, index) => {
                return openBlock(), createElementBlock(Fragment, { key: index }, [
                  isOption(item) ? (openBlock(), createBlock(_sfc_main$1, {
                    key: 0,
                    item,
                    active: unref(isActive)(item.value),
                    onClick: ($event) => handleSelectAndClose(item),
                    onKeydown: [
                      withKeys(withModifiers(($event) => handleSelectAndClose(item), ["prevent"]), ["enter"]),
                      withKeys(withModifiers(($event) => handleSelectAndClose(item), ["prevent"]), ["space"])
                    ]
                  }, null, 8, ["item", "active", "onClick", "onKeydown"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createElementVNode("div", {
                      class: normalizeClass(unref(bem).e("group-label"))
                    }, toDisplayString(item.label), 3),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.options, (option) => {
                      return openBlock(), createBlock(_sfc_main$1, {
                        key: option.value,
                        item: option,
                        active: unref(isActive)(option.value),
                        onClick: ($event) => handleSelectAndClose(option),
                        onKeydown: [
                          withKeys(withModifiers(($event) => handleSelectAndClose(option), ["prevent"]), ["enter"]),
                          withKeys(withModifiers(($event) => handleSelectAndClose(option), ["prevent"]), ["space"])
                        ]
                      }, null, 8, ["item", "active", "onClick", "onKeydown"]);
                    }), 128))
                  ], 64))
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
const Selection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fef4f3d8"]]);
const SuSelection = withInstall(Selection);
export {
  SuSelection as S
};
