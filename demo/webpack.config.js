const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");

const PATHS = {
  src: resolve(__dirname, "src", "index.tsx"),
  output: resolve(__dirname, "dist"),
};

const babelLoader = {
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
    plugins: ["@babel/plugin-syntax-dynamic-import"],
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

const typedCssLoader = {
  loader: "typings-for-css-modules-loader",
  options: {
    camelCase: "only",
    modules: true,
    namedExport: true,
    localIdentName: "_demo_[name]_[local]_[hash:base64:5]", // prefix "_demo" so we can make sure classes come from the right place
  },
};

const config = {
  mode: "development",
  cache: false,
  entry: PATHS.src,
  output: {
    path: PATHS.output,
  },
  node: {
    fs: "empty",
    __filename: true,
    __dirname: true,
  },
  module: {
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
        use: [MiniCssExtractPlugin.loader, typedCssLoader, "sass-loader"],
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      minimize: true,
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "src", "index.html"),
      inject: true,
      hash: true,
      alwaysWriteToDisk: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", "src"],
  },
};

module.exports = config;
