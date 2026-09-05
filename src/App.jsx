import { Footer } from "./components/footer/Footer";
import { SideBar } from "./components/sidebar/Sidebar";
import { Body } from "./components/body/Body";

const content = import.meta.glob(
    "./content/*.md",
    {
        query: "?raw",
        import: "default",
        eager: true
    }
);

//defines sidebar and website links
const pages = {
    "home": {
        label: "Home"
    },
    "my-projects": {
        label: "My Projects",
        children: {
            "prehistoric-rift": {
                label: "Prehistoric Rift"
            },
            "riftlibrary": {
                label: "RiftLibrary"
            },
            "no-peaceful-mode": {
                label: "No Peaceful Mode"
            },
            "rifted-valkyrium": {
                label: "Rifted Valkyrium"
            },
            "borgys-mobs": {
                label: "Borgy's Mobs (Discontinued)"
            },
            "cenozoic-reborn": {
                label: "Cenozoic Reborn (Discontinued)"
            }
        }
    },
    "no-more-bedrock": {
        label: "No More Bedrock"
    },
    "about": {
        label: "About"
    }
};

//da entry point
function App() {
    const pageName = window.location.pathname.replace(/^\/|\/$/g, "") || "home";
    const pageContent = content[`./content/${pageName}.md`];
    const finalContent = pageContent ?? content["./content/404.md"];
    //change page title
    const pageLabel = findPageLabel(pages, pageName);
    document.title = pageLabel ? `${pageLabel} - ANightDazingZoroark` : "404 - ANightDazingZoroark";

    return (
        <>
            <SideBar pages={pages} />
            <Body content={finalContent} />
            <Footer />
        </>
    );
}

//helper
function findPageLabel(pages, pageId) {
    if (pages[pageId]) {
        return pages[pageId].label;
    }

    for (const page of Object.values(pages)) {
        if (page.children) {
            const label = findPageLabel(page.children, pageId);

            if (label) {
                return label;
            }
        }
    }

    return null;
}

export default App;