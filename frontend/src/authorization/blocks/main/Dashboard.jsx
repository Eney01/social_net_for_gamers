import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { search } = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (!token) {
      navigate("/authorization");
      return;
    }

    sessionStorage.setItem("token", token);

    
    navigate("/authorization", { replace: true });
  }, [search, navigate]);

  return <div>Добро пожаловать! Ваш токен сохранён.</div>;
}
