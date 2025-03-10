export function ToyPreview({ toy, onToggleToy }) {
    return (
        <article className="toy-preview">
            <h2 className={(toy.inStock)? 'inStock' : 'Out of Stock'} onClick={onToggleToy}>
                Toy: {toy.name}
            </h2>
            <h4>Toy Price: {toy.price}</h4>
            <img src={toy.imgUrl} alt="" />
        </article>
    )
}
