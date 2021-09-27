import camelcase from 'camelcase';

export class BaseSorting implements SortingInterface {
  sort: Record<string, unknown> = {};

  constructSortArray(
    sortBy: string,
    sortDirection = 'ASC',
  ): Record<string, unknown> {
    if (sortBy) {
      const propertyMethod = camelcase(sortBy, {
        pascalCase: true,
        preserveConsecutiveUppercase: true,
      });
      const method = `set${propertyMethod}Sorting`;
      if (typeof this[method] === 'function') {
        this[method](sortBy, sortDirection);
      }
    }

    const result = this.sort;
    this.resetSort();

    return result;
  }

  resetSort() {
    this.sort = {};
  }
}
