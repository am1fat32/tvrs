import fs from 'fs';
import path from 'path';

export class TemplatesFileManager {
  static create(templatesTargetPath, templates) {
    try {
      TemplatesFileManager._createDirectory(templatesTargetPath);
    } catch {
      return Promise.reject(new Error('Can not create the directory'));
    }

    try {
      templates.forEach((it) => {
        TemplatesFileManager._createFile(templatesTargetPath, `${it.fileName}${it.fileExtension}`, it.template);
      });

      return Promise.resolve();
    } catch {
      return Promise.reject(new Error('Something went wrong during templates creation'));
    }
  }

  static _createDirectory(targetPath) {
    fs.mkdirSync(targetPath);
  }

  static _createFile(filePath, fileName, template) {
    const combinedPath = path.resolve(filePath, fileName);

    fs.writeFileSync(combinedPath, template);
  }
}
