interface Entity {
  value: string;
  description: string;
}

export const entities = {
  functionalComponent: {
    value: 'fc',
    description: 'functional component',
  },
  classComponent: {
    value: 'cc',
    description: 'class component',
  },
} as const satisfies Record<string, Entity>;

export type AvailableEntity = (typeof entities)[keyof typeof entities];
export type AvailableEntityValue = AvailableEntity['value'];

export function getPossibleEntities(): AvailableEntity[] {
  return Object.values(entities);
}

export function getPossibleEntitiesValues(): AvailableEntityValue[] {
  return getPossibleEntities().map((entity) => entity.value);
}

export function isAvailableEntityValue(
  value: string,
): value is AvailableEntityValue {
  return getPossibleEntitiesValues().includes(value as AvailableEntityValue);
}
