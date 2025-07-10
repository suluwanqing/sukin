import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, unref, createTextVNode, createCommentVNode, toDisplayString, withModifiers, ref, watch, createElementVNode, Fragment, renderList, createBlock } from "vue";
import { c as createNamespace, _ as _export_sfc, p as popItemDeep, g as getDeepValue, a as getItemDeep, w as withInstall } from "./utils.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Item",
  props: {
    item: {},
    removable: { type: Boolean, default: false }
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const bem = createNamespace("item");
    const displayText = computed(() => {
      var _a, _b, _c;
      return ((_a = props.item) == null ? void 0 : _a.name) || ((_b = props.item) == null ? void 0 : _b.label) || ((_c = props.item) == null ? void 0 : _c.UNIQUEKEYDATA) || "Unnamed Item";
    });
    const handleRemove = () => {
      emit("remove", props.item);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(bem).b(), { [unref(bem).m("placed")]: _ctx.removable }])
      }, [
        createTextVNode(toDisplayString(displayText.value) + " ", 1),
        !_ctx.removable ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(unref(bem).e("handle"))
        }, "☰", 2)) : createCommentVNode("", true),
        _ctx.removable ? (openBlock(), createElementBlock("button", {
          key: 1,
          class: normalizeClass(unref(bem).e("remove-btn")),
          onClick: withModifiers(handleRemove, ["stop"]),
          "aria-label": "Remove item"
        }, "×", 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const ItemComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-82b9c2e7"]]);
function useDragDrop(sourceItems, placedItems, props, emit) {
  const keyPath = props.onlykey || "id";
  const onDragStart = (event, item) => {
    if (event.dataTransfer) {
      const itemIdValue = getDeepValue(item, keyPath);
      if (itemIdValue !== void 0 && itemIdValue !== null) {
        event.dataTransfer.setData("text/plain", String(itemIdValue));
      }
      event.dataTransfer.effectAllowed = "move";
    }
  };
  const onDrop = (event) => {
    var _a;
    event.preventDefault();
    const itemId = (_a = event.dataTransfer) == null ? void 0 : _a.getData("text/plain");
    if (!itemId) {
      return;
    }
    const itemToDrop = getItemDeep(sourceItems.value, itemId, keyPath);
    if (itemToDrop) {
      const itemKey = getDeepValue(itemToDrop, keyPath);
      const isAlreadyPlaced = placedItems.value.some((p) => getDeepValue(p, keyPath) === itemKey);
      if (!isAlreadyPlaced) {
        sourceItems.value = popItemDeep(sourceItems.value, itemToDrop, keyPath);
        placedItems.value.push(itemToDrop);
        emit("change", {
          source: [...sourceItems.value],
          placed: [...placedItems.value]
        });
      }
    }
  };
  const onItemRemove = (itemToRemove) => {
    placedItems.value = popItemDeep(placedItems.value, itemToRemove, keyPath);
    const itemKey = getDeepValue(itemToRemove, keyPath);
    const isAlreadyInSource = sourceItems.value.some((item) => getDeepValue(item, keyPath) === itemKey);
    if (!isAlreadyInSource) {
      sourceItems.value.push(itemToRemove);
    }
    emit("change", {
      source: [...sourceItems.value],
      placed: [...placedItems.value]
    });
  };
  return {
    onDragStart,
    onDrop,
    onItemRemove
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuDragDrop"
  },
  __name: "Dragdrop",
  props: {
    items: { default: () => [] },
    onlykey: { default: "id" },
    showCount: { type: Boolean, default: true }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const bem = createNamespace("drag-drop");
    const props = __props;
    const emit = __emit;
    const sourceItems = ref([]);
    const placedItems = ref([]);
    const { onDragStart, onDrop, onItemRemove } = useDragDrop(sourceItems, placedItems, props, emit);
    const getUniqueKey = (item, index, suffix = "") => {
      const key = getDeepValue(item, props.onlykey || "id");
      return key !== void 0 && key !== null ? `${key}${suffix}` : `${index}${suffix}`;
    };
    watch(() => props.items, (newItems) => {
      const keyPath = props.onlykey || "id";
      const placedItemKeys = new Set(placedItems.value.map((p) => getDeepValue(p, keyPath)));
      sourceItems.value = (newItems || []).filter((item) => {
        const itemKey = getDeepValue(item, keyPath);
        return !placedItemKeys.has(itemKey);
      });
    }, { deep: true, immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(bem).b())
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("source-list"))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(sourceItems.value, (item, index) => {
            return openBlock(), createBlock(ItemComponent, {
              key: getUniqueKey(item, index),
              item,
              draggable: "true",
              onDragstart: ($event) => unref(onDragStart)($event, item)
            }, null, 8, ["item", "onDragstart"]);
          }), 128))
        ], 2),
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("dropzone")),
          onDragover: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["prevent"])),
          onDragenter: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["prevent"])),
          onDrop: _cache[2] || (_cache[2] = //@ts-ignore
          (...args) => unref(onDrop) && unref(onDrop)(...args))
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("dropzone-content"))
          }, [
            (openBlock(), createElementBlock("svg", {
              class: normalizeClass(unref(bem).e("dropzone-icon")),
              viewBox: "0 0 24 24"
            }, _cache[3] || (_cache[3] = [
              createElementVNode("path", { d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" }, null, -1)
            ]), 2)),
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("dropzone-text"))
            }, "拖放到这里", 2)
          ], 2)
        ], 34),
        props.showCount ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(bem).e("meta"))
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("meta-available"))
          }, " 可用项: " + toDisplayString(sourceItems.value.length), 3),
          placedItems.value.length > 0 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(bem).e("meta-placed"))
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("meta-placed-label"))
            }, " 已放置 (" + toDisplayString(placedItems.value.length) + "): ", 3),
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("meta-placed-list"))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(placedItems.value, (item, index) => {
                return openBlock(), createBlock(ItemComponent, {
                  key: getUniqueKey(item, index, "-placed"),
                  item,
                  removable: "",
                  onRemove: unref(onItemRemove)
                }, null, 8, ["item", "onRemove"]);
              }), 128))
            ], 2)
          ], 2)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Drag = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-76099dbb"]]);
const SuDragDrop = withInstall(Drag);
export {
  SuDragDrop as S
};
