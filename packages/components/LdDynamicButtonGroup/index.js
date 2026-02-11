import LdDynamicButtonGroup from "./LdDynamicButtonGroup.vue";

LdDynamicButtonGroup.install = (app) => {
  app.component(LdDynamicButtonGroup.name, LdDynamicButtonGroup);
};

export { LdDynamicButtonGroup };
