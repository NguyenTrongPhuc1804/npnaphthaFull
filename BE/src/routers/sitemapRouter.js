const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");
const Sitemap = require("../models/siteMapModel");
const siteMapRouter = express.Router();
siteMapRouter.get("/sitemap.xml", async (req, res) => {
  const sitemap = new SitemapStream({
    hostname: process.env.DOMAIN,
  });
  const listSite = await Sitemap.find();
  listSite.map((item, index) =>
    sitemap.write({
      url: item.url,
      changefreq: item.changefreq,
      priority: item.priority,
    })
  );

  sitemap.end();
  streamToPromise(sitemap).then((sm) => {
    res.header("Content-Type", "application/xml");
    res.send(sm);
  });
});
siteMapRouter.post("/create", async (req, res) => {
  const data = req.body;
  try {
    const newSiteMap = await Sitemap.create(data);
    res.status(200).json(newSiteMap);
  } catch (error) {
    console.log(error, "error");
    res.status(500).json(error);
  }
});
module.exports = siteMapRouter;
