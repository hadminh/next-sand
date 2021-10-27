import Cors from "cors";
const cors = Cors({
  methods: ["GET", "HEAD", "POST"]
});
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const algoliasearch = require("algoliasearch");
const algoliaClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

// Add the search endpoint

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const { requests } = req.body;
  const results = await algoliaClient.search(requests);
  res.status(200).send(results);
}
