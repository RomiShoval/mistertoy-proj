import { toyService } from '../services/toyService.js'
import { showErrorMsg, showSuccessMsg } from '../services/eventBusService.js'
import { saveToy } from '../store/actions/toysActions.js'
import { SET_TOY, UPDATE_TOY_FIELD } from '../store/reducers/toy.reducer.js'

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import {useSelector,useDispatch} from 'react-redux'

export function ToyEdit() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const existingToy = toys.find(toy => toy._id === params.toyId) || toyService.getEmptyToy()
    const[toyToEdit,setToyToEdit] = useState(existingToy)


    useEffect(() => {
        if (params.toyId && !existingToy) 
            loadToy()
    }, [])

    function loadToy() {
        toyService.get(params.toyId)
            .then(toy => {
                setToyToEdit(toy)
                dispatch({type : SET_TOY ,toy})})
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
       console.log(`Changing field "${field}" to value`, value)
       setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
       dispatch({type : UPDATE_TOY_FIELD , field , value})
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                console.log("Toy Saved:", savedToy)
                navigate('/toy')
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
                console.log('err:', err)
            })
    }
    if (!toyToEdit) return <div>Loading...</div>

    const { name, price, inStock } = toyToEdit

    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <label htmlFor="inStock">inStock:</label>
                <input onChange={handleChange} value={inStock} type="checkbox" name="inStock" id="inStock" />
                <button>Save</button>
            </form>
        </section>
    )
}