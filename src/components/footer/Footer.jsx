import "@fortawesome/fontawesome-free/css/all.min.css";
import './footer.css'

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


export { Footer };