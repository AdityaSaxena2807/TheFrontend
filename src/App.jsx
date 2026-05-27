import { useState } from 'react'
import axios from "axios";
import Register from './Components/Register';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Register/>
    </>
  )
}

export default App
