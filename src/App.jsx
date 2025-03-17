import {Route, BrowserRouter as Router , Routes} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '../mistertoy-frontend/store/store.js'
import { AppHeader } from '../mistertoy-frontend/cmps/AppHeader.jsx'
import { ToyIndex } from '../mistertoy-frontend/pages/ToyIndex.jsx'
import { ToyDetails } from '../mistertoy-frontend/pages/ToyDetails.jsx'
import { ToyEdit } from '../mistertoy-frontend/pages/ToyEdit.jsx'
import { useOnlineStatus } from '../mistertoy-frontend/hooks/useOnlineStatus.js'
import { useConfirmTabClose } from '../mistertoy-frontend/hooks/useConfirmTabClose.js'

function App() {
  const isOnline = useOnlineStatus()
  useConfirmTabClose(true)


  return (
      <Provider store={store}>
        <Router>
          <AppHeader/>
          <h2 style={{ color: isOnline ? 'green' : 'red' }}>
            {isOnline ? '✅ Online' : '❌ Disconnected'}
          </h2>
          <main>
            <Routes>
            <Route path="/toy/:toyId" element={<ToyDetails />} />
            <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
            <Route path="/toy/edit" element={<ToyEdit />} />
            <Route path = "/toy" element = {<ToyIndex/>}/>
            <Route path="*" element={<h1>404 - Page Not Found</h1>} /> 
            </Routes>
          </main>
        </Router>
      </Provider>
  )
}

export default App
