import { useNavigate } from "react-router-dom"

function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    
    localStorage.removeItem("role")

    navigate("/home")
  }

  return (
    <button
      onClick={handleLogout}
      className="text-rose-800 hover:text-rose-700 cursor-pointer"
    >
      <i className="fa-solid fa-arrow-right-from-bracket fa-lg" />
    </button>
  )
}

export default LogoutButton
