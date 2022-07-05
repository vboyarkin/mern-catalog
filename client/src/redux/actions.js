import { getQueryForArray, wrapInTimeout } from "../assets/utils";
import {
  HIDE_FILTERS_LOADER,
  HIDE_PRODUCTS_LOADER,
  SHOW_FILTERS_LOADER,
  SHOW_PRODUCTS_LOADER,
  UPDATE_FILTERS,
  APPLY_FILTERS,
  RESET_FILTERS,
  UPDATE_PRODUCTS,
  ADD_PRODUCTS_PAGE,
  UPDATE_CAN_LOAD_MORE_PRODUCTS,
} from "./types";

export const loadNextPage = () => {
  return async (dispatch, getState) => {
    if (getState().catalog.canLoadMoreProducts)
      dispatch(fetchProducts(getState().catalog.pagesLoaded + 1));
  };
};
export const fetchProducts = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      if (page === 1) dispatch(updateProducts([]));
      dispatch(showProductsLoader());

      const { appliedFilters, filters } = getState().catalog;
      const categories = filters.category.filter(
        (option, i) => appliedFilters.checkedCategories[i]
      );

      const query = {
        category: categories.map((x) => x.option),
        discount: appliedFilters.discount || "",
        minPrice: appliedFilters.price.min || "",
        maxPrice: appliedFilters.price.max || "",
        page: page < 1 ? 1 : page,
        limit: appliedFilters.limit < 5 ? 5 : appliedFilters.limit,
      };

      let params = [
        getQueryForArray(query.category, "category"),
        "minPrice=" + query.minPrice,
        "maxPrice=" + query.maxPrice,
        "discount=" + query.discount,
        "page=" + query.page,
        "limit=" + query.limit,
      ]
        .filter((x) => x)
        .join("&");

      const res = await fetch(
        process.env.REACT_APP_API_URL + "products?" + params
      );
      const json = await res.json();

      if (json.length === 0) dispatch(updateCanLoadMoreProducts(false));
      else dispatch(updateCanLoadMoreProducts(true));

      wrapInTimeout(() => {
        dispatch(addProductsPage(json, page));
        dispatch(hideProductsLoader());
      });
    } catch (err) {
      console.error("Failed to fetch products from API:");
      console.error(err);
    }
  };
};
export const fetchFilters = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(showFiltersLoader());

      const res = await fetch(process.env.REACT_APP_API_URL + "filters");
      const json = await res.json();

      wrapInTimeout(() => {
        dispatch(updateFilters(json));
        dispatch(resetFilters());
        dispatch(hideFiltersLoader());
      });
    } catch (err) {
      console.error("Failed to fetch filters from API:");
      console.error(err);
    }
  };
};

export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  payload: filters,
});
export const updateProducts = (products) => ({
  type: UPDATE_PRODUCTS,
  payload: products,
});
export const addProductsPage = (products, pagesLoaded) => ({
  type: ADD_PRODUCTS_PAGE,
  payload: { products, pagesLoaded },
});
export const applyFilters = (filters) => ({
  type: APPLY_FILTERS,
  payload: filters,
});
export const resetFilters = () => ({
  type: RESET_FILTERS,
});

export const showFiltersLoader = () => ({
  type: SHOW_FILTERS_LOADER,
});
export const hideFiltersLoader = () => ({
  type: HIDE_FILTERS_LOADER,
});
export const showProductsLoader = () => ({
  type: SHOW_PRODUCTS_LOADER,
});
export const hideProductsLoader = () => ({
  type: HIDE_PRODUCTS_LOADER,
});

export const updateCanLoadMoreProducts = (canLoadMoreProducts) => ({
  type: UPDATE_CAN_LOAD_MORE_PRODUCTS,
  payload: canLoadMoreProducts,
});
