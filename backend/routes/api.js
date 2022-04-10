import mongoose from "mongoose";
const Item = mongoose.model("Item");
import { Router } from "express";
const router = Router();

router.use("/products", async (req, res, next) => {
  try {
    const limit = req.query.limit || 20;
    let skip = (req.query.page - 1) * limit;
    if (!skip || skip < 0) skip = 0;
    const query = {};

    for (const prop of ["category", "discount"]) {
      if (req.query[prop]) {
        query[prop] = { $in: req.query[prop] };
      }
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};

      if (req.query.minPrice) query.price.$gte = req.query.minPrice;
      if (req.query.maxPrice) query.price.$lte = req.query.maxPrice;
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
      result[prop] = result[prop].map(x => ({
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

