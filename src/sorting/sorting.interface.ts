interface SortingInterface {
  sort: Record<string, unknown>;
  constructSortArray(
    sortBy: string,
    sortDirection: string,
  ): Record<string, unknown>;
  resetSort();
}
