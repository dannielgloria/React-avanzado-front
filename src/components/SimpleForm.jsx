import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './SimpleForm.css';

export default function SimpleForm() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [email, setEmail] = useState()

    const onSubmit = data => {
        console.log(data);
        console.log(`${data.nombre} es el vaquero mas alto valiente y guapo, y estudio en ${data.escuela} `)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Nombre" {...register("nombre", { required: true, minLength: 5})}/>
            {errors.nombre?.type === 'required' && <p>El nombre es requerido, no seas tonoto</p>}
            {errors.nombre?.type === 'minLength' && <p>Tu nombre debe de tener almenos 5 letras, no seas tonoto</p>}
            <input type="text" placeholder="Correo" {...register("correo")}/>
            <input type="text" placeholder="Edad" {...register("edad")}/>
            <input className={errors.direccion ? 'input-error':''} type="text" placeholder="Dirección" 
            {...register("direccion", { required: true, minLength: 10})}/>
            {errors.direccion && (
                <span className="error-message"> 
                { errors.direccion.type === 'required' ? 'Campo obligatorio': 'Debe tener al menos 10 caracteres'} 
                </span>)
            }
            <input type="text" placeholder="Telefono" {...register("phone")}/>
            <input type="text" placeholder="Color" {...register("color")}/>
            <input type="text" placeholder="Escuela" {...register("escuela")}/>

            
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <button type="submit">Enviar</button>
            
        </form>
    );
}