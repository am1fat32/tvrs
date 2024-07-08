export const TypeEntity = {
  FunctionalComponent: {
    value: 'fc',
    description: 'functional component',
  },
  ClassComponent: {
    value: 'cc',
    description: 'class component',
  },
};

export function getPossibleEntities() {
  return Object.values(TypeEntity);
}

export function getPossibleEntitiesValues() {
  return Object.values(TypeEntity).map((entity) => entity.value);
}
