import { Registry } from "../schema";

export default [
  {
    name: "booleanField",
    type: "registry:component",
    registryDependencies: ["checkbox"],
    dependencies: ["react-hook-form", "react"],
    files: ["components/forms/sharedForm/components/booleanField.tsx"],
  },
  {
    name: "textField",
    type: "registry:component",
    registryDependencies: ["input"],
    dependencies: ["react-hook-form", "react"],
    files: ["components/forms/sharedForm/components/textField.tsx"],
  },
  {
    name: "dateField",
    type: "registry:component",
    registryDependencies: ["calendar"],
    dependencies: ["react-hook-form", "react"],
    files: [
      "components/forms/sharedForm/components/dateField.tsx",
      "components/dateTimePicker.tsx",
    ],
  },
  {
    name: "imageField",
    type: "registry:component",
    registryDependencies: ["input"],
    dependencies: ["react-hook-form", "react"],
    files: ["components/forms/sharedForm/components/imageField.tsx"],
  },
  {
    name: "numberField",
    type: "registry:component",
    registryDependencies: ["input"],
    dependencies: ["react-hook-form", "react"],
    files: ["components/forms/sharedForm/components/numberField.tsx"],
  },
  {
    name: "selectField",
    type: "registry:component",
    registryDependencies: ["select"],
    dependencies: ["react-hook-form", "react"],
    files: ["components/forms/sharedForm/components/selectField.tsx"],
  },
  {
    name: "textareaField",
    type: "registry:component",
    registryDependencies: ["textarea"],
    dependencies: ["react-hook-form", "react"],
    files: ["components/forms/sharedForm/components/textareaField.tsx"],
  },
] satisfies Registry[];
