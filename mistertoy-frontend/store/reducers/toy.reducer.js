import {toyService} from "../../services/toyService.js"

export const SET_TOYS = 'SET_TOYS'
export const SET_TOY = 'SET_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UPDATE_TOY_FIELD = 'UPDATE_TOY_FIELD'

const initialState = {
    toys: [],
    lastToys: [],
    filterBy: toyService.getDefaultFilter(),
    isLoading: false,
}

export function toyReducer(state = initialState , cmd={}){
    switch(cmd.type){
        case SET_TOYS:
            return{
                ...state,
                toys: cmd.toys || []
            }
            case REMOVE_TOY:
            return {
                ...state,
                toys : state.toys.filter(toy => toy._id != cmd.toyId),
                lastToys: [...state.toys]
                
            }
            case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys , cmd.toy],
            }
            case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy )
            }
            case  SET_FILTER_BY:
            return {
                ...state,
                filterBy: {...state.filterBy , ...cmd.filterBy}
            }
            case  SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
            case  SET_TOY:
            return {
                ...state,
                toy: cmd.toy
            }
            case  UPDATE_TOY_FIELD:
            return {
                ...state,
                toys: state.toys.map(toy => 
                    toy._id === cmd.toyId ? {...toy , [cmd.field] : cmd.value} : toy
                )
            }
            default:
                return state
    }   
            
}   
