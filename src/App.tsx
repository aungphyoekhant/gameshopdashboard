import { Outlet } from "react-router-dom"
import { GlobalAlert } from "./components/Alert"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
      <GlobalAlert />
    </>
  )
}

export default App
