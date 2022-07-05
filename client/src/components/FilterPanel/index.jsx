import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  applyFilters,
  fetchFilters,
  fetchProducts,
  resetFilters,
} from "../../redux/actions";
import RadioListSelector from "../panel-components/RadioListSelector";
import RangeSelector from "../panel-components/RangeSelector";
import CheckboxListSelector from "../panel-components/CheckboxListSelector";
import classes from "./FilterPanel.module.sass";
import "./FilterPanel.sass";
import Loader from "../Loader";

function FilterPanel({
  isLoadingFilters,
  filters,
  appliedFilters,
  fetchFilters,
  applyFilters,
  fetchProducts,
  resetFilters,
}) {
  useEffect(() => {
    fetchFilters();
  }, []);

  const onCategorySelectionChange = (newCheckedCategories) => {
    const newAppliedFilters = {
      ...appliedFilters,
      checkedCategories: newCheckedCategories,
    };

    applyFilters(newAppliedFilters);
  };

  const onPriceRangeSelectionChange = (newPriceRange) => {
    const newAppliedFilters = {
      ...appliedFilters,
      price: newPriceRange,
    };
    applyFilters(newAppliedFilters);
  };

  const onDiscountChange = (newDiscount) => {
    const newAppliedFilters = {
      ...appliedFilters,
      discount: newDiscount,
    };
    applyFilters(newAppliedFilters);
  };

  const onApplyClick = (e) => {
    fetchProducts();
  };

  const onResetClick = (e) => {
    resetFilters();
  };

  if (isLoadingFilters) return <Loader size="medium" />;
  else
    return (
      <div className={classes.filterPanel}>
        <CheckboxListSelector
          onSelectionChange={onCategorySelectionChange}
          addTextField={true}
          options={filters.category}
          checkedOptions={appliedFilters.checkedCategories}
        >
          Категория
        </CheckboxListSelector>

        <RangeSelector
          limits={filters.price}
          values={appliedFilters.price}
          onRangeChange={onPriceRangeSelectionChange}
        >
          Цена
        </RangeSelector>

        <RadioListSelector
          propertyName="discount"
          items={filters.discount}
          value={appliedFilters.discount}
          onChange={onDiscountChange}
        >
          Размер скидки
        </RadioListSelector>

        <div className={classes.buttonsWrap}>
          <button onClick={onApplyClick}>Применить</button>
          <button className={classes.resetBtn} onClick={onResetClick}>
            Сбросить
          </button>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => ({
  filters: state.catalog.filters,
  appliedFilters: state.catalog.appliedFilters,
  isLoadingFilters: state.catalog.isLoadingFilters,
});

const mapDispatchToProps = {
  fetchFilters,
  applyFilters,
  fetchProducts,
  resetFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
