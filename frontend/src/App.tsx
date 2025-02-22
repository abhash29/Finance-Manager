import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        </Routes>
     
    </BrowserRouter>
  )
}

export default App
