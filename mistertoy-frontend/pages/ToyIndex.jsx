import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
// import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { toyService } from '../services/toyService.js'
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
// import { removeTodo,saveTodo ,loadTodos} from "../store/actions/todo.actions.js"
import {SET_FILTER_BY} from '../store/reducers/toy.reducer.js'

import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import {useSelector,useDispatch} from 'redux'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const dispatch = useDispatch()

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() =>{
        const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
        dispatch({type:SET_FILTER_BY, filterBy:defaultFilter})
    },[])

    useEffect(() => {
        setSearchParams(filterBy)
        loadToys()
        .catch(() =>showErrorMsg('Cannot load toys'))
    }, [filterBy])

    function onRemoveToy(toyId) {
        const isConfirmed = confirm("Are you sure you want to delete?")
        if(!isConfirmed) return

       removeToy(toyId)
            .then(() => {showSuccessMsg(`Toy removed`)})
            .catch(() => {showErrorMsg('Cannot remove toy ' + toyId)})
    }

    function onToggleToy(toy) {
        const toyToSave = { ...toy, inStock: !toy.inStock }
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Todo is ${(savedToy.inStock)? 'inStock' : 'out of stock'}`)
            })
            .catch(() => {
                showErrorMsg('Cannot toggle toy ' + toyToSave._id)
            })
    }

    function onSetFilter(newFilter) {
        dispatch({ type: SET_FILTER_BY, filterBy :newFilter })
    }

    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
            <div>
                <Link to="/toy/edit" className="btn">Add Toy</Link>
            </div>
            <h2>Toys List</h2>
            {!isLoading ?
                <ToyList 
                    toys={toys} 
                    onRemoveToy={onRemoveToy} 
                    onToggleToy={onToggleToy} 
                    isLoading = {isLoading}/>
                : <div>Loading..</div>
            }
            <hr />
            {/* <h2>Toys Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable toys={toys} onRemoveTodo={onRemoveToy} />
            </div> */}
        </section>
    )
}