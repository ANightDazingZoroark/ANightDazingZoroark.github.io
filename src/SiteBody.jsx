//all important website stuff happens here
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "@fortawesome/fontawesome-free/css/all.min.css";
import rehypeRaw from "rehype-raw";

//contents, with some special parsers for some of the components here
function Body({ content }) {
    return (
        <main className="main-content markdown-content">
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    card: ({ node, image, subtext, page }) => (
                        <Card
                            image={image}
                            subtext={subtext}
                            page={page}
                        />
                    ),
                    gallery: ({ children, columns }) => (
                        <Gallery columns={columns}>
                            {children}
                        </Gallery>
                    )
                }}
            >
                {content ?? ""}
            </ReactMarkdown>
        </main>
    );
}

//footer
function Footer() {
    return (
        <footer>
            <div className="social-links">
                <a
                    href="https://github.com/ANightDazingZoroark"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <i className="fa-brands fa-github"></i>
                </a>

                <a
                    href="https://x.com/nightdazer22"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                >
                    <i className="fa-brands fa-twitter"></i>
                </a>

                <a
                    href="https://www.youtube.com/@ANightDazingZoroark"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                >
                    <i className="fa-brands fa-youtube"></i>
                </a>

                <a
                    href="https://steamcommunity.com/id/ANightDazingZoroark/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Steam"
                >
                    <i className="fa-brands fa-steam"></i>
                </a>

                <a
                    href="https://discord.gg/JnjQtkVt8R"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                >
                    <i className="fa-brands fa-discord"></i>
                </a>
            </div>
            
            Made with React.js
        </footer>
    );
}

//a card w a pic, subtext, and a link to somewhere
function Card({ image, subtext, page }) {
    return (
        <a href={page} className="card">
            <img
                src={`/images/${image}`}
                alt={subtext}
                className="card-image"
            />
            <p>{subtext}</p>
        </a>
    );
}

//a gallery. accepts multiple pics
function Gallery({ children, columns = 3 }) {
    return (
        <div
            className="gallery"
            style={{
                "--gallery-columns": columns
            }}
        >
            {children}
        </div>
    );
}

export { Body, Footer };