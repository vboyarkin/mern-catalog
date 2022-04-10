import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchProducts, loadNextPage } from "../redux/actions";
import ItemCard from "./ItemCard";
import classes from "./ItemList.module.sass";
import Loader from "./Loader";
import TextFiller from "./TextFiller";

function ItemList({
  isLoadingProducts,
  canLoadMoreProducts,
  products,
  fetchProducts,
  loadNextPage,
}) {
  const infinityScrollTrigger = useRef();
  const observerRef = useRef();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!canLoadMoreProducts || isLoadingProducts) return;
    if (observerRef.current) observerRef.current.disconnect();

    const callback = async (entries, observer) => {
      if (!entries[0].isIntersecting) return;

      await loadNextPage();
    };

    observerRef.current = new IntersectionObserver(callback);
    observerRef.current.observe(infinityScrollTrigger.current);
  }, [isLoadingProducts]);
  return (
    <div className={classes.itemList}>
      {products.map(item => (
        <ItemCard item={item} key={item.id} />
      ))}
      <div
        ref={infinityScrollTrigger}
        style={{ height: 1, width: "100%" }}
      ></div>

      {isLoadingProducts && products.length === 0 && <Loader size="large" />}
      {isLoadingProducts && products.length !== 0 && <Loader size="small" />}
      {!isLoadingProducts && products.length === 0 && (
        <TextFiller text={"Ничего не нашлось..."} size="large" />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoadingProducts: state.catalog.isLoadingProducts,
  products: state.catalog.products,
  canLoadMoreProducts: state.catalog.canLoadMoreProducts,
});

const mapDispatchToProps = {
  fetchProducts,
  loadNextPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
