//all important website stuff happens here
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "@fortawesome/fontawesome-free/css/all.min.css";
import rehypeRaw from "rehype-raw";

//the sidebar
function SideBar({ pages }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenu = (pageId) => {
        setOpenMenus((previous) => ({
            ...previous,
            [pageId]: !previous[pageId]
        }));
    };

    if (isMobile) {
        return (
            <>
                <button
                    className="mobile-menu-button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation menu"
                >
                    ☰
                </button>

                {mobileOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                <nav className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
                    <SidebarContent
                        pages={pages}
                        openMenus={openMenus}
                        toggleMenu={toggleMenu}
                        closeMobile={() => setMobileOpen(false)}
                    />
                </nav>
            </>
        );
    }
    else {
        return (
            <nav className="sidebar">
                <SidebarContent
                    pages={pages}
                    openMenus={openMenus}
                    toggleMenu={toggleMenu}
                />
            </nav>
        );
    }
}

//smol helper for sidebar
function SidebarContent({pages, openMenus, toggleMenu, closeMobile}) {
    return (
        <>
            <div className="sidebar-header">
                <h1>ANightDazingZoroark</h1>
            </div>

            <div className="sidebar-menu">
                {Object.entries(pages).map(([pageId, page]) => (
                    <div className="nav-item" key={pageId}>
                        {(() => {
                            if (page.children) {
                                return (
                                    <>
                                        <button
                                            className="nav-item-toggle"
                                            onClick={() => toggleMenu(pageId)}
                                            aria-expanded={!!openMenus[pageId]}
                                        >
                                            <span>{page.label}</span>

                                            <span
                                                className={`arrow ${
                                                    openMenus[pageId]
                                                        ? "arrow-open"
                                                        : ""
                                                }`}
                                            >
                                                ›
                                            </span>
                                        </button>

                                        <div
                                            className={`nav-item-submenu ${
                                                openMenus[pageId]
                                                    ? "submenu-open"
                                                    : ""
                                            }`}
                                        >
                                            {Object.entries(page.children).map(
                                                ([subPageId, subPage]) => (
                                                    <a
                                                        key={subPageId}
                                                        href={`/${subPageId}/`}
                                                        onClick={() => {
                                                            closeMobile?.();
                                                        }}
                                                    >
                                                        {subPage.label}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </>
                                );
                            }
                            else {
                                return (
                                    <a
                                        className="nav-link"
                                        href={
                                            pageId === "home"
                                                ? "/"
                                                : `/${pageId}/`
                                        }
                                        onClick={() => {
                                            closeMobile?.();
                                        }}
                                    >
                                        {page.label}
                                    </a>
                                );
                            }
                        })()}
                    </div>
                ))}
            </div>
        </>
    );
}

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

export { SideBar, Body, Footer };