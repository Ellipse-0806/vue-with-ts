import { mount } from "@vue/test-utils";
import welcomeVue from "@/example/welcome.vue";

describe('welcome.vue', () => {
    it("renders the correct message", () => {
        const wrapper = mount(welcomeVue);
        expect(wrapper.text()).toBe('Hello Vue!!');
    });
});
