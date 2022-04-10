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

const initialState = {
  products: [],
  filters: {
    category: [],
    discount: [],
    price: {
      min: null,
      max: null,
    },
  },
  appliedFilters: {
    /**
    checkedCategories[i] is true when category[i] is selected
      */
    checkedCategories: [],
    discount: null,
    price: {
      min: null,
      max: null,
    },
    limit: 6,
  },
  pagesLoaded: 0,
  canLoadMoreProducts: true,
  isLoadingFilters: true,
  isLoadingProducts: true,
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        pagesLoaded: 1,
      };
    case ADD_PRODUCTS_PAGE:
      return {
        ...state,
        products: state.products.concat(action.payload.products),
        pagesLoaded: action.payload.pagesLoaded,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case APPLY_FILTERS:
      return {
        ...state,
        appliedFilters: action.payload,
      };
    case RESET_FILTERS:
      const checkedCategories = Array(state.filters.category.length).fill(
        false
      );

      return {
        ...state,
        appliedFilters: {
          ...initialState.appliedFilters,
          checkedCategories,
        },
      };

    case UPDATE_CAN_LOAD_MORE_PRODUCTS:
      return {
        ...state,
        canLoadMoreProducts: action.payload,
      };

    case SHOW_PRODUCTS_LOADER:
      return {
        ...state,
        isLoadingProducts: true,
      };
    case HIDE_PRODUCTS_LOADER:
      return {
        ...state,
        isLoadingProducts: false,
      };
    case SHOW_FILTERS_LOADER:
      return {
        ...state,
        isLoadingFilters: true,
      };
    case HIDE_FILTERS_LOADER:
      return {
        ...state,
        isLoadingFilters: false,
      };

    default:
      return state;
  }
};

export default catalogReducer;
