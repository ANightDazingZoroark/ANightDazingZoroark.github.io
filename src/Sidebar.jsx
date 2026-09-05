import { useEffect, useState } from "react";

//the sidebar itself
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

    const sidebarContent = (
        <>
            <div className="sidebar-header">
                <h1>ANightDazingZoroark</h1>
            </div>

            <div className="sidebar-menu">
                {Object.entries(pages).map(([pageId, page]) => (
                    <div className="nav-item" key={pageId}>
                        {(() => {
                            if (page.children) {
                                return(
                                    <SideBarButtonCollapsible
                                        pageId={pageId}
                                        page={page}
                                        isOpen={!!openMenus[pageId]}
                                        toggleMenu={toggleMenu}
                                        closeMobile={() => setMobileOpen(false)}
                                    />
                                );
                            }
                            else {
                                return(
                                    <SideBarButtonLink
                                        pageId={pageId}
                                        page={page}
                                        closeMobile={() => setMobileOpen(false)}
                                    />
                                );
                            }
                        })()}
                    </div>
                ))}
            </div>
        </>
    );

    if (isMobile) {
        return (
            <>
                <button
                    className="mobile-menu-button"
                    onClick={() => setMobileOpen((previous) => !previous)}
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
                    {sidebarContent}
                </nav>
            </>
        );
    }
    else {
        return (
            <nav className="sidebar">
                {sidebarContent}
            </nav>
        );
    }
}

//sidebar button that leads to direct link
function SideBarButtonLink({ pageId, page, closeMobile }) {
    return (
        <a
            className="nav-link"
            href={pageId === "home" ? "/" : `/${pageId}/`}
            onClick={closeMobile}
        >
            {page.label}
        </a>
    );
}

//sidebar button that creates dropdown and has children
function SideBarButtonCollapsible({pageId, page, isOpen, toggleMenu, closeMobile}) {
    return (
        <>
            <button
                className="nav-item-toggle"
                onClick={() => toggleMenu(pageId)}
                aria-expanded={isOpen}
            >
                <span>{page.label}</span>

                <span
                    className={`arrow ${isOpen ? "arrow-open" : ""}`}
                >
                    ›
                </span>
            </button>

            <div
                className={`nav-item-submenu ${
                    isOpen ? "submenu-open" : ""
                }`}
            >
                {Object.entries(page.children).map(
                    ([subPageId, subPage]) => (
                        <a
                            key={subPageId}
                            href={`/${subPageId}/`}
                            onClick={closeMobile}
                        >
                            {subPage.label}
                        </a>
                    )
                )}
            </div>
        </>
    );
}

export { SideBar };