import chalk from 'chalk';
import { getPossibleEntitiesValues, isAvailableEntityValue } from './entities';
import { Logger } from './logger';
import { TemplateBuilderFactory } from './template-builder-factory';
import { TemplatesFileManager } from './templates-file-manager';

export * from './entities';

export function createEntity(
  entityName: string,
  entityType: string,
  entityTargetPath: string,
): void {
  if (!isAvailableEntityValue(entityType)) {
    const possibleEntityTypes = getPossibleEntitiesValues()
      .map((it) => chalk.green(it))
      .join(' | ');

    const errorInfo = `Possible types (${possibleEntityTypes}) do not include ${chalk.yellow(entityType)} type!`;

    Logger.logError(errorInfo);
    return;
  }

  const templatesBuilder = TemplateBuilderFactory.create(
    entityName,
    entityType,
  );

  const templates = templatesBuilder.createTemplates();

  TemplatesFileManager.create(entityTargetPath, templates)
    .then(() => {
      const successInfo = `${templatesBuilder.getFullName()} ${chalk.yellow(entityName)} is successfully created!`;
      Logger.logSuccess(successInfo);
    })
    .catch((err) => {
      Logger.logError(`${err.message}`);
    });
}
