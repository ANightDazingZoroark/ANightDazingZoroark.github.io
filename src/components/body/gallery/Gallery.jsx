import './gallery.css'

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

export { Gallery };