/* eslint-disable no-unused-vars */

import { Provider } from 'react-redux'
import './App.css'
import Register from './components/Register/Register'
import store from './Store/Store'

function App() {
 

  return (
    <>

<Provider store={store}>
    <Register/>

    </Provider>
     
    </>
  )
}

export default App
