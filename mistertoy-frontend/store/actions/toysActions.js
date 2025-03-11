import { toyService } from '../../services/toyService.js';
import { SET_TOYS,REMOVE_TOY,ADD_TOY,UPDATE_TOY,SET_IS_LOADING } from '../reducers/toy.reducer.js';
import { store } from '../store.js';


export function removeToy(toyId){
    return toyService.remove(toyId)
        .then(() =>{
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.error('toy action -> cannot remove toy:', err);
            throw err
        })        
} 

export function saveToy(toy){
    const type = toy._id ? UPDATE_TOY :ADD_TOY
    return toyService.save(toy)
        .then((savedToy) =>{
            store.dispatch({ type: type, toy: savedToy })
            return saveToy
        })
        .catch(err =>{
            console.log('toy action -> cannot save toy:', err)
            throw err
        })
} 

export  function loadToys(){
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({type:SET_IS_LOADING , isLoading : true})
    console.log('toy action -> filterBy :',filterBy)
    return toyService.query(filterBy)
        .then((filteredToys) =>{
            console.log('toy action -> filteredToys:', filteredToys)
            store.dispatch({ type: SET_TOYS, toys: filteredToys })
        })
        .catch(err =>{
            console.log('toy action -> cannot save toy:', err)
            throw err
        })
        .finally (() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}