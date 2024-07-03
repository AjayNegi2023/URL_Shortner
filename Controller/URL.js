const URLmodel = require("../Models/URL");
const shortid = require("shortid");
const handleGenerateURL = async (req, res) => {
  const body = req.body;
  console.log(body?.url)
  if (!body.url) {
    return res.status(400).json({
      message: "Url is Required",
    });
  }
  const id = shortid.generate();
  await URLmodel.create({
    shortID: id,
    redirectURL: body.url,
    visitedHistory: [],
    createdBy: req.user._id
  });

  return res.render("home",{
    id : id,
  })
};

const handleRefirectURl = async (req, res) => {
  const id = req?.params?.shortID;
  try {
    const entry = await URLmodel.findOneAndUpdate(
      { shortID: id },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!entry) {
      console.error(`No URL found for shortId: ${id}`);
      return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(`Error redirecting shortId: ${id}`, error);
    res.status(500).send("Internal Server Error");
  }
};

const handleGetAnalytics = async (req, res) => {
  const id = req.params.shortID;
  const result = await URLmodel.findOne({ shortID: id });

  if (!result) {
    console.error(`No URL found for shortId: ${id}`);
    return res.status(404).send("URL not found");
  }

  return res.status(202).json({
    totalClick: result.visitedHistory.length,
    anslytics: result.visitedHistory,
  });
};

module.exports = {
  handleGenerateURL,
  handleRefirectURl,
  handleGetAnalytics,
};
