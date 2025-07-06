import { describe, test, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import type { ButtonType, ButtonSize } from "./types";

import SuIcon from "../Icon/Icon.vue";
import SuButton from "./Button.vue";
import SuButtonGroup from "./ButtonGroup.vue";

describe("Button.vue", () => {
  const onClick = vi.fn();

  test("basic button", async () => {
    const wrapper = mount(SuButton, {
      props: { type: "primary", onClick },
      slots: { default: "button content" },
    });

    expect(wrapper.classes()).toContain("su-button");
    expect(wrapper.classes()).toContain("su-button--primary");
    expect(wrapper.get("button").text()).toBe("button content");
    await wrapper.get("button").trigger("click");
    expect(onClick).toHaveBeenCalledOnce();
  });

  test("disabled button", async () => {
    const wrapper = mount(SuButton, {
      props: { disabled: true, onClick },
      slots: { default: "disabled button" },
    });

    expect(wrapper.classes()).toContain("is-disabled");
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.find("button").element.disabled).toBeTruthy();
    await wrapper.get("button").trigger("click");
    expect(onClick).toHaveBeenCalledOnce();
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  test("loading button", () => {
    const wrapper = mount(SuButton, {
      props: { loading: true },
      slots: { default: "loading button" },
      global: { stubs: { SuIcon: true } },
    });

    expect(wrapper.classes()).toContain("is-loading");
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.find("button").element.disabled).toBeTruthy();

    wrapper.get("button").trigger("click");
    expect(wrapper.emitted()).not.toHaveProperty("click");

    const iconElement = wrapper.findComponent(SuIcon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("spinner");
  });

  test("icon button", () => {
    const wrapper = mount(SuButton, {
      props: { icon: "arrow-up" },
      slots: { default: "icon button" },
      global: { stubs: { SuIcon: true } },
    });

    const iconElement = wrapper.findComponent(SuIcon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("arrow-up");
  });

  // Type 测试
  it("should has correct type class", () => {
    const types: ButtonType[] = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(SuButton, { props: { type } });
      expect(wrapper.classes()).toContain(`su-button--${type}`);
    });
  });

  // Size 测试
  it("should has correct size class", () => {
    const sizes: ButtonSize[] = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(SuButton, { props: { size } });
      expect(wrapper.classes()).toContain(`su-button--${size}`);
    });
  });

  // 状态类测试 - 根据组件实际实现调整
  it.each([
    ["plain", "su-button--plain"],  // 组件中使用 bem.m('plain')
    ["round", "su-button--round"],  // 组件中使用 bem.m('round')
    ["circle", "su-button--circle"], // 组件中使用 bem.m('circle')
    ["loading", "is-loading"],      // 组件中使用 bem.is('loading')
    ["disabled", "is-disabled"]     // 组件中使用 bem.is('disabled')
  ])("should has correct class when %s is true", (prop, className) => {
    const wrapper = mount(SuButton, {
      props: { [prop]: true },
      global: { stubs: { SuIcon: prop === 'loading' } },
    });
    expect(wrapper.classes()).toContain(className);
  });

  it("should has correct native type attribute", () => {
    const wrapper = mount(SuButton, { props: { nativeType: "submit" } });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as HTMLButtonElement).type).toBe("submit");
  });

  it.each([
    ["withoutThrottle", false],
    ["withThrottle", true]
  ])("emits click event %s", async (_, useThrottle) => {
    const clickSpy = vi.fn();
    const wrapper = mount(SuButton, {
      props: { onClick: clickSpy, useThrottle, throttleDuration: 400 }
    });
    await wrapper.get("button").trigger("click");
    expect(clickSpy).toHaveBeenCalled();
  });

  it("should render custom tag", () => {
    const wrapper = mount(SuButton, { props: { tag: "a" } });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  it("should emit click event", async () => {
    const wrapper = mount(SuButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it("should handle loading state", async () => {
    const wrapper = mount(SuButton, {
      props: { loading: true },
      global: { stubs: { SuIcon: true } },
    });

    expect(wrapper.find(".is-loading").exists()).toBe(true);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });
});

describe("ButtonGroup.vue", () => {
  test("basic button group", () => {
    const wrapper = mount(SuButtonGroup, {
      slots: { default: '<SuButton>1</SuButton><SuButton>2</SuButton>' },
      global: { components: { SuButton } }
    });
    expect(wrapper.classes()).toContain("su-button-group");
  });

  test("button group size", () => {
    const sizes: ButtonSize[] = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(SuButtonGroup, {
        props: { size },
        slots: { default: '<SuButton>1</SuButton><SuButton>2</SuButton>' },
        global: { components: { SuButton } }
      });
      expect(wrapper.findComponent(SuButton).classes()).toContain(`su-button--${size}`);
    });
  });

  test("button group type", () => {
    const types: ButtonType[] = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(SuButtonGroup, {
        props: { type },
        slots: { default: '<SuButton>1</SuButton><SuButton>2</SuButton>' },
        global: { components: { SuButton } }
      });
      expect(wrapper.findComponent(SuButton).classes()).toContain(`su-button--${type}`);
    });
  });

  test("button group disabled", () => {
    const wrapper = mount(SuButtonGroup, {
      props: { disabled: true },
      slots: { default: '<SuButton>1</SuButton><SuButton>2</SuButton>' },
      global: { components: { SuButton } }
    });
    expect(wrapper.findComponent(SuButton).classes()).toContain("is-disabled");
  });
});