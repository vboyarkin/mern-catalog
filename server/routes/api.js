import { Router } from "express";
import Item from "../models/item.js";
const router = Router();

router.use("/products", async (req, res, next) => {
  try {
    const { limit = 20, minPrice, maxPrice } = req.query || {};
    let skip = (req.query.page - 1) * limit;
    if (!skip || skip < 0) {
      skip = 0;
    }

    const query = {};

    for (const prop of ["category", "discount"]) {
      if (req.query[prop]) {
        query[prop] = { $in: req.query[prop] };
      }
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    console.log("req.query :>> ", req.query);
    console.log("query :>> ", query);

    const found = await Item.find(query).skip(skip).limit(limit).exec();

    console.log("found items:", found.length);

    res.json(found);
  } catch (err) {
    next(err);
  }
});

router.use("/filters", async (req, res, next) => {
  try {
    let result = await Item.aggregate([
      {
        $facet: {
          min: [{ $sort: { price: 1 } }, { $limit: 1 }],
          max: [{ $sort: { price: -1 } }, { $limit: 1 }],
          category: [
            {
              $group: {
                _id: "$category",
                id: { $first: "$_id" },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
          discount: [
            {
              $group: {
                _id: "$discount",
                id: { $first: "$_id" },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          price: {
            min: { $first: "$min.price" },
            max: { $first: "$max.price" },
          },
          category: 1,
          discount: 1,
        },
      },
    ]).exec();

    result = result[0];

    for (const prop of ["category", "discount"]) {
      result[prop] = result[prop].map((x) => ({
        option: x._id,
        id: x.id,
      }));
    }

    return res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;

