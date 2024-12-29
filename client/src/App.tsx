import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/auth/SignUp"
import { SignIn } from "./pages/auth/SignIn"
const App = () =>{
  return(
  <Routes>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/login" element={<SignIn/>} />
  </Routes>
  )
}
export default App