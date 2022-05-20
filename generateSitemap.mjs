import routes from "./src/router/routes.mjs";
import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

const links = (function() {
  const now = new Date().toISOString();
  return routes.filter(({ path }) => !path.includes(":")).map(({ path }) => ({
    url: path,
    lastmod: now,
    changefreq: path === "/" ? "yearly" : "always",
    priority: path === "/" || path === "/dashboard" ? 1.0 : 0.5
  }))
})();

const stream = new SitemapStream( { hostname: "https://wwwallet.app" } )
const sitemap = await streamToPromise(Readable.from(links).pipe(stream));

writeFileSync("public/sitemap.xml", sitemap);