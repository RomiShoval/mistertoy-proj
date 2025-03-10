import { toyService } from '../../services/toyService.js';
import { SET_TOYS,REMOVE_TOY,ADD_TOY,UPDATE_TOY,SET_IS_LOADING } from '../reducers/toy.reducer.js';
import { store } from '../store.js';


export async function removeToy(toyId){
    try {
        await toyService.remove(toyId);
        store.dispatch({ type: REMOVE_TOY, toyId });
    } catch (err) {
        console.error('Error removing toy:', err);
        throw err;
    }
} 

export async function saveToy(toy){
    const type = toy._id ? UPDATE_TOY :ADD_TOY
    try {
        const savedToy = await toyService.save(toy);
        store.dispatch({ type: type, toy: savedToy });
        return savedToy;
    } catch (err) {
        console.log('err:', err);
        throw err;
    }
} 

export async function loadToys(){
    store.dispatch({type:SET_IS_LOADING , isLoading : true})
    const filterBy = store.getState().toyModule.filterBy
    console.log(filterBy)
    try {
        const filteredToys = await toyService.query(filterBy);
        console.log(filteredToys)
        store.dispatch({ type: SET_TOYS, toys: filteredToys });
        return filteredToys;
    } catch (err) {
        console.eror('err:', err);
        throw err;
    }
    finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
}