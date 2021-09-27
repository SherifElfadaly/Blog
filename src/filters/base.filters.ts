import camelcase from 'camelcase';

export class BaseFilters implements FiltersInterface {
  where: Record<string, unknown> = {};

  constructWhereConditionsArray(conditions: string[]): Record<string, unknown> {
    for (const key in conditions) {
      if (Object.prototype.hasOwnProperty.call(conditions, key)) {
        const value = conditions[key];
        const propertyMethod = camelcase(key, {
          pascalCase: true,
          preserveConsecutiveUppercase: true,
        });
        const method = `set${propertyMethod}Condition`;
        if (typeof this[method] === 'function') {
          this[method](value);
        }
      }
    }

    const result = this.where;
    this.resetWhere();

    return result;
  }

  resetWhere() {
    this.where = {};
  }
}
