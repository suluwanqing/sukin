import { defineComponent, useModel, ref, computed, onMounted, onBeforeUnmount, watch, createElementBlock, openBlock, normalizeStyle, normalizeClass, createElementVNode, createCommentVNode, unref, Fragment, renderList, renderSlot, toDisplayString } from "vue";
import { c as createNamespace, _ as _export_sfc, w as withInstall } from "./utils.js";
const CLICK_EVENT = "click";
const HOVER_EVENT = "hover";
const handleCardClick = (event, item, index, emit) => {
  emit(CLICK_EVENT, event, item, index);
};
const handleCardHover = (event, item, index, emit) => {
  emit(HOVER_EVENT, event, item, index);
};
const _hoisted_1 = ["onClick", "onMouseenter", "onMouseleave"];
const _hoisted_2 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "SuIcard" },
  __name: "Icard",
  props: {
    items: {},
    mode: { default: "stack" },
    activeIndex: { default: 0 },
    size: { default: "medium" },
    cardWidth: { default: void 0 },
    cardHeight: { default: void 0 },
    stackOffset: { default: 80 },
    stackRotate: { default: 6 },
    stackExtractedOffset: { default: 40 },
    stackExtraction: { default: "toggle" },
    peekOffset: { default: 60 },
    peekScale: { default: 0.85 },
    loop: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: false },
    autoplayInterval: { default: 3e3 },
    pauseOnHover: { type: Boolean, default: true },
    showNavigationButtons: { type: Boolean, default: false },
    showIndicators: { type: Boolean, default: false },
    showCarouselGoToFirst: { type: Boolean, default: true }
  },
  emits: ["update:activeIndex", "click", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const bem = createNamespace("card-stack");
    const CARD_SIZES_MAP = {
      small: { width: 180, height: 240 },
      medium: { width: 240, height: 320 },
      large: { width: 300, height: 400 }
    };
    const props = __props;
    const emit = __emit;
    const activeIndex = useModel(props, "activeIndex");
    const isStackActiveCardExtracted = ref(true);
    const hoveredCardLocalIndex = ref(null);
    const totalItems = computed(() => props.items.length);
    const resolvedCardWidth = computed(() => {
      if (props.cardWidth !== void 0) {
        return props.cardWidth;
      }
      return CARD_SIZES_MAP[props.size || "medium"].width;
    });
    const resolvedCardHeight = computed(() => {
      if (props.cardHeight !== void 0) {
        return props.cardHeight;
      }
      return CARD_SIZES_MAP[props.size || "medium"].height;
    });
    const getNumericResolvedCardWidth = computed(() => {
      const width = resolvedCardWidth.value;
      if (typeof width === "string") {
        const num = parseFloat(width);
        return isNaN(num) ? 0 : num;
      }
      return width;
    });
    const containerClasses = computed(() => [
      bem.b(),
      bem.m(props.mode),
      { [bem.m(`stack-extraction-${props.stackExtraction}`)]: props.mode === "stack" }
    ]);
    const containerStyles = computed(() => ({
      "--su-card-width": typeof resolvedCardWidth.value === "number" ? `${resolvedCardWidth.value}px` : resolvedCardWidth.value,
      "--su-card-height": typeof resolvedCardHeight.value === "number" ? `${resolvedCardHeight.value}px` : resolvedCardHeight.value,
      "--su-card-stack-offset": `${props.stackOffset}px`,
      "--su-card-stack-rotate": `${props.stackRotate}deg`,
      "--su-stack-extracted-offset": `${props.stackExtractedOffset}px`,
      "--su-peek-offset": `${props.peekOffset}%`,
      "--su-peek-scale": props.peekScale
    }));
    const trackStyle = computed(() => {
      if (props.mode !== "carousel" || !totalItems.value) return {};
      const cardWithGap = getNumericResolvedCardWidth.value + 20;
      const offsetToActiveCardLeft = activeIndex.value * cardWithGap;
      const carouselOffset = -(offsetToActiveCardLeft - getNumericResolvedCardWidth.value / 2);
      return {
        "--carousel-offset": `${carouselOffset}px`
      };
    });
    const getItemStyle = (index) => {
      switch (props.mode) {
        case "peek":
          const diff = index - activeIndex.value;
          const zIndex = 10 - Math.abs(diff);
          let transform = "";
          let opacity = 1;
          if (diff === 0) {
            transform = "translateX(0) scale(1)";
            opacity = 1;
          } else {
            const sign = Math.sign(diff);
            transform = `translateX(calc(${sign} * var(--su-peek-offset))) scale(var(--su-peek-scale))`;
            opacity = 0.6;
          }
          return { transform, zIndex, opacity };
        case "stack":
          let iValue;
          if (totalItems.value % 2 === 0) {
            const virtualCenter = totalItems.value / 2 - 0.5;
            iValue = index - virtualCenter;
          } else {
            const centerIndex = Math.floor(totalItems.value / 2);
            iValue = index - centerIndex;
          }
          let transformStack = `translateX(-50%)`;
          transformStack += ` translateX(calc(${iValue} * var(--su-card-stack-offset)))`;
          transformStack += ` rotate(calc(${iValue} * var(--su-card-stack-rotate)))`;
          let zIndexStack = "1";
          if (index === activeIndex.value) {
            zIndexStack = "200";
            if (props.stackExtraction === "toggle" && isStackActiveCardExtracted.value) {
              transformStack += ` translateY(calc(-1 * var(--su-stack-extracted-offset)))`;
            }
          }
          if (props.mode === "stack" && props.stackExtraction === "hover" && index === hoveredCardLocalIndex.value) {
            transformStack += ` translateY(calc(-1 * var(--su-stack-extracted-offset)))`;
            zIndexStack = "300";
          }
          return { transform: transformStack, zIndex: zIndexStack, left: "50%", top: "0" };
        default:
          return {};
      }
    };
    let autoplayTimer = null;
    let isPaused = ref(false);
    const startAutoplay = () => {
      if (props.autoplay && !isPaused.value && totalItems.value > 1) {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
          setActive(activeIndex.value + 1);
        }, props.autoplayInterval);
      }
    };
    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };
    const resetAutoplay = () => {
      stopAutoplay();
      if (props.autoplay && !isPaused.value) {
        startAutoplay();
      }
    };
    const handleMouseEnter = () => {
      if (props.pauseOnHover && props.autoplay) {
        isPaused.value = true;
        stopAutoplay();
      }
    };
    const handleMouseLeave = () => {
      if (props.pauseOnHover && props.autoplay) {
        isPaused.value = false;
        startAutoplay();
      }
      if (props.mode === "stack") {
        hoveredCardLocalIndex.value = null;
      }
    };
    const handleCardItemMouseEnter = (index, item, event) => {
      if (props.mode === "stack") {
        hoveredCardLocalIndex.value = index;
      }
      handleCardHover(event, item, index, emit);
    };
    const handleCardItemMouseLeave = (index, item, event) => {
      if (props.mode === "stack" && hoveredCardLocalIndex.value === index) {
        hoveredCardLocalIndex.value = null;
      }
    };
    onMounted(() => {
      resetAutoplay();
    });
    onBeforeUnmount(() => {
      stopAutoplay();
    });
    const onCardClick = (item, index, event) => {
      if (props.mode === "stack" && index === activeIndex.value && props.stackExtraction === "toggle") {
        isStackActiveCardExtracted.value = !isStackActiveCardExtracted.value;
      } else if (index !== activeIndex.value && props.mode === "stack" && props.stackExtraction === "toggle") {
        isStackActiveCardExtracted.value = true;
      }
      setActive(index);
      resetAutoplay();
      handleCardClick(event, item, index, emit);
    };
    const setActive = (index) => {
      if (!totalItems.value) return;
      let newIndex = index;
      if (props.loop) {
        newIndex = (index % totalItems.value + totalItems.value) % totalItems.value;
      } else {
        newIndex = Math.max(0, Math.min(index, totalItems.value - 1));
      }
      if (newIndex !== activeIndex.value) {
        activeIndex.value = newIndex;
      }
    };
    watch(activeIndex, (newVal, oldVal) => {
      if (props.mode === "stack" && props.stackExtraction === "toggle" && newVal !== oldVal) {
        isStackActiveCardExtracted.value = true;
      }
      resetAutoplay();
    });
    watch(totalItems, (newVal) => {
      if (activeIndex.value >= newVal) {
        activeIndex.value = 0;
      }
      resetAutoplay();
    });
    watch(() => [props.autoplay, props.autoplayInterval, props.loop, props.mode, props.pauseOnHover, props.stackExtraction], resetAutoplay, { deep: true });
    const next = () => setActive(activeIndex.value + 1);
    const prev = () => setActive(activeIndex.value - 1);
    __expose({ setActive, next, prev });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClasses.value),
        style: normalizeStyle(containerStyles.value),
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(bem).e("track")),
          style: normalizeStyle(trackStyle.value)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: item.id || index,
              class: normalizeClass([unref(bem).e("item"), { [unref(bem).is("active", index === unref(activeIndex))]: true }]),
              style: normalizeStyle(getItemStyle(index)),
              onClick: ($event) => onCardClick(item, index, $event),
              onMouseenter: ($event) => handleCardItemMouseEnter(index, item, $event),
              onMouseleave: ($event) => handleCardItemMouseLeave(index)
            }, [
              renderSlot(_ctx.$slots, "default", {
                item,
                index,
                isActive: index === unref(activeIndex)
              }, () => [
                createElementVNode("span", null, toDisplayString(index + 1), 1)
              ], true)
            ], 46, _hoisted_1);
          }), 128))
        ], 6),
        props.mode === "carousel" && props.showCarouselGoToFirst && totalItems.value > 1 && unref(activeIndex) === totalItems.value - 1 && !props.loop ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: normalizeClass(unref(bem).e("go-to-first")),
          onClick: _cache[0] || (_cache[0] = ($event) => setActive(0)),
          "aria-label": "Go to first card"
        }, " 返回 ", 2)) : createCommentVNode("", true),
        props.mode === "peek" && props.showIndicators && totalItems.value > 1 ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(bem).e("indicators"))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (_, index) => {
            return openBlock(), createElementBlock("button", {
              key: `ind-${index}`,
              class: normalizeClass([unref(bem).e("indicator"), { [unref(bem).is("active", index === unref(activeIndex))]: true }]),
              onClick: ($event) => setActive(index),
              "aria-label": "Go to card"
            }, null, 10, _hoisted_2);
          }), 128))
        ], 2)) : createCommentVNode("", true)
      ], 38);
    };
  }
});
const Icard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-641d6204"]]);
const SuIcard = withInstall(Icard);
export {
  SuIcard as S
};
