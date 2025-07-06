import { c as createNamespace, w as withInstall } from "./utils.js";
import { defineComponent, ref, reactive, watch, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, createElementVNode, Fragment, renderList, toDisplayString, createBlock, createCommentVNode, withDirectives, vModelDynamic } from "vue";
import { S as SuAlert } from "./Alert.js";
const EVENT_SUBMIT = "submit";
const internalValidators = {
  email: (options) => (value) => {
    const msg = options.message || "请输入有效的电子邮件地址";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : msg;
  },
  minLength: (options) => (value) => {
    const msg = options.message || `长度不能少于 ${options.length} 个字符`;
    return value.length >= options.length ? true : msg;
  }
};
const validateField = (field, state) => {
  var _a;
  if (!state.touched.value.has(field.id)) return true;
  state.formErrors[field.id] = null;
  const value = state.formData[field.id];
  const hasValue = value !== null && value !== void 0 && String(value).trim() !== "";
  if (field.required && !hasValue) {
    state.formErrors[field.id] = "此字段为必填项";
    return false;
  }
  if (hasValue && field.rules) {
    for (const rule of field.rules) {
      const ruleName = typeof rule === "string" ? rule : rule.name;
      const ruleOptions = typeof rule === "string" ? {} : rule;
      const validator = (_a = internalValidators[ruleName]) == null ? void 0 : _a.call(internalValidators, ruleOptions);
      if (validator) {
        const result = validator(value);
        if (result !== true) {
          state.formErrors[field.id] = result;
          return false;
        }
      }
    }
  }
  return true;
};
const validateFields = (fields, state) => {
  let isFormValid = true;
  let firstErrorMessage = null;
  for (const field of fields) {
    state.touched.value.add(field.id);
    if (!validateField(field, state)) {
      isFormValid = false;
      if (!firstErrorMessage && state.formErrors[field.id]) {
        firstErrorMessage = `字段 "${field.label}": ${state.formErrors[field.id]}`;
      }
    }
  }
  if (!isFormValid) {
    state.generalError.value = firstErrorMessage || "请修正表单中的错误。";
  } else {
    state.generalError.value = null;
  }
  return isFormValid;
};
const initializeState = (props, state) => {
  const allFieldIds = /* @__PURE__ */ new Set();
  props.sections.forEach((section) => {
    (section.fields || []).forEach((f) => allFieldIds.add(f.id));
    (section.steps || []).forEach((s) => s.fields.forEach((f) => allFieldIds.add(f.id)));
  });
  Object.keys(state.formData).forEach((key) => delete state.formData[key]);
  allFieldIds.forEach((id) => {
    state.formData[id] = "";
  });
  state.currentStep.value = 1;
  state.formErrors = {};
  state.generalError.value = null;
  state.touched.value = /* @__PURE__ */ new Set();
};
const handleCloseRequest = (emit) => emit("close");
const handleSwitchForm = (formType, props, state) => {
  state.selectedForm.value = formType;
  initializeState(props, state);
};
const handleSubmit = (section, state, emit) => {
  if (!validateFields(section.fields || [], state)) return;
  emit(EVENT_SUBMIT, section.title, { ...state.formData });
};
const handleNextStep = async (stepInfo, section, state, emit) => {
  if (!validateFields(stepInfo.fields, state)) return;
  if (stepInfo.func) {
    try {
      const result = await stepInfo.func(state.formData);
      if (result !== true) {
        state.generalError.value = typeof result === "string" ? result : "验证失败，请稍后重试。";
        return;
      }
    } catch (error) {
      state.generalError.value = "操作时发生未知错误。";
      return;
    }
  }
  const isLastStep = section.step_model && state.currentStep.value === section.step_model.All_Steps;
  if (isLastStep) {
    emit(EVENT_SUBMIT, section.title, { ...state.formData });
  } else {
    state.currentStep.value++;
  }
};
const handlePreviousStep = (state) => {
  if (state.currentStep.value > 1) {
    state.formErrors = {};
    state.generalError.value = null;
    state.currentStep.value--;
  }
};
const _hoisted_1 = ["onClick"];
const _hoisted_2 = { key: 0 };
const _hoisted_3 = ["for"];
const _hoisted_4 = ["type", "id", "onUpdate:modelValue", "placeholder", "onBlur"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["for"];
const _hoisted_7 = ["type", "id", "onUpdate:modelValue", "placeholder", "onBlur"];
const _hoisted_8 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "SuDataform"
  },
  __name: "Dataform",
  props: {
    backgroundImage: { default: "" },
    sections: { default: () => [] },
    initialForm: { default: "" },
    size: { default: "medium" },
    direction: { default: "vertical" }
  },
  emits: ["submit", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const bem = createNamespace("form-panel");
    const props = __props;
    const emit = __emit;
    const selectedForm = ref("");
    const currentStep = ref(1);
    const formData = reactive({});
    const formErrors = reactive({});
    const generalError = ref(null);
    const touched = ref(/* @__PURE__ */ new Set());
    const state = {
      selectedForm,
      currentStep,
      formData,
      formErrors,
      generalError,
      touched
    };
    let alertTimer = null;
    const onFieldBlur = (field) => {
      touched.value.add(field.id);
      validateField(field, state);
    };
    const onCloseRequest = () => handleCloseRequest(emit);
    const onSwitchForm = (title) => handleSwitchForm(title, props, state);
    const onSubmit = (section) => handleSubmit(section, state, emit);
    const onNextStep = (stepInfo, section) => handleNextStep(stepInfo, section, state, emit);
    const onPreviousStep = () => handlePreviousStep(state);
    watch(generalError, (newError) => {
      if (alertTimer) clearTimeout(alertTimer);
      if (newError) {
        alertTimer = setTimeout(() => {
          generalError.value = null;
        }, 3e3);
      }
    });
    const resetForm = () => initializeState(props, state);
    __expose({ resetForm });
    watch(() => props.sections, () => {
      var _a;
      selectedForm.value = props.initialForm || ((_a = props.sections[0]) == null ? void 0 : _a.title) || "";
      initializeState(props, state);
    }, { deep: true, immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(bem).b(), unref(bem).m(props.direction), unref(bem).m(props.size), unref(bem).is("with-bg", !!props.backgroundImage)]),
        style: normalizeStyle({ "--su-form-panel-bg-image": `url(${props.backgroundImage})` })
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("selector"))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.sections, (section) => {
            return openBlock(), createElementBlock("button", {
              key: section.title,
              class: normalizeClass([unref(bem).e("button"), unref(bem).em("button", "nav"), unref(bem).is("active", selectedForm.value === section.title)]),
              onClick: ($event) => onSwitchForm(section.title)
            }, toDisplayString(section.title), 11, _hoisted_1);
          }), 128)),
          createElementVNode("button", {
            class: normalizeClass([unref(bem).e("button"), unref(bem).em("button", "nav")]),
            onClick: onCloseRequest
          }, " 关闭 ", 2)
        ], 2),
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("container"))
        }, [
          generalError.value ? (openBlock(), createBlock(SuAlert, {
            key: 0,
            title: generalError.value,
            closable: false,
            type: "danger",
            "show-icon": true,
            effect: "light",
            style: { "margin-bottom": "15px" }
          }, null, 8, ["title"])) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.sections, (section) => {
            return openBlock(), createElementBlock("div", {
              key: section.title
            }, [
              selectedForm.value === section.title ? (openBlock(), createElementBlock("div", _hoisted_2, [
                createElementVNode("h2", {
                  class: normalizeClass(unref(bem).e("title"))
                }, toDisplayString(section.title), 3),
                !section.step && section.fields ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(unref(bem).e("form"))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(section.fields, (field) => {
                    return openBlock(), createElementBlock("div", {
                      key: field.id,
                      class: normalizeClass(unref(bem).e("group"))
                    }, [
                      createElementVNode("label", {
                        for: field.id,
                        class: normalizeClass(unref(bem).e("label"))
                      }, toDisplayString(field.label), 11, _hoisted_3),
                      withDirectives(createElementVNode("input", {
                        type: field.type,
                        id: field.id,
                        "onUpdate:modelValue": ($event) => formData[field.id] = $event,
                        placeholder: field.placeholder,
                        onBlur: ($event) => onFieldBlur(field),
                        class: normalizeClass([unref(bem).e("input"), unref(bem).is("invalid", !!formErrors[field.id])])
                      }, null, 42, _hoisted_4), [
                        [vModelDynamic, formData[field.id]]
                      ]),
                      formErrors[field.id] ? (openBlock(), createElementBlock("p", {
                        key: 0,
                        class: normalizeClass(unref(bem).e("error"))
                      }, toDisplayString(formErrors[field.id]), 3)) : createCommentVNode("", true)
                    ], 2);
                  }), 128)),
                  createElementVNode("div", {
                    class: normalizeClass(unref(bem).e("actions"))
                  }, [
                    createElementVNode("button", {
                      class: normalizeClass([unref(bem).e("button"), unref(bem).em("button", "action"), unref(bem).em("button", "primary")]),
                      onClick: ($event) => onSubmit(section)
                    }, "提交", 10, _hoisted_5)
                  ], 2)
                ], 2)) : createCommentVNode("", true),
                section.step && section.steps ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass(unref(bem).e("form"))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(section.steps, (stepInfo) => {
                    var _a;
                    return openBlock(), createElementBlock("div", {
                      key: stepInfo.step
                    }, [
                      currentStep.value === stepInfo.step ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(unref(bem).e("step"))
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(stepInfo.fields, (field) => {
                          return openBlock(), createElementBlock("div", {
                            key: field.id,
                            class: normalizeClass(unref(bem).e("group"))
                          }, [
                            createElementVNode("label", {
                              for: field.id,
                              class: normalizeClass(unref(bem).e("label"))
                            }, toDisplayString(field.label), 11, _hoisted_6),
                            withDirectives(createElementVNode("input", {
                              type: field.type,
                              id: field.id,
                              "onUpdate:modelValue": ($event) => formData[field.id] = $event,
                              placeholder: field.placeholder,
                              onBlur: ($event) => onFieldBlur(field),
                              class: normalizeClass([unref(bem).e("input"), unref(bem).is("invalid", !!formErrors[field.id])])
                            }, null, 42, _hoisted_7), [
                              [vModelDynamic, formData[field.id]]
                            ]),
                            formErrors[field.id] ? (openBlock(), createElementBlock("p", {
                              key: 0,
                              class: normalizeClass(unref(bem).e("error"))
                            }, toDisplayString(formErrors[field.id]), 3)) : createCommentVNode("", true)
                          ], 2);
                        }), 128)),
                        createElementVNode("div", {
                          class: normalizeClass(unref(bem).e("actions"))
                        }, [
                          createElementVNode("button", {
                            class: normalizeClass([unref(bem).e("button"), unref(bem).em("button", "action"), unref(bem).em("button", "primary")]),
                            onClick: ($event) => onNextStep(stepInfo, section)
                          }, toDisplayString(currentStep.value === ((_a = section.step_model) == null ? void 0 : _a.All_Steps) ? "提交" : "下一步"), 11, _hoisted_8),
                          currentStep.value > 1 ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            class: normalizeClass([unref(bem).e("button"), unref(bem).em("button", "action"), unref(bem).em("button", "secondary")]),
                            onClick: onPreviousStep
                          }, "上一步", 2)) : createCommentVNode("", true)
                        ], 2)
                      ], 2)) : createCommentVNode("", true)
                    ]);
                  }), 128))
                ], 2)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ], 2)
      ], 6);
    };
  }
});
const SuDataform = withInstall(_sfc_main);
export {
  SuDataform as S
};
