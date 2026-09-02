import fs from "fs";
import path from "path";

export function markdownPages() {
    return {
        name: "markdown-pages",

        config(config, { command }) {
            if (command !== "build") {
                return;
            }

            const contentDir = path.resolve("src/content");
            const pages = {};

            for (const file of fs.readdirSync(contentDir)) {
                if (!file.endsWith(".md")) {
                    continue;
                }

                const name = path.basename(file, ".md");

                if (name === "home") {
                    pages[name] = "index.html";
                }
                else if (name === "404") {
                    continue;
                }
                else {
                    pages[name] = `${name}/index.html`;
                }
            }

            config.build = config.build || {};
            config.build.rollupOptions = config.build.rollupOptions || {};
            config.build.rollupOptions.input = pages;
        }
    };
}