import { Registry } from "../schema";

export default [
  {
    name: "multiStepForm",
    type: "registry:component",
    registryDependencies: [
      "button",
      "tooltip",
      "dialog",
      "sonner",
      "separator",
    ],
    dependencies: ["react-hook-form", "framer-motion", "react", "animejs"],
    files: [
      "components/forms/multiStepForm.tsx",
      "components/ui/cmdCtrlButton.tsx",
    ],
  },
  {
    name: "cmdCtrlButton",
    type: "registry:ui",
    registryDependencies: ["tooltip"],
    dependencies: ["react"],
    files: ["components/ui/cmdCtrlButton.tsx"],
  },
] satisfies Registry[];
