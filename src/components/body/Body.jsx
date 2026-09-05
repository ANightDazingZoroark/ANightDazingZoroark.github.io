import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import './body.css'
import { Card } from "./card/Card"
import { Gallery } from "./gallery/Gallery"

//contents, with some special parsers for some of the components here for markdown
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

export { Body };