import { useState } from 'react'

export function ToyFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ 
        name: filterBy.name || "",
        price: filterBy.price || "",
        inStock: filterBy.inStock || "All"})
        
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if(field === "inStock"){
            if(value === "All") value = null
            value = value ==="inStock"
        }
        switch (target.type) {
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        //updating filterBy state and filterByToEdit
        const updatedFilter = { ...filterByToEdit, [field]: value }
        setFilterByToEdit(updatedFilter)
        onSetFilterBy(updatedFilter)
    }

    const { name, price } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Filter Todos</h2>
            <form>
                <input 
                    value={name} 
                    onChange={handleChange}
                    type="search" 
                    placeholder="By name" 
                    id="name" 
                    name="name"
                />
                <label htmlFor="price">Price: </label>
                <input 
                    value={price} 
                    onChange={handleChange}
                    type="number" 
                    placeholder="By price" 
                    id="price" 
                    name="price"
                />
                 <label htmlFor="inStock">Status: </label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock === null ? "All" : filterByToEdit.inStock ? "inStock" :"out of stock"}
                    onChange={handleChange}>
                    <option value="All">All</option>
                    <option value="inStock">inStock</option>
                    <option value="out of stock">out of stock</option>
                </select>
            </form>
        </section>
    )
}