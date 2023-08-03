export const TypeEntity = {
  FunctionalComponent: 'fc',
  ClassComponent: 'cc',
};

export function getPossibleTypeEntities() {
  return Object.values(TypeEntity);
}

export function getDefaultTypeEntity() {
  return TypeEntity.FunctionalComponent;
}
