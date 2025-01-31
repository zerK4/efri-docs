import { registryComponents } from "../registry";
import { promises as fs } from "fs";
import { z } from "zod";
import { registryItemFileSchema } from "@/registry/schema";
import path from "path";

const REGISTRY_BASE_PATH = "registry";
const PUBLIC_FOLDER_BASE_PATH = "public/r";
const COMPONENT_FOLDER_PATH = "components";
const LIB_FOLDER_PATH = "lib";

type File = z.infer<typeof registryItemFileSchema>;

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath);

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, data, "utf-8");
    console.log(`File written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file`);
    console.error(error);
  }
}

const getComponentFiles = async (
  componentName: string,
  componentType: string,
  files: File[]
) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    if (typeof file === "string") {
      const filePath = `${REGISTRY_BASE_PATH}/${file}`;

      const pathHasComponentFolder = filePath.includes(COMPONENT_FOLDER_PATH);
      const hasLibFolder = filePath.includes(LIB_FOLDER_PATH);

      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const content = fileContent.replaceAll("registry/", "");
        console.log(filePath, pathHasComponentFolder, "the path");
        // Create a component object using the passed component type
        const componentObject = {
          type: componentType,
          content: content,
          path: file,
          target: `${
            !pathHasComponentFolder && !hasLibFolder
              ? COMPONENT_FOLDER_PATH + "/"
              : ""
          }${file}`,
        };

        return componentObject;
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
      }
    }
    return null;
  });

  const filesArray = (await Promise.all(filesArrayPromises)).filter(
    (file): file is NonNullable<typeof file> => file !== null
  );

  return filesArray;
};

const main = async () => {
  try {
    for (const component of registryComponents) {
      const files = component.files;
      if (!files) {
        console.warn(`No files found for component: ${component.name}`);
        continue;
      }

      const filesArray = await getComponentFiles(
        component.name,
        component.type,
        files
      );

      // Create the registry item with all necessary fields
      const registryItem = {
        ...component,
        files: filesArray,
      };

      const json = JSON.stringify(registryItem, null, 2);
      const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;

      await writeFileRecursive(jsonPath, json);
      console.log(`Generated registry item for: ${component.name}`);
    }
  } catch (error) {
    console.error("Error in main execution:", error);
    throw error;
  }
};

main()
  .then(() => {
    console.log("Registry generation completed successfully");
  })
  .catch((err) => {
    console.error("Failed to generate registry:", err);
    process.exit(1);
  });
