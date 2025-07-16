import { useUser } from "../context/UserContext";
import './Header.css';


export default function Header() {
    const { user, logout } = useUser();

    return(
        <header>
            {user ? (
                <>
                    <p>Hola, {user.name}</p>
                    <button onClick={logout}>Cerrar sesión</button>
                </>
            ):(
                <p>No has iniciado sesión</p>
            )}
        </header>
    );
}