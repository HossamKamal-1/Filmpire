function clearSearchParams(searchQueryParams) {
  [...searchQueryParams.keys()].forEach((key) => {
    searchQueryParams.delete(key);
  });
}

export { clearSearchParams };
