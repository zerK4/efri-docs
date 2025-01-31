import { Registry } from "../schema";

export default [
  {
    name: "sharedForm",
    type: "registry:component",
    registryDependencies: ["button", "form", "separator"],
    dependencies: ["react-hook-form", "react", "zod"],
    files: [
      "components/forms/sharedForm/form.tsx",
      "components/forms/sharedForm/components/imageField.tsx",
      "components/forms/sharedForm/components/selectField.tsx",
      "components/forms/sharedForm/components/dateField.tsx",
      "components/forms/sharedForm/components/textField.tsx",
      "components/forms/sharedForm/components/textareaField.tsx",
      "components/forms/sharedForm/components/numberField.tsx",
      "components/forms/sharedForm/components/booleanField.tsx",
      "components/dateTimePicker.tsx",
      "lib/schemaConfigs.ts",
      "lib/sharedFormUtils.ts",
    ],
  },
  {
    name: "sharedFormEmpty",
    type: "registry:component",
    registryDependencies: ["button", "form", "separator"],
    dependencies: ["react-hook-form", "react", "zod"],
    files: [
      "components/forms/sharedForm/form.tsx",
      "lib/schemaConfigs.ts",
      "lib/sharedFormUtils.ts",
    ],
  },
] satisfies Registry[];
