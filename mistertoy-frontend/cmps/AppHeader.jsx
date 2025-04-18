import { useState ,useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import {useSelector,useDispatch} from 'react-redux'
import {UserMsg} from './UserMsg.jsx'

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Mister Toy Project</h1>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
