import { defineConfig } from "cypress";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginEvents
) {
  const options = {
    webpackOptions: require("./webpack.config"),
  };
}
export default defineConfig({
  e2e: {

  },
});
