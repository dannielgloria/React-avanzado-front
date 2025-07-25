import { useForm } from 'react-hook-form';
import client from '../api/client';
import './Login.css';

export default function Login() {
    const { register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await client.post('/user/login', data);
            localStorage.setItem('_id', res.data._id);
            alert('Login exitoso');
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            alert('Error en login');
        }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("email", {required: true})} 
        className={errors.email ? 'input-error':''} 
        placeholder="Email"
        />
      <input 
        {...register("password", {required: true})} 
        className={errors.password ? 'input-error':''} 
        type="password" 
        placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );

}