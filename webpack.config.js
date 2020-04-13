const { resolve } = require("path");
const glob = require("glob");
const WebpackNodeExternals = require("webpack-node-externals");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");

const notFalse = (val) => val !== false;
const nodeEnv = process.env.NODE_ENV.toLowerCase();
const IS_TEST = nodeEnv === "test";
const IS_PROD = nodeEnv === "production";

if (!IS_TEST && !IS_PROD) {
  throw new Error("NODE_ENV was not set to one of test or production (it was '" + nodeEnv + "'");
}

const PATHS = {
  src: resolve(__dirname, "src", "index.ts"),
  testSrc: glob.sync(resolve(__dirname, "src", "**", "*.tests.{ts,tsx}")),
  output: resolve(__dirname, "dist"),
};

const babelLoader = {
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
    plugins: [IS_TEST && "istanbul", "@babel/plugin-syntax-dynamic-import", "date-fns"].filter(notFalse),
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: true,
          },
          modules: false,
        },
      ],
      ["@babel/typescript"],
      ["@babel/react"],
    ],
  },
};

const tsLoader = {
  loader: "ts-loader",
  options: {
    configFile: "tsconfig.json",
    compilerOptions: {
      module: "esnext",
    },
  },
};

const terserMinimiser = new TerserWebpackPlugin({
  parallel: true,
  terserOptions: {
    cache: true,
    ecma: 6,
    toplevel: true,
    module: true,
    sourceMap: false,
    compress: {
      drop_console: true,
    },
  },
});

const config = {
  mode: IS_PROD ? "production" : "development",
  cache: false,
  entry: IS_TEST ? PATHS.testSrc : PATHS.src,
  output: {
    path: PATHS.output,
    libraryTarget: "umd",
    library: "react-ui-components",
  },
  node: {
    fs: "empty",
    __filename: true,
    __dirname: true,
  },
  module: {
    // in test mode, disable this warning
    exprContextCritical: !IS_TEST,

    rules: [
      {
        test: /\.ts(x?)$/,
        use: [babelLoader, tsLoader],
        exclude: /node_modules/,
      },
      {
        test: /\.js(x?)$/,
        use: [babelLoader],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(s?)css$/,
        use: [
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              camelCase: "only",
              modules: true,
              namedExport: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    !IS_TEST && new webpack.IgnorePlugin(/tests\.tsx?$/),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
  ].filter(notFalse),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", "src"],
  },
  externals: IS_TEST
    ? [WebpackNodeExternals()]
    : {
        // don't bundle react or react-dom
        react: {
          commonjs: "react",
          commonjs2: "react",
          amd: "React",
          root: "React",
        },
        "react-dom": {
          commonjs: "react-dom",
          commonjs2: "react-dom",
          amd: "ReactDOM",
          root: "ReactDOM",
        },
      },
  optimization: {
    minimize: IS_PROD,
    minimizer: IS_PROD ? [terserMinimiser] : [],
  },
  performance: {
    hints: IS_PROD ? "warning" : false,
  },
  stats: IS_TEST ? "errors-only" : "minimal",
};

module.exports = config;
