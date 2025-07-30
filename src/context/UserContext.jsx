import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }){
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
    },[])

    const login = (userData) =>{
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () =>{
        localStorage.removeItem('user');
        setUser(null);
    }

    return(
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )

}


// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () =>  useContext(UserContext);
