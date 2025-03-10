import { toyService } from '../services/toyService.js'
// import { showErrorMsg } from "../services/event-bus.service.js"

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [params.toyId])


    function loadToy() {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todo')
                navigate('/todo')
            })
    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/toy')
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1 className={(toy.inStock)? 'inStock' : 'not in stock'}>{toy.name}</h1>
            {/* <h2>{(toy.inStock)? 'inStock!' : 'In your list'}</h2> */}

            <h1>Toy price: {toy.price}</h1>
            {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p> */}
            <button onClick={onBack}>Back to list</button>
            <div>
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
            </div>
        </section>
    )
}