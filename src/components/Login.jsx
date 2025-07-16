import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";
import './Login.css';


export default function Loging(){
    const { user, login } = useUser();
    const { register, handleSubmit, formState: {errors}} = useForm();

    if (user) return null;

    const onSubmit = (data) =>{
        login(data.nombre, data.password)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} aria-label="Formulario de login">
            <input 
                type="text"
                placeholder="Nombre"
                {...register("nombre", {required: true})}
                className={errors.nombre ? 'input-error':''}
            />
            {errors.nombre && <p>El nombre es obligatorio.</p>}

            <input 
                type="password"
                placeholder="Contraseña"
                {...register("password", {required: true})}
                className={errors.password ? 'input-error':''}
            />
            {errors.password && <p>La contraseña es obligatoria.</p>}

            <button className="login" type="submit">Iniciar sesión</button>

        </form>
    )
}