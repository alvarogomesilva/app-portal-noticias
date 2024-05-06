import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchUser } from "./store/user/action";
import { AppDispatch } from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadStorage() {
      setTimeout(() => {
        const token = localStorage.getItem('@u')
        try {
          if (token) {
            dispatch(fetchUser());
              setLoading(false)
            }
        
        } catch (error) {
          console.log(error)
        }
        finally {
          setLoading(false)
        }
      }, 500);
     
    }

    loadStorage()
  }, [dispatch]);

  if (loading) {
    return <div>Carregando...</div>
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
