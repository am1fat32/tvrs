import fs from "fs";
import path from "path";
import { Template } from "./templates-builders/types";

export class TemplatesFileManager {
  static create(templatesTargetPath: string, templates: Template[]) {
    try {
      TemplatesFileManager._createDirectory(templatesTargetPath);
    } catch {
      return Promise.reject(new Error("Can not create the directory!"));
    }

    try {
      templates.forEach((it) => {
        TemplatesFileManager._createFile(
          templatesTargetPath,
          `${it.fileName}${it.fileExtension}`,
          it.template,
        );
      });

      return Promise.resolve();
    } catch {
      return Promise.reject(
        new Error("Something went wrong during templates creation!"),
      );
    }
  }

  static _createDirectory(targetPath: string): void {
    fs.mkdirSync(targetPath);
  }

  static _createFile(
    filePath: string,
    fileName: string,
    template: string,
  ): void {
    const combinedPath = path.resolve(filePath, fileName);

    fs.writeFileSync(combinedPath, template);
  }
}
