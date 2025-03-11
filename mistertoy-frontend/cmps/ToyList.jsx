import { ToyPreview } from './ToyPreview.jsx'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

export function ToyList({ toys, onRemoveToy, onToggleToy ,isLoading }) {
    function getToyPrice(price) {
        if (price >= 8) return "high"
        if (price >= 5) return "medium"
        return "low"
    }

    if (isLoading) return <p>Loading Toys...</p>
    if (!toys.length) return <p>No Toys to show...</p>

    return (
        <ul className="toys-list">
            {toys.map(toy =>
                <li className={getToyPrice(toy.price)} key={toy._id} >
                    <ToyPreview toy={toy} onToggleToy={()=>onToggleToy(toy)} />
                    <section>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}

ToyList.propTypes = {
    toys: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            inStock: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
            createdAt: PropTypes.number.isRequired,
            imgUrl: PropTypes.string
        })
    ).isRequired,
    onRemoveToy: PropTypes.func.isRequired,
    onToggleToy: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
}