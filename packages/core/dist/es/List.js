import { defineComponent, reactive, ref, watch, computed, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, toDisplayString, Fragment, renderList, createCommentVNode, createTextVNode, withDirectives, vModelDynamic, vModelSelect, vModelText, onMounted, nextTick, onBeforeUnmount, createVNode, createBlock, withCtx, normalizeStyle, vShow, withKeys } from "vue";
import { c as createNamespace, _ as _export_sfc, w as withInstall } from "./utils.js";
import { S as SuButton } from "./Button.js";
import { S as SuIcon } from "./Icon.js";
const DEFAULT_FORM_TITLE = "表单";
const DEFAULT_FORM_ACTIONS = [
  { label: "提交", emit: "submit" },
  { label: "取消", emit: "cancel" },
  { label: "重置", emit: "reset" }
];
const isImage = (file) => {
  if (!file) return false;
  if (file instanceof File) {
    return file.type.startsWith("image/");
  }
  if (typeof file === "string") {
    return /\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$/i.test(file.split("?")[0]);
  }
  return false;
};
const getPreviewUrl = (file) => {
  if (!file) return "";
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  return file;
};
const getFileName = (file) => {
  var _a;
  if (!file) return "未选择文件";
  if (file instanceof File) {
    return file.name;
  }
  if (typeof file === "string") {
    return ((_a = file.split("/").pop()) == null ? void 0 : _a.split("?")[0]) || file;
  }
  return "已上传文件";
};
const initializeFormState = (formState, fields, model) => {
  const currentFieldKeys = new Set(fields.map((f) => f.model));
  for (const key in formState) {
    if (!currentFieldKeys.has(key)) {
      delete formState[key];
    }
  }
  fields.forEach((f) => {
    var _a;
    if (f) {
      const hasModelValue = model && model[f.model] !== void 0;
      const hasDefaultValue = f.default !== void 0;
      const formStateHasValue = formState[f.model] !== void 0;
      if (hasModelValue) {
        formState[f.model] = model[f.model];
      } else if (hasDefaultValue) {
        if (!formStateHasValue) {
          formState[f.model] = f.default;
        }
      } else if (!formStateHasValue) {
        switch (f.type) {
          case "selection":
            const firstOption = (_a = f.options) == null ? void 0 : _a[0];
            if (firstOption !== void 0) {
              if (typeof firstOption === "object" && firstOption !== null && "value" in firstOption) {
                formState[f.model] = firstOption.value;
              } else {
                formState[f.model] = firstOption;
              }
            } else {
              formState[f.model] = "";
            }
            break;
          case "file":
            formState[f.model] = null;
            break;
          case "textarea":
          case "input":
          default:
            formState[f.model] = "";
            break;
        }
      }
    }
  });
};
const validateForm = (formState, fields) => {
  const errors = {};
  fields.forEach((field) => {
    if (field.required) {
      const value = formState[field.model];
      if (value === null || value === void 0 || typeof value === "string" && value.trim() === "") {
        errors[field.model] = `${field.label}是必填项。`;
      } else if (field.type === "file" && !(value instanceof File) && typeof value !== "string") {
        errors[field.model] = `${field.label}是必填项。`;
      }
    }
  });
  return errors;
};
const handleFileChange = (event, fieldName, formState, emit) => {
  const inputElement = event.target;
  const files = inputElement.files;
  if (files && files.length > 0) {
    const file = files[0];
    formState[fieldName] = file;
    emit("update:model", { ...formState });
    emit("file-change", { fieldName, file });
  } else {
    formState[fieldName] = null;
    emit("update:model", { ...formState });
    emit("file-change", { fieldName, file: null });
  }
};
const clearFile = (fieldName, formState, emit) => {
  formState[fieldName] = null;
  const fileInput = document.getElementById(fieldName);
  if (fileInput) {
    fileInput.value = "";
  }
  emit("update:model", { ...formState });
  emit("file-clear", { fieldName });
};
const resetForm = (formState, fields, model, clearErrors, emit) => {
  initializeFormState(formState, fields, model);
  clearErrors();
  emit("update:model", { ...formState });
  emit("reset");
};
const emitAction = async (type, formState, fields, emit, setErrors, setIsLoading) => {
  if (type === "submit") {
    setIsLoading(true);
    const errors = validateForm(formState, fields);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      await Promise.resolve();
      emit("submit", { ...formState });
    }
    setIsLoading(false);
  } else {
    emit(type);
  }
};
const _hoisted_1$1 = ["for"];
const _hoisted_2$1 = {
  key: 0,
  class: "required-asterisk"
};
const _hoisted_3$1 = ["id", "onUpdate:modelValue", "placeholder", "type", "disabled", "readonly"];
const _hoisted_4$1 = ["id", "onUpdate:modelValue", "disabled", "readonly"];
const _hoisted_5$1 = ["value"];
const _hoisted_6$1 = ["id", "onUpdate:modelValue", "placeholder", "rows", "cols", "disabled", "readonly"];
const _hoisted_7$1 = ["id", "onChange", "accept", "multiple", "disabled"];
const _hoisted_8$1 = ["for", "disabled"];
const _hoisted_9$1 = { key: 0 };
const _hoisted_10$1 = ["onClick"];
const _hoisted_11$1 = ["src"];
const _hoisted_12$1 = ["onClick", "disabled"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuListForm"
  },
  __name: "Listform",
  props: {
    title: { default: DEFAULT_FORM_TITLE },
    fields: { default: () => [] },
    func: { default: () => DEFAULT_FORM_ACTIONS },
    model: { default: () => ({}) }
  },
  emits: ["submit", "cancel", "reset", "update:model", "file-change", "file-clear"],
  setup(__props, { emit: __emit }) {
    const bem = createNamespace("list-form");
    const props = __props;
    const emit = __emit;
    const formState = reactive({});
    const validationErrors = reactive({});
    const isLoading = ref(false);
    const setValidationErrors = (errors) => {
      Object.keys(validationErrors).forEach((key) => delete validationErrors[key]);
      Object.assign(validationErrors, errors);
    };
    const clearValidationErrors = () => {
      Object.keys(validationErrors).forEach((key) => delete validationErrors[key]);
    };
    const setIsLoading = (loading) => {
      isLoading.value = loading;
    };
    const handleFileChangeWrapper = (event, fieldName) => {
      handleFileChange(event, fieldName, formState, emit);
      if (validationErrors[fieldName]) {
        delete validationErrors[fieldName];
      }
    };
    const clearFileWrapper = (fieldName) => {
      clearFile(fieldName, formState, emit);
      if (validationErrors[fieldName]) {
        delete validationErrors[fieldName];
      }
    };
    const emitActionWrapper = (type) => {
      emitAction(type, formState, props.fields, emit, setValidationErrors, setIsLoading);
      if (type === "reset") {
        resetFormWrapper();
      }
    };
    const resetFormWrapper = () => {
      resetForm(formState, props.fields, props.model, clearValidationErrors, emit);
    };
    watch(() => props.model, (newModel) => {
      if (newModel) {
        initializeFormState(formState, props.fields, newModel);
        clearValidationErrors();
      }
    }, { deep: true });
    watch(() => props.fields, (newFields) => {
      initializeFormState(formState, newFields, props.model);
      clearValidationErrors();
    }, { deep: true, immediate: true });
    const fieldRows = computed(() => {
      const res = [];
      const validFields = props.fields.filter((f) => f);
      for (let i = 0; i < validFields.length; i += 2) {
        res.push([validFields[i], validFields[i + 1] || null]);
      }
      return res;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(bem).b())
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("title"))
        }, toDisplayString(props.title), 3),
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("fields"))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(fieldRows.value, (row) => {
            var _a, _b;
            return openBlock(), createElementBlock("div", {
              key: ((_a = row[0]) == null ? void 0 : _a.model) + "-" + (((_b = row[1]) == null ? void 0 : _b.model) || ""),
              class: normalizeClass(unref(bem).e("row"))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(row, (field) => {
                return openBlock(), createElementBlock(Fragment, {
                  key: field == null ? void 0 : field.model
                }, [
                  field ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(unref(bem).e("field"))
                  }, [
                    createElementVNode("label", {
                      for: field.model,
                      class: normalizeClass(unref(bem).e("label"))
                    }, [
                      createTextVNode(toDisplayString(field.label) + " ", 1),
                      field.required ? (openBlock(), createElementBlock("span", _hoisted_2$1, "*")) : createCommentVNode("", true)
                    ], 10, _hoisted_1$1),
                    createElementVNode("div", {
                      class: normalizeClass(unref(bem).e("input-wrapper"))
                    }, [
                      field.type === "input" ? withDirectives((openBlock(), createElementBlock("input", {
                        key: 0,
                        id: field.model,
                        "onUpdate:modelValue": ($event) => formState[field.model] = $event,
                        placeholder: field.placeholder || "",
                        type: field.inputType || "text",
                        disabled: field.disabled,
                        readonly: field.readonly,
                        class: normalizeClass({ "is-error": validationErrors[field.model] })
                      }, null, 10, _hoisted_3$1)), [
                        [vModelDynamic, formState[field.model]]
                      ]) : field.type === "selection" ? (openBlock(), createElementBlock("div", {
                        key: 1,
                        class: normalizeClass(unref(bem).e("select-wrapper"))
                      }, [
                        withDirectives(createElementVNode("select", {
                          id: field.model,
                          "onUpdate:modelValue": ($event) => formState[field.model] = $event,
                          disabled: field.disabled,
                          readonly: field.readonly,
                          class: normalizeClass({ "is-error": validationErrors[field.model] })
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(field.options, (opt, i) => {
                            return openBlock(), createElementBlock("option", {
                              key: i,
                              value: typeof opt === "object" ? opt.value : opt
                            }, toDisplayString(typeof opt === "object" ? opt.label : opt), 9, _hoisted_5$1);
                          }), 128))
                        ], 10, _hoisted_4$1), [
                          [vModelSelect, formState[field.model]]
                        ])
                      ], 2)) : field.type === "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
                        key: 2,
                        id: field.model,
                        "onUpdate:modelValue": ($event) => formState[field.model] = $event,
                        placeholder: field.placeholder || "",
                        rows: field.rows || 3,
                        cols: field.cols || 50,
                        disabled: field.disabled,
                        readonly: field.readonly,
                        class: normalizeClass({ "is-error": validationErrors[field.model] })
                      }, null, 10, _hoisted_6$1)), [
                        [vModelText, formState[field.model]]
                      ]) : field.type === "file" ? (openBlock(), createElementBlock("div", {
                        key: 3,
                        class: normalizeClass(unref(bem).e("upload-wrapper"))
                      }, [
                        createElementVNode("input", {
                          type: "file",
                          id: field.model,
                          onChange: ($event) => handleFileChangeWrapper($event, field.model),
                          accept: field.accept || "*",
                          multiple: field.multiple || false,
                          disabled: field.disabled || field.readonly,
                          class: normalizeClass([unref(bem).e("file-input"), { "is-error": validationErrors[field.model] }])
                        }, null, 42, _hoisted_7$1),
                        createElementVNode("label", {
                          for: field.model,
                          class: normalizeClass([unref(bem).e("upload-label"), { "is-error": validationErrors[field.model] }]),
                          disabled: field.disabled || field.readonly
                        }, [
                          !formState[field.model] ? (openBlock(), createElementBlock("span", _hoisted_9$1, "选择文件")) : (openBlock(), createElementBlock("span", {
                            key: 1,
                            class: normalizeClass(unref(bem).e("file-name"))
                          }, toDisplayString(unref(getFileName)(formState[field.model])), 3))
                        ], 10, _hoisted_8$1),
                        formState[field.model] && !field.disabled && !field.readonly ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          type: "button",
                          class: normalizeClass(unref(bem).e("clear-file-btn")),
                          onClick: ($event) => clearFileWrapper(field.model)
                        }, " × ", 10, _hoisted_10$1)) : createCommentVNode("", true),
                        field.preview && formState[field.model] ? (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(unref(bem).e("preview-container"))
                        }, [
                          unref(isImage)(formState[field.model]) ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            src: unref(getPreviewUrl)(formState[field.model]),
                            class: normalizeClass(unref(bem).e("preview-image")),
                            alt: "Preview"
                          }, null, 10, _hoisted_11$1)) : (openBlock(), createElementBlock("div", {
                            key: 1,
                            class: normalizeClass(unref(bem).e("non-image-preview"))
                          }, " 文件已选择: " + toDisplayString(unref(getFileName)(formState[field.model])), 3))
                        ], 2)) : createCommentVNode("", true)
                      ], 2)) : createCommentVNode("", true),
                      validationErrors[field.model] ? (openBlock(), createElementBlock("div", {
                        key: 4,
                        class: normalizeClass(unref(bem).e("error-message"))
                      }, toDisplayString(validationErrors[field.model]), 3)) : createCommentVNode("", true)
                    ], 2)
                  ], 2)) : createCommentVNode("", true)
                ], 64);
              }), 128))
            ], 2);
          }), 128))
        ], 2),
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("actions"))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.func, (action, idx) => {
            return openBlock(), createElementBlock("button", {
              key: idx,
              onClick: ($event) => emitActionWrapper(action.emit),
              type: "button",
              class: normalizeClass([unref(bem).e("action-btn"), action.emit === "submit" ? unref(bem).m("primary") : unref(bem).m("secondary")]),
              disabled: isLoading.value && action.emit === "submit"
            }, [
              isLoading.value && action.emit === "submit" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createElementVNode("span", {
                  class: normalizeClass(unref(bem).e("loading-spinner"))
                }, null, 2),
                _cache[0] || (_cache[0] = createTextVNode(" 加载中... "))
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(action.label), 1)
              ], 64))
            ], 10, _hoisted_12$1);
          }), 128))
        ], 2)
      ], 2);
    };
  }
});
const Listform = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3ae7fea2"]]);
const SuListform = withInstall(Listform);
const SELECTION_CHANGE = "selection-change";
function handleToggleRow(emit, props, state, row) {
  if (!props.selectable) return;
  const key = props.rowKey ? row[props.rowKey] : void 0;
  if (key === void 0) return;
  if (state.selectedRowKeys.has(key)) {
    state.selectedRowKeys.delete(key);
  } else {
    state.selectedRowKeys.add(key);
  }
  emit(SELECTION_CHANGE, Array.from(state.selectedRowKeys));
}
function handleToggleAllOnPage(emit, props, state, isAllSelected, processedData) {
  if (!props.selectable || !processedData.length) return;
  const currentPageRowKeys = processedData.map((r) => props.rowKey ? r[props.rowKey] : void 0).filter((key) => key !== void 0);
  currentPageRowKeys.forEach((key) => {
    if (isAllSelected) {
      state.selectedRowKeys.delete(key);
    } else {
      state.selectedRowKeys.add(key);
    }
  });
  emit(SELECTION_CHANGE, Array.from(state.selectedRowKeys));
}
function handleToggleColumn(state, colValue) {
  const index = state.visibleColumns.indexOf(colValue);
  if (index > -1) {
    state.visibleColumns.splice(index, 1);
  } else {
    state.visibleColumns.push(colValue);
  }
}
function handleRowAction(emit, action, row) {
  emit(action.emit, row);
}
function handleNavAction(emit, state, btn) {
  emit(btn.emit, state.selectedValues);
}
function handleIconMouse(state, icon, show) {
  const targetIcon = state.internalNavIc.find((i) => i.label === icon.label);
  if (targetIcon) {
    targetIcon.show = show;
  }
}
const _hoisted_1 = ["onUpdate:modelValue"];
const _hoisted_2 = ["value"];
const _hoisted_3 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_4 = ["onMouseover", "onMouseleave"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["onClick"];
const _hoisted_7 = ["checked", "disabled"];
const _hoisted_8 = ["title"];
const _hoisted_9 = ["checked", "onChange"];
const _hoisted_10 = ["title"];
const _hoisted_11 = { class: "su-list__page-info" };
const _hoisted_12 = { class: "su-list__page-info-current" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "SuList" },
  __name: "List",
  props: {
    data: { default: () => [] },
    pageData: { default: () => ({ data: [], actions: [] }) },
    paginationType: { default: "external" },
    pageSize: { default: 10 },
    currentPage: { default: 1 },
    total: { default: 0 },
    showFilters: { type: Boolean, default: true },
    showNavButtons: { type: Boolean, default: true },
    showNavIcons: { type: Boolean, default: true },
    showActionsColumn: { type: Boolean, default: true },
    showElevator: { type: Boolean, default: false },
    mode: { default: "full" },
    selectable: { type: Boolean, default: false },
    rowKey: { default: "id" },
    mynavs: { default: () => [] },
    selectBt: { default: () => [] },
    naVBt: { default: () => [] },
    navIc: { default: () => [] },
    column: { default: () => [] },
    theme: { default: "ocean-blue" },
    plain: { type: Boolean, default: false }
  },
  emits: ["update:currentPage", "selection-change", "search", "reset"],
  setup(__props, { emit: __emit }) {
    const bem = createNamespace("list");
    const props = __props;
    const emit = __emit;
    const state = reactive({
      selectedValues: {},
      visibleColumns: [],
      internalCurrentPage: 1,
      jumpPageInput: 1,
      selectedRowKeys: /* @__PURE__ */ new Set(),
      internalNavIc: [],
      isActionsColumnVisible: true
    });
    const wrapperRef = ref(null);
    const headerRef = ref(null);
    const bodyRef = ref(null);
    const columnStyles = ref({});
    let resizeObserver = null;
    const finalCurrentPage = computed(() => props.paginationType === "internal" ? state.internalCurrentPage : props.currentPage);
    const finalTotalPages = computed(() => {
      const total = props.paginationType === "internal" ? props.data.length : props.total;
      return Math.ceil(total / props.pageSize) || 1;
    });
    const processedData = computed(() => {
      if (props.paginationType === "internal") {
        const start = (state.internalCurrentPage - 1) * props.pageSize;
        const end = start + props.pageSize;
        return props.data.slice(start, end);
      }
      return props.pageData.data;
    });
    const finalPageData = computed(() => ({
      data: processedData.value,
      actions: props.pageData.actions
    }));
    const selectionNavs = computed(() => props.mynavs.filter((item) => item.type === "selection"));
    const inputNavs = computed(() => props.mynavs.filter((item) => item.type === "input"));
    const hasActions = computed(() => {
      var _a, _b;
      return props.showActionsColumn && !!((_b = (_a = props.pageData) == null ? void 0 : _a.actions) == null ? void 0 : _b.length);
    });
    const isAllOnPageSelected = computed(() => {
      if (!props.selectable || !processedData.value.length) return false;
      return processedData.value.every((row) => state.selectedRowKeys.has(row[props.rowKey]));
    });
    const isRowSelected = (row) => state.selectedRowKeys.has(row[props.rowKey]);
    const getCellTitle = (row, col) => {
      const value = row[col.value];
      return Array.isArray(value) ? value.join(" | ") : String(value ?? "");
    };
    const goToPage = (page) => {
      let pageNum = Number(page);
      if (isNaN(pageNum) || pageNum < 1) {
        pageNum = 1;
      }
      if (pageNum > finalTotalPages.value) {
        pageNum = finalTotalPages.value;
      }
      state.jumpPageInput = pageNum;
      if (props.paginationType === "internal") {
        state.internalCurrentPage = pageNum;
      }
      emit("update:currentPage", pageNum);
    };
    const updateLayout = () => {
      const headerEl = headerRef.value;
      const bodyEl = bodyRef.value;
      if (!headerEl || !bodyEl || !processedData.value.length) {
        columnStyles.value = {};
        return;
      }
      columnStyles.value = {};
      const scrollbarWidth = bodyEl.offsetWidth - bodyEl.clientWidth;
      headerEl.style.paddingRight = `${scrollbarWidth}px`;
      nextTick(() => {
        const availableWidth = bodyEl.clientWidth;
        const headerRow = headerEl.querySelector(`.${bem.e("table-row")}`);
        const bodyRows = bodyEl.querySelectorAll(`.${bem.e("table-row")}`);
        if (!headerRow) return;
        const allRows = [headerRow, ...Array.from(bodyRows)];
        const minColumnWidths = /* @__PURE__ */ new Map();
        allRows.forEach((row) => {
          Array.from(row.children).forEach((cell, index) => {
            const currentMax = minColumnWidths.get(index) || 0;
            minColumnWidths.set(index, Math.max(currentMax, cell.offsetWidth));
          });
        });
        const totalMinWidth = Array.from(minColumnWidths.values()).reduce((sum, w) => sum + w, 0);
        const newStyles = {};
        let cellIndex = 0;
        const applyStyle = (key, flexValue) => {
          const minWidth = minColumnWidths.get(cellIndex);
          if (minWidth === void 0) return;
          if (totalMinWidth > availableWidth) {
            newStyles[key] = { width: `${minWidth}px`, flex: "none" };
          } else {
            const flex = flexValue ?? 1;
            newStyles[key] = { flex: `${flex} 1 ${minWidth}px` };
          }
          cellIndex++;
        };
        if (props.selectable) applyStyle("selection", 0.5);
        props.column.forEach((col) => {
          if (state.visibleColumns.includes(col.value)) {
            applyStyle(col.value, col.flex);
          }
        });
        if (hasActions.value && state.isActionsColumnVisible) applyStyle("actions", 1);
        columnStyles.value = newStyles;
      });
    };
    const handleBodyScroll = () => {
      if (headerRef.value && bodyRef.value) {
        headerRef.value.scrollLeft = bodyRef.value.scrollLeft;
      }
    };
    onMounted(() => {
      state.visibleColumns = props.column.map((c) => c.value);
      state.isActionsColumnVisible = props.showActionsColumn;
      if (wrapperRef.value) {
        resizeObserver = new ResizeObserver(updateLayout);
        resizeObserver.observe(wrapperRef.value);
      }
      if (bodyRef.value) {
        bodyRef.value.addEventListener("scroll", handleBodyScroll);
      }
      nextTick(updateLayout);
    });
    onBeforeUnmount(() => {
      if (resizeObserver && wrapperRef.value) resizeObserver.unobserve(wrapperRef.value);
      if (bodyRef.value) bodyRef.value.removeEventListener("scroll", handleBodyScroll);
      resizeObserver = null;
    });
    watch(finalCurrentPage, (newPage) => {
      state.jumpPageInput = newPage;
    }, { immediate: true });
    watch(() => props.navIc, (newIcons) => {
      state.internalNavIc = newIcons.map((icon) => ({ ...icon, show: false }));
    }, { immediate: true, deep: true });
    watch([processedData, () => state.visibleColumns, () => state.isActionsColumnVisible], () => {
      nextTick(updateLayout);
    }, { deep: true, immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(bem).b(), `theme-${props.theme}`, { "is-plain": props.plain }]),
        ref_key: "wrapperRef",
        ref: wrapperRef
      }, [
        props.showFilters && props.mode === "full" && (selectionNavs.value.length > 0 || inputNavs.value.length > 0) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(bem).e("filters"))
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("filter-items"))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(selectionNavs.value, (nav, i) => {
              return openBlock(), createElementBlock("div", {
                key: "sel" + i,
                class: normalizeClass(unref(bem).e("filter-item"))
              }, [
                createElementVNode("span", {
                  class: normalizeClass(unref(bem).e("filter-label"))
                }, toDisplayString(nav.name) + ":", 3),
                withDirectives(createElementVNode("select", {
                  class: normalizeClass(unref(bem).e("filter-select")),
                  "onUpdate:modelValue": ($event) => state.selectedValues[nav.column] = $event
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(nav.options, (opt) => {
                    return openBlock(), createElementBlock("option", {
                      key: opt.value,
                      value: opt.value
                    }, toDisplayString(opt.label), 9, _hoisted_2);
                  }), 128))
                ], 10, _hoisted_1), [
                  [vModelSelect, state.selectedValues[nav.column]]
                ])
              ], 2);
            }), 128)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(inputNavs.value, (nav, i) => {
              return openBlock(), createElementBlock("div", {
                key: "input" + i,
                class: normalizeClass(unref(bem).e("filter-item"))
              }, [
                createElementVNode("div", {
                  class: normalizeClass(unref(bem).e("filter-input-wrapper"))
                }, [
                  createElementVNode("span", {
                    class: normalizeClass(unref(bem).e("filter-label"))
                  }, toDisplayString(nav.name) + ":", 3),
                  withDirectives(createElementVNode("input", {
                    type: "text",
                    "onUpdate:modelValue": ($event) => state.selectedValues[nav.column] = $event,
                    placeholder: nav.placeholder,
                    class: normalizeClass(unref(bem).e("filter-input"))
                  }, null, 10, _hoisted_3), [
                    [vModelText, state.selectedValues[nav.column]]
                  ]),
                  nav.icon ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(unref(bem).e("filter-search-icon"))
                  }, [
                    createVNode(SuIcon, {
                      icon: nav.icon
                    }, null, 8, ["icon"])
                  ], 2)) : createCommentVNode("", true)
                ], 2)
              ], 2);
            }), 128))
          ], 2),
          props.selectBt.length > 0 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(bem).e("filter-actions"))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.selectBt, (btn, i) => {
              return openBlock(), createBlock(SuButton, {
                key: i,
                type: btn.type,
                onClick: ($event) => unref(handleNavAction)(emit, state, btn)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(btn.label), 1)
                ]),
                _: 2
              }, 1032, ["type", "onClick"]);
            }), 128))
          ], 2)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        props.mode !== "simple" && (props.showNavButtons && props.naVBt.length > 0 || props.showNavIcons && state.internalNavIc.length > 0) ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(bem).e("nav"))
        }, [
          props.showNavButtons && props.naVBt.length > 0 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(bem).e("nav-buttons"))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.naVBt, (btn, i) => {
              return openBlock(), createBlock(SuButton, {
                key: i,
                type: btn.type,
                icon: btn.icon,
                onClick: ($event) => unref(handleNavAction)(emit, state, btn)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(btn.label), 1)
                ]),
                _: 2
              }, 1032, ["type", "icon", "onClick"]);
            }), 128))
          ], 2)) : createCommentVNode("", true),
          props.showNavIcons && state.internalNavIc.length > 0 ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(unref(bem).e("nav-icons"))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(state.internalNavIc, (icon, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: normalizeClass(unref(bem).e("nav-icon-item")),
                onMouseover: ($event) => unref(handleIconMouse)(state, icon, true),
                onMouseleave: ($event) => unref(handleIconMouse)(state, icon, false)
              }, [
                createElementVNode("span", {
                  class: normalizeClass(unref(bem).e("nav-icon-wrapper")),
                  onClick: ($event) => unref(handleNavAction)(emit, state, icon)
                }, [
                  createVNode(SuIcon, {
                    icon: icon.icon,
                    class: "nav-func-icon"
                  }, null, 8, ["icon"])
                ], 10, _hoisted_5),
                icon.show ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(unref(bem).e("tooltip"))
                }, toDisplayString(icon.label), 3)) : createCommentVNode("", true)
              ], 42, _hoisted_4);
            }), 128))
          ], 2)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("content"))
        }, [
          props.mode !== "simple" ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(bem).e("col-toggle-bar"))
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(bem).e("col-toggle-title"))
            }, "显示列:", 2),
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.column, (col) => {
              return openBlock(), createElementBlock("span", {
                key: col.value,
                onClick: ($event) => unref(handleToggleColumn)(state, col.value),
                class: normalizeClass([unref(bem).e("col-toggle-item"), { [unref(bem).em("col-toggle-item", "inactive")]: !state.visibleColumns.includes(col.value) }])
              }, [
                createVNode(SuIcon, {
                  icon: state.visibleColumns.includes(col.value) ? "eye" : "eye-slash",
                  class: "col-toggle-icon"
                }, null, 8, ["icon"]),
                createTextVNode(" " + toDisplayString(col.label), 1)
              ], 10, _hoisted_6);
            }), 128)),
            hasActions.value ? (openBlock(), createElementBlock("span", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = ($event) => state.isActionsColumnVisible = !state.isActionsColumnVisible),
              class: normalizeClass([unref(bem).e("col-toggle-item"), { [unref(bem).em("col-toggle-item", "inactive")]: !state.isActionsColumnVisible }])
            }, [
              createVNode(SuIcon, {
                icon: state.isActionsColumnVisible ? "eye" : "eye-slash",
                class: "col-toggle-icon"
              }, null, 8, ["icon"]),
              _cache[9] || (_cache[9] = createTextVNode("操作 "))
            ], 2)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("table-wrapper"))
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("table-header")),
              ref_key: "headerRef",
              ref: headerRef
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(bem).e("table-row"))
              }, [
                props.selectable ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  style: normalizeStyle(columnStyles.value["selection"]),
                  class: normalizeClass([unref(bem).e("table-cell"), unref(bem).em("table-cell", "selection")])
                }, [
                  createElementVNode("input", {
                    type: "checkbox",
                    checked: isAllOnPageSelected.value,
                    disabled: !processedData.value.length,
                    onChange: _cache[1] || (_cache[1] = ($event) => unref(handleToggleAllOnPage)(emit, props, state, isAllOnPageSelected.value, processedData.value))
                  }, null, 40, _hoisted_7)
                ], 6)) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(props.column, (col) => {
                  return withDirectives((openBlock(), createElementBlock("span", {
                    style: normalizeStyle(columnStyles.value[col.value]),
                    key: "header-" + col.value,
                    class: normalizeClass(unref(bem).e("table-cell")),
                    title: col.label
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass(unref(bem).e("cell-inner"))
                    }, toDisplayString(col.label), 3)
                  ], 14, _hoisted_8)), [
                    [vShow, state.visibleColumns.includes(col.value)]
                  ]);
                }), 128)),
                hasActions.value && state.isActionsColumnVisible ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  style: normalizeStyle(columnStyles.value["actions"]),
                  class: normalizeClass([unref(bem).e("table-cell"), unref(bem).em("table-cell", "actions")])
                }, "操作", 6)) : createCommentVNode("", true)
              ], 2)
            ], 2),
            createElementVNode("div", {
              class: normalizeClass(unref(bem).e("table-body")),
              ref_key: "bodyRef",
              ref: bodyRef
            }, [
              processedData.value.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(processedData.value, (row, idx) => {
                return openBlock(), createElementBlock("div", {
                  key: row[props.rowKey] || idx,
                  class: normalizeClass([unref(bem).e("table-row"), { "is-selected": isRowSelected(row) }])
                }, [
                  props.selectable ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    style: normalizeStyle(columnStyles.value["selection"]),
                    class: normalizeClass([unref(bem).e("table-cell"), unref(bem).em("table-cell", "selection")])
                  }, [
                    createElementVNode("input", {
                      type: "checkbox",
                      checked: isRowSelected(row),
                      onChange: ($event) => unref(handleToggleRow)(emit, props, state, row)
                    }, null, 40, _hoisted_9)
                  ], 6)) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(props.column, (col) => {
                    return withDirectives((openBlock(), createElementBlock("span", {
                      key: "cell-" + col.value,
                      style: normalizeStyle(columnStyles.value[col.value]),
                      class: normalizeClass(unref(bem).e("table-cell")),
                      title: getCellTitle(row, col)
                    }, [
                      createElementVNode("span", {
                        class: normalizeClass(unref(bem).e("cell-inner"))
                      }, [
                        Array.isArray(row[col.value]) ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(row[col.value], (item, i) => {
                          return openBlock(), createElementBlock("span", { key: i }, [
                            createTextVNode(toDisplayString(item), 1),
                            i < row[col.value].length - 1 ? (openBlock(), createElementBlock("span", {
                              key: 0,
                              class: normalizeClass(unref(bem).e("cell-array-separator"))
                            }, "|", 2)) : createCommentVNode("", true)
                          ]);
                        }), 128)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                          createTextVNode(toDisplayString(row[col.value]), 1)
                        ], 64))
                      ], 2)
                    ], 14, _hoisted_10)), [
                      [vShow, state.visibleColumns.includes(col.value)]
                    ]);
                  }), 128)),
                  hasActions.value && state.isActionsColumnVisible && finalPageData.value.actions ? (openBlock(), createElementBlock("span", {
                    key: 1,
                    style: normalizeStyle(columnStyles.value["actions"]),
                    class: normalizeClass([unref(bem).e("table-cell"), unref(bem).em("table-cell", "actions")])
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(finalPageData.value.actions, (action, actionIdx) => {
                      return openBlock(), createElementBlock(Fragment, { key: actionIdx }, [
                        !action.hidden || !action.hidden(row) ? (openBlock(), createBlock(SuButton, {
                          key: 0,
                          type: action.type,
                          icon: action.icon,
                          size: "small",
                          onClick: ($event) => unref(handleRowAction)(emit, action, row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(action.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["type", "icon", "onClick"])) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ], 6)) : createCommentVNode("", true)
                ], 2);
              }), 128)) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(unref(bem).e("no-data"))
              }, "暂无数据", 2))
            ], 2)
          ], 2),
          createElementVNode("div", {
            class: normalizeClass(unref(bem).e("pagination"))
          }, [
            createVNode(SuButton, {
              plain: "",
              disabled: finalCurrentPage.value <= 1,
              onClick: _cache[2] || (_cache[2] = ($event) => goToPage(1)),
              icon: "backward-step"
            }, {
              default: withCtx(() => _cache[10] || (_cache[10] = [
                createTextVNode("首页 ")
              ])),
              _: 1,
              __: [10]
            }, 8, ["disabled"]),
            createVNode(SuButton, {
              plain: "",
              disabled: finalCurrentPage.value <= 1,
              onClick: _cache[3] || (_cache[3] = ($event) => goToPage(finalCurrentPage.value - 1)),
              icon: "arrow-left"
            }, {
              default: withCtx(() => _cache[11] || (_cache[11] = [
                createTextVNode(" 上一页 ")
              ])),
              _: 1,
              __: [11]
            }, 8, ["disabled"]),
            createElementVNode("span", _hoisted_11, [
              createElementVNode("span", _hoisted_12, toDisplayString(finalCurrentPage.value), 1),
              createTextVNode(" / " + toDisplayString(finalTotalPages.value), 1)
            ]),
            props.showElevator ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(unref(bem).e("page-elevator"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(bem).e("elevator-text"))
              }, "第", 2),
              withDirectives(createElementVNode("input", {
                type: "number",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => state.jumpPageInput = $event),
                onKeyup: _cache[5] || (_cache[5] = withKeys(($event) => goToPage(state.jumpPageInput), ["enter"])),
                onBlur: _cache[6] || (_cache[6] = ($event) => goToPage(state.jumpPageInput)),
                class: normalizeClass(unref(bem).e("page-input"))
              }, null, 34), [
                [
                  vModelText,
                  state.jumpPageInput,
                  void 0,
                  { number: true }
                ]
              ]),
              createElementVNode("span", {
                class: normalizeClass(unref(bem).e("elevator-text"))
              }, "页", 2)
            ], 2)) : createCommentVNode("", true),
            createVNode(SuButton, {
              plain: "",
              disabled: finalCurrentPage.value >= finalTotalPages.value,
              onClick: _cache[7] || (_cache[7] = ($event) => goToPage(finalCurrentPage.value + 1)),
              icon: "arrow-right"
            }, {
              default: withCtx(() => _cache[12] || (_cache[12] = [
                createTextVNode("下一页")
              ])),
              _: 1,
              __: [12]
            }, 8, ["disabled"]),
            createVNode(SuButton, {
              plain: "",
              disabled: finalCurrentPage.value >= finalTotalPages.value,
              onClick: _cache[8] || (_cache[8] = ($event) => goToPage(finalTotalPages.value)),
              icon: "forward-step"
            }, {
              default: withCtx(() => _cache[13] || (_cache[13] = [
                createTextVNode("尾页")
              ])),
              _: 1,
              __: [13]
            }, 8, ["disabled"])
          ], 2)
        ], 2)
      ], 2);
    };
  }
});
const List = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-713fe90d"]]);
const SuList = withInstall(List);
export {
  SuListform as S,
  SuList as a
};
