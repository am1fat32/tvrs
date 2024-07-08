#!/usr/bin/env node

import path from "path";
import { Argument, program } from "commander";
import {
  createEntity,
  getPossibleEntitiesValues,
  getPossibleEntities,
  entities,
} from "../lib/index.js";

program
  .version("3.1.2", "-v, --version")
  .usage("<entity-name> [type]")
  .description(getDescription())
  .argument("<entity-name>", "any entity name in kebab case")
  .addArgument(
    new Argument("[type]", "entity type")
      .default(entities.functionalComponent.value)
      .choices(getPossibleEntitiesValues()),
  )
  .action((entityName, type) => {
    const workingDirectory = process.cwd();
    const targetPath = path.resolve(workingDirectory, entityName);

    createEntity(entityName, type, targetPath);
  })
  .parse();

function getDescription() {
  return `Creates an entity in cwd.\nPossible entities: ${getPossibleEntities().map(getDescriptionRow).join("")}`;
}

function getDescriptionRow(entity) {
  return `\n  ${entity.value} (${entity.description})`;
}
