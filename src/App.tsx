import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './page/Home'
import SignIn from './page/SignIn'
import Register from './page/Register'
import Dashboard from './page/Dashboard'
import Qrscanner from './page/Qrscanner'
import Qrcode from './page/Qrcode'
import Qrgenerator from './page/Qrgenerator'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/qrscanner/:qrid" element={<Qrscanner/>}/>
        <Route path="/qrcode/:qrid" element={<Qrcode/>}/>
        <Route path="/qrgenerator" element={<Qrgenerator/>}/>
      </Routes>
    </Router>
  )
}

export default App
