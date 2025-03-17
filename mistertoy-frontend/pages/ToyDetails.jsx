import { toyService } from '../services/toyService.js'
import { showErrorMsg } from '../services/eventBusService.js'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { NicePopup } from '../cmps/NicePopUp.jsx'
import { Chat } from '../cmps/Chat.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const {toyId} = useParams()
    const navigate = useNavigate()
    const [isChatOpen, setIsChatOpen] = useState(false)

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])


    function loadToy() {
        toyService.get(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
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
            <h2>{(toy.inStock)? 'inStock!' : 'In your list'}</h2>

            <h1>Toy price: {toy.price}</h1>
            <h1>Created At: {new Date(toy.createdAt).toISOString().split('T')[0]}</h1>

            <button onClick={onBack}>Back to list</button>
            <div>
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
            </div>

            <button onClick={() => setIsChatOpen(true)} className="chat-btn">💬 Chat</button>
            {isChatOpen && (
                <NicePopup heading="Chat Support" onClose={() => setIsChatOpen(false)}>
                    <Chat />
                </NicePopup>
            )}
        </section>
    )
}