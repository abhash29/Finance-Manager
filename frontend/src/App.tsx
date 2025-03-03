import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Charts from './Pages/Charts';
import DashBoard from './Pages/DashBoard';
import EditPage from "./Pages/EditPage";
import Header from './Pages/Header'
import Landing from './Pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/edit/:id' element={<EditPage />}></Route>
        <Route path='/charts' element={<Charts />}></Route>
        <Route path='/dashboard' element={<DashBoard />}></Route>
        </Routes>
     
    </BrowserRouter>
  )
}

export default App
