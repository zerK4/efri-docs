import { Registry } from "./schema";
import components from "./componentsSchema/sharedForm";
import sfComponents from "./componentsSchema/sharedFormComponents";
import multiStepForm from "./componentsSchema/multiStepForm";

export const ui: Registry[] = [
  ...components,
  ...sfComponents,
  ...multiStepForm,
];
