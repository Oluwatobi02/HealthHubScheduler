import { ReactNode, useEffect, useState, } from "react";
import { UserContext } from "./context";
import { useNavigate } from "react-router-dom";
interface UserProviderProps {
  children: ReactNode;
}
interface message {
  success: boolean | null;
  message: string;
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<message>({ success: null, message: "" });
  
  const isAuthenticated = token.length > 10;
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }, [token]);
  const login = async (email: string, password: string, isStaff: boolean) => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, isStaff }),
    });
    const data = await res.json();
    if (data.success) {
      setToken(data.token)
      setUser(data.user)
      setError(false)
      setMessage({ success: true, message: data.message })
      navigate('/dashboard')
    }
    else {
      setError(true)
      setMessage({ success: false, message: data.message })
    }
  }

  const logout = () => {
    setToken("")
    setUser({})
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
  }
  useEffect(() => {
    if (!isAuthenticated) {
      logout()
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, token, isAuthenticated, login, logout, error, message }}>
      {children}
    </UserContext.Provider>
  )


}