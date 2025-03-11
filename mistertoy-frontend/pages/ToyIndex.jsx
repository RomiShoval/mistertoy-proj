import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
// import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { toyService } from '../services/toyService.js'
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { removeToy , saveToy , loadToys} from '../store/actions/toysActions.js'
import {SET_FILTER_BY} from '../store/reducers/toy.reducer.js'

import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import {useSelector,useDispatch} from 'react-redux'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    const dispatch = useDispatch()
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    // useEffect(() =>{
    //     const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
    //     dispatch({type:SET_FILTER_BY, filterBy:defaultFilter})
    // },[])

    useEffect(() => {
        setSearchParams(filterBy)
        loadToys()
            .catch(() =>showErrorMsg('Cannot load toys'))
    }, [filterBy])

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveToy(toyId) {
        const isConfirmed = confirm("Are you sure you want to delete?")
        if(!isConfirmed) return

       removeToy(toyId)
            .then(() => {showSuccessMsg(`Toy removed`)})
            .catch(() => {showErrorMsg('Cannot remove toy ' + toyId)})
    }

    function onAddToy() {
        const toyToSave = toyService._createToy()
        
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Car added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg(`Cannot add car`)
            })
    }

    function onToggleToy(toy) {
        const toyToSave = { ...toy, inStock: !toy.inStock }
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy is ${(savedToy.inStock)? 'inStock' : 'out of stock'}`)
            })
            .catch(() => {
                showErrorMsg('Cannot toggle toy ' + toyToSave._id)
            })
    }

    

    return (
        <div className="toy-index">
            <h3>Toys List</h3>
            <main>
            <section>
                    <button className='add-btn'><Link to={`/toy/edit`}>Add Toy</Link></button>
                    <button onClick={onAddToy}>Add Random Toy ⛐</button>
            </section>
            <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
            {!isLoading ?
                <ToyList 
                    toys={toys} 
                    onRemoveToy={onRemoveToy} 
                    onToggleToy={onToggleToy} 
                    isLoading = {isLoading}
                />
                : <div>Loading..</div>
            }
            <hr />
            </main>
        </div>  
    )
}