const fs = require("fs-extra");
const concat = require("concat");

(async function build() {

    const files = [
        "./dist/foo/runtime.js",
        "./dist/foo/polyfills.js",
        "./dist/foo/scripts.js",
        "./dist/foo/main.js",
    ]

    await fs.ensureDir("elements")
    await concat(files, "elements/innobot-ng-chatbot.js");
    await fs.copyFile("./dist/foo/styles.css", "elements/styles.css")
    
})()