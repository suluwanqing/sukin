import { c as createNamespace, w as withInstall } from "./utils.js";
import { defineComponent, ref, reactive, watch, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, createElementVNode, Fragment, renderList, toDisplayString, createVNode, createCommentVNode, withDirectives, vModelDynamic } from "vue";
import { S as SuAlert } from "./Alert.js";
const bem = createNamespace("form-panel");
const EVENT_SUBMIT = "submit";
const internalValidators = {
  required: (options) => (value) => {
    const message = options.message || "This field is required.";
    if (value === null || value === void 0 || String(value).trim() === "") return message;
    return true;
  },
  email: (options) => (value) => {
    const message = options.message || "Please enter a valid email address.";
    if (!value) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return message;
    return true;
  },
  minLength: (options) => (value) => {
    const message = options.message || `Must be at least ${options.length} characters long.`;
    if (value && value.length < options.length) return message;
    return true;
  }
};
const validateFields = (fields, state) => {
  let isFormValid = true;
  state.generalError.value = null;
  fields.forEach((field) => {
    state.formErrors[field.id] = null;
  });
  for (const field of fields) {
    if (field.rules) {
      for (const rule of field.rules) {
        let ruleName, ruleOptions = {};
        if (typeof rule === "string") {
          ruleName = rule;
        } else {
          ruleName = rule.name;
          ruleOptions = rule;
        }
        const validatorFactory = internalValidators[ruleName];
        if (validatorFactory) {
          const validator = validatorFactory(ruleOptions);
          const result = validator(state.formData[field.id]);
          if (result !== true) {
            state.formErrors[field.id] = result;
            isFormValid = false;
          }
        }
      }
    }
  }
  if (!isFormValid) {
    state.generalError.value = "Please correct the errors before proceeding.";
  }
  return isFormValid;
};
const initializeState = (props, state) => {
  const allFields = /* @__PURE__ */ new Set();
  props.sections.forEach((section) => {
    (section.fields || []).forEach((field) => allFields.add(field.id));
    (section.steps || []).forEach((step) => step.fields.forEach((field) => allFields.add(field.id)));
  });
  Object.keys(state.formData).forEach((key) => delete state.formData[key]);
  allFields.forEach((id) => {
    state.formData[id] = "";
  });
  state.currentStep.value = 1;
  state.formErrors = {};
  state.generalError.value = null;
};
const handleCloseRequest = (emit) => {
  emit("close");
};
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
    const canProceed = await stepInfo.func(state.formData);
    if (!canProceed) return;
  }
  const isLastStep = state.currentStep.value === section.step_model.All_Steps;
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
const _hoisted_4 = ["type", "id", "onUpdate:modelValue", "placeholder"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["for"];
const _hoisted_7 = ["type", "id", "onUpdate:modelValue", "placeholder"];
const _hoisted_8 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const props = __props;
    const emit = __emit;
    const state = { selectedForm: ref(""), currentStep: ref(1), formData: reactive({}), formErrors: reactive({}), generalError: ref(null) };
    const alertRef = ref(null);
    const onCloseRequest = () => handleCloseRequest(emit);
    const onSwitchForm = (title) => handleSwitchForm(title, props, state);
    const onSubmit = (section) => handleSubmit(section, state, emit);
    const onNextStep = (stepInfo, section) => handleNextStep(stepInfo, section, state, emit);
    const onPreviousStep = () => handlePreviousStep(state);
    const onAlertClose = () => {
      state.generalError.value = null;
    };
    watch(state.generalError, (newError) => {
      var _a, _b;
      if (newError) {
        (_a = alertRef.value) == null ? void 0 : _a.open();
      } else {
        (_b = alertRef.value) == null ? void 0 : _b.close();
      }
    });
    const resetForm = () => {
      initializeState(props, state);
    };
    __expose({ resetForm });
    watch(() => props.sections, () => {
      var _a;
      state.selectedForm.value = props.initialForm || ((_a = props.sections[0]) == null ? void 0 : _a.title) || "";
      initializeState(props, state);
    }, { deep: true, immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(bem).b(), unref(bem).m(props.direction), unref(bem).m(props.size)]),
        style: normalizeStyle({ "--su-form-panel-bg-image": `url(${props.backgroundImage})` })
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("selector"))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.sections, (section) => {
            return openBlock(), createElementBlock("button", {
              key: section.title,
              class: normalizeClass([unref(bem).e("button"), unref(bem).em("button", "nav"), unref(bem).is("active", state.selectedForm.value === section.title)]),
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
          createVNode(SuAlert, {
            ref_key: "alertRef",
            ref: alertRef,
            title: state.generalError.value || "An error occurred",
            type: "danger",
            "show-icon": true,
            effect: "light",
            onClose: onAlertClose,
            style: { "margin-bottom": "15px" }
          }, null, 8, ["title"]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.sections, (section) => {
            return openBlock(), createElementBlock("div", {
              key: section.title
            }, [
              state.selectedForm.value === section.title ? (openBlock(), createElementBlock("div", _hoisted_2, [
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
                        "onUpdate:modelValue": ($event) => state.formData[field.id] = $event,
                        placeholder: field.placeholder,
                        class: normalizeClass([unref(bem).e("input"), unref(bem).is("invalid", !!state.formErrors[field.id])])
                      }, null, 10, _hoisted_4), [
                        [vModelDynamic, state.formData[field.id]]
                      ]),
                      state.formErrors[field.id] ? (openBlock(), createElementBlock("p", {
                        key: 0,
                        class: normalizeClass(unref(bem).e("error"))
                      }, toDisplayString(state.formErrors[field.id]), 3)) : createCommentVNode("", true)
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
                    return openBlock(), createElementBlock("div", {
                      key: stepInfo.step
                    }, [
                      state.currentStep.value === stepInfo.step ? (openBlock(), createElementBlock("div", {
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
                              "onUpdate:modelValue": ($event) => state.formData[field.id] = $event,
                              placeholder: field.placeholder,
                              class: normalizeClass([unref(bem).e("input"), unref(bem).is("invalid", !!state.formErrors[field.id])])
                            }, null, 10, _hoisted_7), [
                              [vModelDynamic, state.formData[field.id]]
                            ]),
                            state.formErrors[field.id] ? (openBlock(), createElementBlock("p", {
                              key: 0,
                              class: normalizeClass(unref(bem).e("error"))
                            }, toDisplayString(state.formErrors[field.id]), 3)) : createCommentVNode("", true)
                          ], 2);
                        }), 128)),
                        createElementVNode("div", {
                          class: normalizeClass(unref(bem).e("actions"))
                        }, [
                          createElementVNode("button", {
                            class: normalizeClass([unref(bem).e("button"), unref(bem).em("button", "action"), unref(bem).em("button", "primary")]),
                            onClick: ($event) => onNextStep(stepInfo, section)
                          }, toDisplayString(state.currentStep.value === section.step_model.All_Steps ? "提交" : "下一步"), 11, _hoisted_8),
                          state.currentStep.value > 1 ? (openBlock(), createElementBlock("button", {
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
