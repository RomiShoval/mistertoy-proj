import PropTypes from 'prop-types'

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

ToyPreview.PropTypes ={
    toy: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inStock: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        createdAt: PropTypes.number.isRequired,
        imgUrl: PropTypes.string
    }).isRequired,
    onToggleToy: PropTypes.func.isRequired
}
