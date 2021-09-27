interface FiltersInterface {
  where: Record<string, unknown>;
  constructWhereConditionsArray(conditions: string[]): Record<string, unknown>;
  resetWhere();
}
