import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() { //! ESTAMOS EXPORTANDO DEFAULT
    const navigate = useNavigate();

    const handleLoginSuccess = (token: string) => {
        // You can add additional logic here if needed
        navigate('/dashboard'); // or any other route you want to redirect to after login
    };

    return (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
    );
}