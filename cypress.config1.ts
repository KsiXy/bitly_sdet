import { defineConfig } from "cypress";
import webpack from "@cypress/webpack-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");

const artifactsFolder = path.resolve(__dirname, ".ci/artifacts");
const cacheFolder = path.resolve(__dirname, ".ci/cache");

const screenshotsFolder = path.resolve(artifactsFolder, "cypress-screenshots");
const videosFolder = path.resolve(artifactsFolder, "cypress-videos");
const downloadsFolder = path.resolve(artifactsFolder, "cypress-downloads");

/**
 * @type {Cypress.PluginConfig}
 */
async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        mode: "development",
        // see: https://webpack.js.org/configuration/cache/
        cache: {
          name: "webpack",
          version: "",
          // default: cache type "memory" in "development" mode
          //          disabled in "production" mode
          type: "filesystem",
          // note: base directory for the cache, unused if cache.cacheLocation is used
          // default: node_modules/.cache/webpack
          cacheDirectory: path.resolve(cacheFolder, ".ci/cache/webpack"),
          // note: cache path inside the cache base directory
          // default: path.resolve(cache.cacheDirectory, cache.name)
          cacheLocation: path.resolve(cacheFolder, ".ci/cache/webpack"),
          // note: cache.maxAge in [milliseconds]
          // default: 1 month
          maxAge: 5184000000,
          // note: cache.idleTimeout in [milliseconds]
          idleTimeout: 60000,
          idleTimeoutForInitialStore: 0,
          idleTimeoutAfterLargeChanges: 1000,
          // note: compression options are: false | "gzip" | "brotli" (only applicable with cache.type "filesystem")
          compression: false,
          profile: false,
          allowCollectingMemory: false,
        },
        devtool: "inline-source-map",
        resolve: {
          extensions: [".ts", ".js", ".jsx"],
          alias: {
            "@Page": path.resolve("./cypress/pages/"),
            "@Cypress": path.resolve("./cypress"),
          },
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "babel-loader",
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  const parsePdf = async (pdfName: object) => {
    const pdfPathname = path.join(downloadsFolder, pdfName);
    const dataBuffer = fs.readFileSync(pdfPathname);
    return await pdf(dataBuffer);
  };

  on("task", {
    getPdfContent(pdfName) {
      return parsePdf(pdfName);
    },
  });

  let data: any;

  on("task", {
    saveData: (val: object) => {
      return (data = val);
    },
    loadData: () => {
      return data;
    },
  });

  let apiBaseUrl: any;

  on("task", {
    saveApiBaseUrl: (val: any) => {
      return (apiBaseUrl = val);
    },
    loadApiBaseUrl: () => {
      return apiBaseUrl;
    },
  });

  const market = process.env.MARKET_UNDER_TEST || "de";
  config.env.market = market.toLowerCase();
  return config;
}

export default defineConfig({
  port: 8081,
  viewportWidth: 1920,
  viewportHeight: 1080,
  scrollBehavior: false,
  defaultCommandTimeout: 15000,
  requestTimeout: 10000,
  watchForFileChanges: false,
  includeShadowDom: true,
  chromeWebSecurity: false,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
  screenshotsFolder,
  videosFolder,
  downloadsFolder,
  trashAssetsBeforeRuns: true,
  video: false,
  videoUploadOnPasses: false,
  env: {
    TAGS: process.env.TAGS ?? "not (@ignore or @wip or @todo)",
  },
  e2e: {
    baseUrl: "http://localhost:8080/#",
    setupNodeEvents,
    experimentalWebKitSupport: true,
    experimentalRunAllSpecs: true,
    experimentalStudio: false,
    supportFile: "./cypress/Support/index.ts",
    specPattern: [
      "cypress/e2e/*.cy.ts",
      "cypress/e2e/FeatureFiles/*/*.feature",
      "cypress/e2e/FeatureFiles/**/*.feature",
      "cypress/e2e/FeatureFiles/Customer/*.feature",
      "cypress/e2e/FeatureFiles/Seller/*.feature",
    ],
  },
});
