import { 
  BrowserRouter,
  Route, 
  Routes } from "react-router-dom"

import { NotePage } from "./pages/Notes"
import { HomePage } from "./pages/Home"
import { ConfirmEmail } from './pages/ConfirmEmail'


function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/confirm" element={<ConfirmEmail/>}/>
          <Route path="/notes" element={<NotePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
      )
}

export default App
