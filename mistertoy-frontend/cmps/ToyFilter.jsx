import { useState ,useEffect} from 'react'

export function ToyFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ 
        name: filterBy.name || "",
        price: filterBy.price || "",
        inStock: filterBy.inStock || "All"})

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let {value , name: field, type} = target
        if(field === "inStock"){
            if(value === "All") value = null
            value = value ==="inStock" ? "inStock" : "out of stock"
        }
        switch (type) {
            case 'number':
                value = +value
                break
            case 'txt':
                value = +value
            break
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked
                break
            default: break
        }
        setFilterByToEdit(prevFilter => ({...prevFilter , [field]:value}))
    }

    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <form>
                <label htmlFor="price">Name: </label>
                <input 
                    value={filterByToEdit.name} 
                    onChange={handleChange}
                    type="txt" 
                    placeholder="By name" 
                    id="name" 
                    name="name"
                />
                <label htmlFor="price">Price: </label>
                <input 
                    value={filterByToEdit.price} 
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
                    value={filterByToEdit.inStock}
                    onChange={handleChange}>
                    <option value="All">All</option>
                    <option value="inStock">inStock</option>
                    <option value="out of stock">Out of stock</option>
                </select>
            </form>
        </section>
    )
}