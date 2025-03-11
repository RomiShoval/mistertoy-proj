import { utilService } from './utilService.js'
import { storageService } from './storageService.js'

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    _createToy
}
// For Debug (easy access from console):
window.cs = toyService

//to change filterBy values
function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (!Array.isArray(toys)) {
                console.error('Error: storageService.query() did not return an array!', toys);
                return [];
            }
            return toys;
        })
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.price) {
                const priceValue = Number(filterBy.price)
                console.log(typeof(priceValue))
                toys = toys.filter(toy => toy.price >= priceValue)
                console.log(`filtered toys by price:` , toys)
            }
            if(filterBy.inStock !== null && filterBy.inStock !== undefined){
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }
            return toys
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toyId => {
            const toy = _setNextPrevToyId(toyId)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(name = '', price = 5) {
    return { name, price}
}

function getDefaultFilter() {
    return { name: '', price: 0 ,inStock :null}
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        if (field === "inStock") {
            filterBy[field] = searchParams.get(field);
            if (filterBy[field] === "All" || !filterBy[field]) filterBy[field] = null;
            else filterBy[field] = filterBy[field] === "inStock";
        }
        else{
            filterBy[field] = searchParams.get(field) || ''
        }
    }
    return filterBy
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['Talking Doll', 'Dora', 'Barbi']
        for (let i = 0; i < 20; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            toys.push(_createToy(name + (i + 1), utilService.getRandomIntInclusive(1, 10)))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price =5) {
    const toy = getEmptyToy(name, price)
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToyId = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToyId = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToyId._id
        toy.prevToyId = prevToyId._id
        return toy
    })
}



// Data Model:
// const toy = { 
    // _id: 't101', 
    // name: 'Talking Doll', 
    // imgUrl: 'hardcoded-url-for-now', 
    // price: 123, 
    // labels: ['Doll', 'Battery Powered', 'Baby'], 
    // createdAt: 1631031801011, inStock: true,
    // }

