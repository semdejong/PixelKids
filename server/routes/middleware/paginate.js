function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const query = req.query;

    const amountOfResults = await model.countDocuments(query || {}).exec();

    results.amount = amountOfResults;

    if (endIndex < amountOfResults) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      if (query) {
        results.results = await model
          .find(query)
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        results.results = await model
          .find()
          .limit(limit)
          .skip(startIndex)
          .exec();
      }
      res.paginatedResults = results;
      next();
    } catch (err) {
      console.log(err);

      return res
        .status(500)
        .json({ message: err.message, location: "paginatedResults" });
    }
  };
}

//custom function to create a query for pagination
function createQuery(bodyFields, paramFields, customQuery) {
  return async (req, res, next) => {
    const query = {};
    const body = req.body;
    const params = req.params;

    for (const field of bodyFields) {
      if (body[field]) {
        query[field] = body[field];
      }
    }

    for (const field of paramFields) {
      if (params[field]) {
        query[field] = params[field];
      }
    }

    if (customQuery) {
      query.$and = [customQuery, query];
    }

    res.query = query;
    next();
  };
}

module.exports = { paginatedResults, createQuery };
