import React from "react";
import classes from "./ItemCard.module.sass";

export default function ItemCard({ item }) {
  return (
    <div className={classes.itemCard}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={item.image} alt="" />
      </div>
      <span className={classes.price}>${item.price}</span>
      <div className={classes.rating}>
        <svg>
          <path
            className={item.rating.count ? classes.active : null}
            d="M7 10l4 3-1-5 4-3H9L7 0 5 5H0l4 3-1 5 4-3z"
          ></path>
        </svg>
        {item.rating.count && (
          <span className={classes.ratingRate}>{item.rating.rate}</span>
        )}
        <span className={classes.ratingCount}>
          {(item.rating.count ? item.rating.count : "нет") + " отзывов"}
        </span>
      </div>
      <span className={classes.title}>{item.title}</span>
      <button>В корзину</button>
    </div>
  );
}
