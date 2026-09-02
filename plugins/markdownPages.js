import fs from "fs";
import path from "path";

export function markdownPages() {
    let generatedFiles = [];

    return {
        name: "markdown-pages",

        config(config, { command }) {
            if (command !== "build") {
                return;
            }

            const root = path.resolve(".");
            const contentDir = path.resolve("src/content");
            const template = path.join(root, "index.html");

            const pages = {};
            generatedFiles = [];

            for (const file of fs.readdirSync(contentDir)) {
                if (!file.endsWith(".md")) {
                    continue;
                }

                const name = path.basename(file, ".md");

                // Home uses the existing index.html
                if (name === "home") {
                    pages[name] = template;
                    continue;
                }

                // 404 is handled separately
                if (name === "404") {
                    continue;
                }

                const directory = path.join(root, name);
                const htmlFile = path.join(directory, "index.html");

                fs.mkdirSync(directory, { recursive: true });
                fs.copyFileSync(template, htmlFile);

                pages[name] = htmlFile;
                generatedFiles.push(htmlFile);
            }

            // Generate a 404.html entry point
            const errorFile = path.join(root, "404.html");
            fs.copyFileSync(template, errorFile);

            pages["404"] = errorFile;
            generatedFiles.push(errorFile);

            config.build = config.build || {};
            config.build.rollupOptions = config.build.rollupOptions || {};
            config.build.rollupOptions.input = pages;
        },

        closeBundle() {
            // Remove the temporary HTML files after Vite has built them.
            for (const file of generatedFiles) {
                try {
                    fs.unlinkSync(file);
                }
                catch {
                    // File may already have been removed.
                }
            }

            // Remove the temporary directories we created.
            for (const file of generatedFiles) {
                if (file.endsWith(`${path.sep}index.html`)) {
                    const directory = path.dirname(file);

                    try {
                        if (fs.existsSync(directory) &&
                            fs.readdirSync(directory).length === 0) {
                            fs.rmdirSync(directory);
                        }
                    }
                    catch {
                        // Ignore cleanup errors.
                    }
                }
            }
        }
    };
}