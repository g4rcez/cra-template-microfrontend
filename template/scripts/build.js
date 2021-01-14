// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("react-scripts/config/env");
// @remove-on-eject-begin
// Do the preflight checks (only happens before eject).
const verifyPackageTree = require("react-scripts/scripts/utils/verifyPackageTree");
if (process.env.SKIP_PREFLIGHT_CHECK !== "true") {
  verifyPackageTree();
}
const verifyTypeScriptSetup = require("react-scripts/scripts/utils/verifyTypeScriptSetup");
verifyTypeScriptSetup();
// @remove-on-eject-end

const path = require("path");
const chalk = require("react-dev-utils/chalk");
const fs = require("fs-extra");
const webpack = require("webpack");
const configFactory = require("react-scripts/config/webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("react-scripts/config/paths");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const printHostingInstructions = require("react-dev-utils/printHostingInstructions");
const FileSizeReporter = require("react-dev-utils/FileSizeReporter");
const printBuildError = require("react-dev-utils/printBuildError");
const packageJson = require("../package.json");

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

const allDeps = {
  ...packageJson.devDependencies,
  ...packageJson.dependencies,
};

const universe = path.join(process.cwd(), "node_modules");
const ENTRY = "package.json";

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const friendlyVersion = (v = "") => v.replace(/^[\^>=<~]{1,2}/, "");

const urlFriendlyVersion = (packageJsonPath = "") => {
  const v = require(packageJsonPath).version;
  return friendlyVersion(v);
};

// Generate configuration
const config = configFactory("production");
config.output.filename = "static/js/[name].js";
config.output.chunkFilename = "static/js/[name].js";
config.output.jsonpFunction = packageJson.scope;

config.plugins.forEach((x, i) => {
  if (x instanceof MiniCssExtractPlugin) {
    config.plugins[i] = new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].css",
    });
  }
});

config.optimization.splitChunks = {
  chunks: "all",
  maxInitialRequests: 800,
  minSize: 0,
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name(module) {
        const moduleArray = module.context.split("/");
        const pkg = module.context
          .match(
            /[\\/]node_modules[\\/]((@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*)\/?/
          )[1]
          .replace(/\/$/, "");
        const urlFriendlyName = pkg.replace(/\//g, "-").replace("@", "");
        if (pkg in allDeps) {
          return `vendor/${urlFriendlyName.replace("@", "")}_${friendlyVersion(
            allDeps[pkg]
          )}`;
        }
        try {
          return `vendor/${urlFriendlyName}_${urlFriendlyVersion(
            path.join(universe, pkg, ENTRY)
          )}`;
        } catch (error) {
          const pkgPath = moduleArray.indexOf("node_modules") + 2;
          const pkgRoot = moduleArray.slice(0, pkgPath).join("/");
          const version = urlFriendlyVersion(path.join(pkgRoot, ENTRY));
          return `vendor/${urlFriendlyName.replace("@", "")}_${version}`;
        }
      },
    },
  },
};

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require("react-dev-utils/browsersHelper");
checkBrowsers(paths.appPath, isInteractive)
  .then(() => measureFileSizesBeforeBuild(paths.appBuild))
  .then((previousFileSizes) => {
    fs.emptyDirSync(paths.appBuild);
    copyPublicFolder();
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow("Compiled with warnings.\n"));
        console.log(warnings.join("\n\n"));
        console.log(
          "\nSearch for the " +
            chalk.underline(chalk.yellow("keywords")) +
            " to learn more about each warning."
        );
        console.log(
          "To ignore, add " +
            chalk.cyan("// eslint-disable-next-line") +
            " to the line before.\n"
        );
      } else {
        console.log(chalk.green("Compiled successfully.\n"));
      }

      console.log("File sizes after gzip:\n");
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrlOrPath;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    (err) => {
      const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
      if (tscCompileOnError) {
        console.log(
          chalk.yellow(
            "Compiled with the following type errors (you may want to check these before deploying your app):\n"
          )
        );
        printBuildError(err);
      } else {
        console.log(chalk.red("Failed to compile.\n"));
        printBuildError(err);
        process.exit(1);
      }
    }
  )
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log("Creating an optimized production build...");

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        // Add additional information for postcss errors
        if (Object.prototype.hasOwnProperty.call(err, "postcssNode")) {
          errMessage +=
            "\nCompileError: Begins at CSS selector " +
            err["postcssNode"].selector;
        }

        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== "string" ||
          process.env.CI.toLowerCase() !== "false") &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            "\nTreating warnings as errors because process.env.CI = true.\n" +
              "Most CI servers set it automatically.\n"
          )
        );
        return reject(new Error(messages.warnings.join("\n\n")));
      }

      const resolveArgs = {
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      };
      return resolve(resolveArgs);
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml,
  });
}
