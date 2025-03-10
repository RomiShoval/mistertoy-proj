// import { useState } from 'react'
// import reactLogo from './assets/img/react.svg'
// import viteLogo from '../public/vite.svg'
// import './assets/style/cmps/App.css'
import {Route, BrowserRouter as Router , Routes} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '../mistertoy-frontend/store/store.js'
import { AppHeader } from '../mistertoy-frontend/cmps/AppHeader.jsx'
import { ToyIndex } from '../mistertoy-frontend/pages/ToyIndex.jsx'
import { ToyDetails } from '../mistertoy-frontend/pages/ToyDetails.jsx'
import { ToyEdit } from '../mistertoy-frontend/pages/ToyEdit.jsx'

function App() {
  return (
      <Provider store={store}>
        <Router>
          <AppHeader/>
          <main>
            <Routes>
            <Route path="/toy/:toyId" element={<ToyDetails />} />
            <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
            <Route path="/toy/edit" element={<ToyEdit />} />
            <Route path = "/toy" element = {<ToyIndex/>}/>
            </Routes>
          </main>
        </Router>
      </Provider>
  )
}

export default App
