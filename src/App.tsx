import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './page/Home'
import SignIn from './page/SignIn'
import Register from './page/Register'
import Dashboard from './page/Dashboard'
import Resetpass from './page/Resetpass'
import Qrscanner from './page/Qrscanner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/resetpass" element={<Resetpass/>}/>
        <Route path="/qrscanner/:qrid" element={<Qrscanner/>}/>
      </Routes>
    </Router>
  )
}

export default App
