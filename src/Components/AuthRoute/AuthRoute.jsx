import { Navigate } from "react-router-dom"

export default function PublicRoute({ children ,redirectByRole}) {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (token && role) {
    if (redirectByRole && redirectByRole[role]) {
    return <Navigate to={redirectByRole[role]} replace />
    }
    
  }

  return children
}

