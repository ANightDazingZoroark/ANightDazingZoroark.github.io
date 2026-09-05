import './card.css'

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

export { Card };