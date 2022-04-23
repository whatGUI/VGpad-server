const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      builderOptions: {
        win: {
          icon: "./build/icons/icon.ico",
        },
      },
    },
  },
});

