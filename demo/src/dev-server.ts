// TODO: fix duplicate Express import

import { resolve } from "path";
// eslint-disable-next-line import/no-duplicates
import * as Express from "express";
// eslint-disable-next-line import/no-duplicates
import { Request, Response } from "express";
import * as Webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";

const app = Express();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackConfig: Webpack.Configuration = require(resolve(__dirname, "..", "webpack.config.js"));
const compiler = Webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: "warn",
  }),
);
app.use(webpackHotMiddleware(compiler));

// all requests are handled by UI
app.get("*", (req: Request, res: Response) => {
  res.sendFile(resolve(__dirname, "index.html"));
});

// go!
const port = 3000;
const server = app.listen(port, () => console.log(`Dev server listening on port ${port}`));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
