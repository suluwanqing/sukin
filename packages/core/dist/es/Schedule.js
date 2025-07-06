import { defineComponent, ref, watch, computed, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createCommentVNode, Fragment, renderList, toDisplayString, normalizeStyle, withModifiers, createTextVNode, nextTick } from "vue";
import { c as createNamespace, _ as _export_sfc, w as withInstall } from "./utils.js";
let dragOverCellKey = null;
function handleDragStart(event, item) {
  if (!event.dataTransfer || !(event.target instanceof HTMLElement)) return;
  const itemJson = JSON.stringify(item);
  event.dataTransfer.setData("application/json", itemJson);
  event.dataTransfer.effectAllowed = "move";
  event.target.classList.add("is-dragging");
}
function handleDragEnd(event) {
  dragOverCellKey = null;
  if (event.target instanceof HTMLElement) {
    event.target.classList.remove("is-dragging");
  }
}
function handleDragOver(event, sectionIndex, cellIndex) {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
  dragOverCellKey = `${sectionIndex}-${cellIndex}`;
}
function handleDragLeave(sectionIndex, cellIndex) {
  if (dragOverCellKey === `${sectionIndex}-${cellIndex}`) {
    dragOverCellKey = null;
  }
}
function handleDrop(event, sectionIndex, cellIndex, context) {
  event.preventDefault();
  dragOverCellKey = null;
  if (!event.dataTransfer) return;
  const itemDataString = event.dataTransfer.getData("application/json");
  if (!itemDataString) return;
  try {
    const droppedItem = JSON.parse(itemDataString);
    const limitValue = droppedItem[context.quantityKey];
    if (typeof limitValue === "number") {
      const currentUsage = context.itemUsage.value[droppedItem.name] || 0;
      if (currentUsage >= limitValue) {
        return;
      }
      context.itemUsage.value[droppedItem.name] = currentUsage + 1;
    }
    context.gridCellContents.value[`${sectionIndex}-${cellIndex}`] = droppedItem;
  } catch (e) {
    console.error("Failed to parse dropped item data:", e);
  }
}
function removeCellContent(sectionIndex, cellIndex, context) {
  const key = `${sectionIndex}-${cellIndex}`;
  const itemToRemove = context.gridCellContents.value[key];
  if (itemToRemove && typeof itemToRemove[context.quantityKey] === "number") {
    if (context.itemUsage.value[itemToRemove.name]) {
      context.itemUsage.value[itemToRemove.name]--;
    }
  }
  delete context.gridCellContents.value[key];
}
function handleSaveData(context) {
  const data = {
    gridContents: JSON.parse(JSON.stringify(context.gridCellContents.value)),
    labels: context.props.labels,
    metaInfo: context.props.metaInfo,
    gridStructure: context.props.gridStructure,
    layout: {
      direction: context.props.direction
    }
  };
  context.emit("export-data", data);
}
function isDragOver(section, cell) {
  return dragOverCellKey === `${section}-${cell}`;
}
function createCanvasTheme(options) {
  const defaultTheme = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: "#f0f9f8",
    padding: 15,
    gap: 8,
    container: {
      backgroundColor: "#ffffff",
      borderColor: "#d4e8e6",
      borderWidth: 1,
      borderRadius: 8
    },
    header: {
      backgroundColor: "#e0f2f1",
      borderColor: "#b2dfdb",
      borderWidth: 1,
      borderRadius: 6,
      font: {
        size: 14,
        weight: "bold",
        color: "#00796b",
        family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }
    },
    meta: {
      backgroundColor: "#f0f4c3",
      borderColor: "#e6ee9c",
      borderWidth: 1,
      borderRadius: 6,
      font: {
        size: 12,
        weight: "normal",
        color: "#33691e",
        family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }
    },
    cell: {
      backgroundColor: "#ffffff",
      borderColor: "#d4e8e6",
      borderWidth: 1,
      borderStyle: "dashed",
      borderRadius: 6,
      placeholder: {
        text: "Drop Here",
        size: 12,
        weight: "italic",
        color: "#9e9e9e",
        family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }
    },
    droppedItem: {
      backgroundColor: "#fffde7",
      borderColor: "#fff9c4",
      borderWidth: 1,
      borderRadius: 6,
      font: {
        size: 14,
        weight: "500",
        color: "#795548",
        family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }
    }
  };
  return defaultTheme;
}
function drawRoundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function drawText(ctx, text, x, y, font) {
  ctx.fillStyle = font.color;
  ctx.font = `${font.weight} ${font.size}px ${font.family}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}
async function drawScheduleToCanvas(componentRef, theme) {
  const rootEl = componentRef.value;
  if (!rootEl) throw new Error("Component root element is not available.");
  const containerEl = rootEl.querySelector(".su-schedule-table__box-container");
  if (!containerEl) throw new Error("Schedule container not found.");
  const cells = containerEl.querySelectorAll(".su-schedule-table__cell");
  const headers = containerEl.querySelectorAll(".su-schedule-table__label-item");
  const metas = containerEl.querySelectorAll(".su-schedule-table__meta-item");
  const allElements = [...Array.from(cells), ...Array.from(headers), ...Array.from(metas)];
  let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
  allElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    minX = Math.min(minX, rect.left);
    minY = Math.min(minY, rect.top);
    maxX = Math.max(maxX, rect.right);
    maxY = Math.max(maxY, rect.bottom);
  });
  const contentWidth = maxX - minX + theme.padding * 2;
  const contentHeight = maxY - minY + theme.padding * 2;
  const dpr = window.devicePixelRatio || 1;
  const canvas = document.createElement("canvas");
  canvas.width = contentWidth * dpr;
  canvas.height = contentHeight * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.fillStyle = theme.backgroundColor;
  ctx.fillRect(0, 0, contentWidth, contentHeight);
  ctx.fillStyle = theme.container.backgroundColor;
  ctx.strokeStyle = theme.container.borderColor;
  ctx.lineWidth = theme.container.borderWidth;
  drawRoundRect(ctx, 0, 0, contentWidth, contentHeight, theme.container.borderRadius);
  ctx.fill();
  ctx.stroke();
  const drawStyledBox = (el, style, text) => {
    const rect = el.getBoundingClientRect();
    const x = rect.left - minX + theme.padding;
    const y = rect.top - minY + theme.padding;
    ctx.fillStyle = style.backgroundColor;
    ctx.strokeStyle = style.borderColor;
    ctx.lineWidth = style.borderWidth;
    if ("borderStyle" in style && style.borderStyle === "dashed") ctx.setLineDash([5, 3]);
    else ctx.setLineDash([]);
    drawRoundRect(ctx, x, y, rect.width, rect.height, style.borderRadius);
    ctx.fill();
    ctx.stroke();
    if (text && "font" in style) {
      drawText(ctx, text, x + rect.width / 2, y + rect.height / 2, style.font);
    }
  };
  headers.forEach((el) => drawStyledBox(el, theme.header, el.innerText));
  metas.forEach((el) => drawStyledBox(el, theme.meta, el.innerText));
  cells.forEach((el) => {
    const contentEl = el.querySelector(".su-schedule-table__dropped-item");
    if (contentEl) {
      drawStyledBox(el, theme.droppedItem, contentEl.innerText.replace(/×$/, "").trim());
    } else {
      drawStyledBox(el, theme.cell);
      const rect = el.getBoundingClientRect();
      const x = rect.left - minX + theme.padding;
      const y = rect.top - minY + theme.padding;
      drawText(ctx, theme.cell.placeholder.text, x + rect.width / 2, y + rect.height / 2, theme.cell.placeholder);
    }
  });
  return canvas;
}
async function generateCanvasPreview(componentRef, theme) {
  return await drawScheduleToCanvas(componentRef, theme);
}
async function exportCanvasAsImage(componentRef, theme, filename = "schedule.png") {
  try {
    const canvas = await drawScheduleToCanvas(componentRef, theme);
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to export image:", error);
  }
}
const _hoisted_1 = ["draggable", "onDragstart"];
const _hoisted_2 = ["onDragover", "onDragleave", "onDrop"];
const _hoisted_3 = ["onClick"];
const META_HEADER_SIZE = "60px";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuSchedule"
  },
  __name: "Schedule",
  props: {
    draggableItems: { default: () => [] },
    metaInfo: { default: () => [] },
    labels: { default: () => [] },
    gridStructure: { default: () => [] },
    direction: { default: "horizontal" },
    size: { default: "medium" },
    quantityKey: { default: "quantity" }
  },
  emits: ["export-data"],
  setup(__props, { emit: __emit }) {
    const bem = createNamespace("schedule-table");
    const props = __props;
    const emit = __emit;
    const gridCellContents = ref({});
    const scheduleTableElement = ref();
    const itemUsage = ref({});
    watch(gridCellContents, (newContents) => {
      const newUsage = {};
      Object.values(newContents).forEach((item) => {
        if (item && typeof item[props.quantityKey] === "number") {
          newUsage[item.name] = (newUsage[item.name] || 0) + 1;
        }
      });
      itemUsage.value = newUsage;
    }, { deep: true, immediate: true });
    const processedDraggableItems = computed(() => {
      return props.draggableItems.map((item) => {
        const used = itemUsage.value[item.name] || 0;
        const limitValue = item[props.quantityKey];
        const hasLimit = typeof limitValue === "number";
        const remaining = hasLimit ? limitValue - used : Infinity;
        return {
          ...item,
          remaining,
          disabled: hasLimit && remaining <= 0
        };
      });
    });
    const setScheduleTableRef = (el) => {
      if (el) {
        scheduleTableElement.value = el;
      }
    };
    const eventContext = {
      props,
      emit,
      gridCellContents,
      itemUsage,
      quantityKey: props.quantityKey
    };
    const canvasTheme = createCanvasTheme();
    const isPreviewVisible = ref(false);
    const canvasContainerRef = ref(null);
    async function runPreview() {
      try {
        const canvas = await generateCanvasPreview(scheduleTableElement, canvasTheme);
        isPreviewVisible.value = true;
        await nextTick();
        if (canvasContainerRef.value) {
          canvasContainerRef.value.innerHTML = "";
          canvasContainerRef.value.appendChild(canvas);
        }
      } catch (error) {
        console.error("Failed to generate preview:", error);
      }
    }
    function closePreview() {
      isPreviewVisible.value = false;
      if (canvasContainerRef.value) canvasContainerRef.value.innerHTML = "";
    }
    async function runExportImage() {
      await exportCanvasAsImage(scheduleTableElement, canvasTheme, `schedule-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.png`);
      if (isPreviewVisible.value) closePreview();
    }
    const isVertical = computed(() => props.direction === "vertical");
    const maxCellsPerSection = computed(() => Math.max(0, ...(props.gridStructure || []).map(Number)));
    const visibleMetaInfo = computed(() => props.metaInfo.slice(0, maxCellsPerSection.value));
    const showLabels = computed(() => props.labels && props.labels.length > 0);
    const showMeta = computed(() => props.metaInfo && props.metaInfo.length > 0 && maxCellsPerSection.value > 0);
    const showCorner = computed(() => showLabels.value && showMeta.value);
    const hasGridCells = computed(() => props.gridStructure.some((count) => count > 0));
    function getCellContent(section, cell) {
      return gridCellContents.value[`${section}-${cell}`] || null;
    }
    const boxContainerStyle = computed(() => {
      const gridTemplateRows = [];
      const gridTemplateColumns = [];
      if (isVertical.value) {
        if (showMeta.value) gridTemplateRows.push(`minmax(0, ${META_HEADER_SIZE})`);
        gridTemplateRows.push("1fr");
        if (showLabels.value) gridTemplateColumns.push("auto");
        gridTemplateColumns.push("1fr");
      } else {
        if (showLabels.value) gridTemplateRows.push("auto");
        gridTemplateRows.push("1fr");
        if (showMeta.value) gridTemplateColumns.push(`minmax(0, ${META_HEADER_SIZE})`);
        gridTemplateColumns.push("1fr");
      }
      return {
        gridTemplateRows: gridTemplateRows.join(" "),
        gridTemplateColumns: gridTemplateColumns.join(" ")
      };
    });
    const cornerStyle = computed(() => ({ gridRow: "1 / 2", gridColumn: "1 / 2" }));
    const labelsHeaderStyle = computed(() => {
      const style = {
        gridTemplateColumns: `repeat(${props.labels.length}, minmax(0, 1fr))`,
        gridRow: "1 / 2",
        gridColumn: showMeta.value ? "2 / 3" : "1 / -1"
      };
      if (isVertical.value) {
        style.gridTemplateColumns = "";
        style.gridTemplateRows = `repeat(${props.labels.length}, minmax(0, 1fr))`;
        style.gridColumn = "1 / 2";
        style.gridRow = showMeta.value ? "2 / 3" : "1 / -1";
      }
      return style;
    });
    const metaHeaderStyle = computed(() => {
      const style = {
        gridTemplateRows: `repeat(${maxCellsPerSection.value}, minmax(0, 1fr))`,
        gridColumn: "1 / 2",
        gridRow: showLabels.value ? "2 / 3" : "1 / -1"
      };
      if (isVertical.value) {
        style.gridTemplateRows = "";
        style.gridTemplateColumns = `repeat(${maxCellsPerSection.value}, minmax(0, 1fr))`;
        style.gridRow = "1 / 2";
        style.gridColumn = showLabels.value ? "2 / 3" : "1 / -1";
      }
      return style;
    });
    const gridWrapperStyle = computed(() => {
      const style = {
        gridTemplateColumns: `repeat(${props.gridStructure.length}, minmax(0, 1fr))`,
        gridRow: showLabels.value ? "2 / 3" : "1 / -1",
        gridColumn: showMeta.value ? "2 / 3" : "1 / -1"
      };
      if (isVertical.value) {
        style.gridTemplateColumns = "";
        style.gridTemplateRows = `repeat(${props.gridStructure.length}, minmax(0, 1fr))`;
        style.gridColumn = showLabels.value ? "2 / 3" : "1 / -1";
        style.gridRow = showMeta.value ? "2 / 3" : "1 / -1";
      }
      return style;
    });
    function gridSectionStyle(cellCount) {
      if (cellCount === 0) return { display: "none" };
      return isVertical.value ? { gridTemplateColumns: `repeat(${cellCount}, minmax(0, 1fr))` } : { gridTemplateRows: `repeat(${cellCount}, minmax(0, 1fr))` };
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref: setScheduleTableRef,
        class: normalizeClass([unref(bem).b(), unref(bem).m(_ctx.size), unref(bem).m(props.direction)])
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("draggable-area"))
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("draggable-list"))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(processedDraggableItems.value, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.name,
                class: normalizeClass([unref(bem).e("draggable-item"), { "is-disabled": item.disabled }]),
                draggable: !item.disabled,
                onDragstart: ($event) => unref(handleDragStart)($event, item),
                onDragend: _cache[0] || (_cache[0] = //@ts-ignore
                (...args) => unref(handleDragEnd) && unref(handleDragEnd)(...args))
              }, [
                createElementVNode("span", null, toDisplayString(item.label), 1),
                item[props.quantityKey] !== void 0 ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(unref(bem).e("item-quantity"))
                }, " (" + toDisplayString(item.remaining) + ") ", 3)) : createCommentVNode("", true)
              ], 42, _hoisted_1);
            }), 128))
          ], 2),
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("actions-group"))
          }, [
            createElementVNode("button", {
              onClick: runPreview,
              class: normalizeClass([unref(bem).e("button"), unref(bem).e("preview-button")])
            }, "预览", 2),
            createElementVNode("button", {
              onClick: runExportImage,
              class: normalizeClass([unref(bem).e("button"), unref(bem).e("export-image-button")])
            }, "导出图片", 2),
            createElementVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => unref(handleSaveData)(eventContext)),
              class: normalizeClass([unref(bem).e("button"), unref(bem).e("save-button")])
            }, "保存数据", 2)
          ], 2)
        ], 2),
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("box-container")),
          style: normalizeStyle(boxContainerStyle.value)
        }, [
          showCorner.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(bem).e("corner")),
            style: normalizeStyle(cornerStyle.value)
          }, null, 6)) : createCommentVNode("", true),
          showLabels.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(unref(bem).e("labels-header")),
            style: normalizeStyle(labelsHeaderStyle.value)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.labels, (label, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: normalizeClass(unref(bem).e("label-item"))
              }, [
                createElementVNode("span", null, toDisplayString(label.label), 1)
              ], 2);
            }), 128))
          ], 6)) : createCommentVNode("", true),
          showMeta.value ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(unref(bem).e("meta-header")),
            style: normalizeStyle(metaHeaderStyle.value)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(visibleMetaInfo.value, (meta, metaIndex) => {
              return openBlock(), createElementBlock("div", {
                key: metaIndex,
                class: normalizeClass(unref(bem).e("meta-item"))
              }, [
                createElementVNode("span", null, toDisplayString(meta.label), 1)
              ], 2);
            }), 128))
          ], 6)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("grid-wrapper")),
            style: normalizeStyle(gridWrapperStyle.value)
          }, [
            hasGridCells.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(props.gridStructure, (cellCount, sectionIndex) => {
              return openBlock(), createElementBlock("div", {
                key: sectionIndex,
                class: normalizeClass(unref(bem).e("grid-section")),
                style: normalizeStyle(gridSectionStyle(cellCount))
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(cellCount, (cellIndex) => {
                  return openBlock(), createElementBlock("div", {
                    key: `${sectionIndex}-${cellIndex - 1}`,
                    class: normalizeClass([unref(bem).e("cell"), unref(isDragOver)(sectionIndex, cellIndex - 1) && "is-drag-over"]),
                    onDragover: withModifiers(($event) => unref(handleDragOver)($event, sectionIndex, cellIndex - 1), ["prevent"]),
                    onDragleave: ($event) => unref(handleDragLeave)(sectionIndex, cellIndex - 1),
                    onDrop: ($event) => unref(handleDrop)($event, sectionIndex, cellIndex - 1, eventContext)
                  }, [
                    getCellContent(sectionIndex, cellIndex - 1) ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(unref(bem).e("dropped-item"))
                    }, [
                      createTextVNode(toDisplayString(getCellContent(sectionIndex, cellIndex - 1).label) + " ", 1),
                      createElementVNode("button", {
                        onClick: withModifiers(($event) => unref(removeCellContent)(sectionIndex, cellIndex - 1, eventContext), ["stop"]),
                        class: normalizeClass(unref(bem).e("remove-button")),
                        title: "Remove item"
                      }, " × ", 10, _hoisted_3)
                    ], 2)) : (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: normalizeClass(unref(bem).e("cell-placeholder"))
                    }, " Drop Here ", 2))
                  ], 42, _hoisted_2);
                }), 128))
              ], 6);
            }), 128)) : (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(unref(bem).e("grid-empty"))
            }, " Grid layout not available. ", 2))
          ], 6)
        ], 6),
        isPreviewVisible.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(bem).e("preview-overlay")),
          onClick: closePreview
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("preview-modal")),
            onClick: _cache[2] || (_cache[2] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("preview-header"))
            }, [
              _cache[3] || (_cache[3] = createElementVNode("h3", null, "预览", -1)),
              createElementVNode("button", {
                onClick: closePreview,
                class: normalizeClass(unref(bem).e("preview-close-button")),
                title: "关闭"
              }, "×", 2)
            ], 2),
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("preview-content")),
              ref_key: "canvasContainerRef",
              ref: canvasContainerRef
            }, null, 2),
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("preview-footer"))
            }, [
              createElementVNode("button", {
                onClick: runExportImage,
                class: normalizeClass([unref(bem).e("button"), unref(bem).e("export-image-button")])
              }, "下载 PNG", 2),
              createElementVNode("button", {
                onClick: closePreview,
                class: normalizeClass([unref(bem).e("button"), unref(bem).em("button", "secondary")])
              }, "关闭", 2)
            ], 2)
          ], 2)
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Table = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eaf62026"]]);
const SuSchedule = withInstall(Table);
export {
  SuSchedule as S
};
