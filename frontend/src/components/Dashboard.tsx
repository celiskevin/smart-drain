//Importación de componentes
import { AdminDashboard } from './AdminDashboard'
import { UserDashboard } from './UserDashboard'
//Importación de funciones
import { isAdmin } from '../utils/auth'

export default function Dashboard() {
    const admin = isAdmin();
    return (
        //Si es administrador (admin ? ) rederiza AdminDashboard, si no (:) rederiza UserDashboard
        admin ? <AdminDashboard /> : <UserDashboard />
    )
}

//Renderer Dashboard sin importar que sea administrador o usuario