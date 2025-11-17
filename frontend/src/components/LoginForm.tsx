import { useState } from "react";
import { api } from "../utils/api";
import InputField from "./shared/InputField";
import axios from "axios";
interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}
export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        onLoginSuccess(res.data.token);
      } else {
        throw new Error("No se recibió token del servidor");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = "Error al iniciar sesión";
        setError(msg);
      } else {
        setError("Error inesperado del sistema");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111a22] px-4">
      <div className="bg-[#18222d] w-full max-w-md rounded-2xl p-8 shadow-xl border border-[#1e2a33]
                      animate-[fadeIn_0.4s_ease]">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit}>

          <InputField
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
          />

          {/*TODO : QUITAR JSX Y USAR COMPONENTE DE ERROR*/}
          {error && (
            <div className="bg-red-900/40 text-red-300 p-2 rounded mb-4 text-sm border border-red-700/40">
              {error}
            </div>
          )}

          <InputField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="********"

          />

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full h-12 rounded-lg text-white font-bold flex items-center justify-center transition
                      ${loading ? "bg-[#1e90ff]/40 cursor-not-allowed" : "bg-[#1e90ff] hover:bg-[#1877d4]"}`}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
