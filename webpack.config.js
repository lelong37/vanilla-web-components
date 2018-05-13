"use strict";

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const plugins = [
  new CleanWebpackPlugin(["dist"]),
  new CopyWebpackPlugin([
    {
      from: "src/**/*",
      to: "./",
      flatten: true,
      ignore: ["*.ts", "*.map", "*.html"]
    }
  ]),
];

const links = require("./src/links.json");

links.forEach(link => {
  var filename = `${(link.url || link.title)}.html`;
  plugins.push(new HtmlWebpackPlugin({
    inject: link.inject || true,
    template: `./src/${filename}`,
    filename: filename
  }));
});

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: "/node_modules/",
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".html"]
  },
  plugins: plugins
};

