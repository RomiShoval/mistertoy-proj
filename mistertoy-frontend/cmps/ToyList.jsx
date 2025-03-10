import { ToyPreview } from './ToyPreview.jsx'
import { Link } from 'react-router'

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
                <li key={toy._id} className={getToyPrice(toy.price)}>
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