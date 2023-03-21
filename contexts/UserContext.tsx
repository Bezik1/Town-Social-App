import { createContext, useContext, useState } from "react";
import { ParentProps, User, UserContextType } from "../types";

const UserContext = createContext<UserContextType>({
    user: undefined,
    setUser: undefined
})

export const UserProvider = ({ children } : ParentProps) =>{
    const [user, setUser] = useState<User>()

    return (
        <UserContext.Provider value={{user, setUser}}>
            { children }
        </UserContext.Provider>
    )
}

export const useUserContext = () =>{
    const { user, setUser } = useContext(UserContext)

    if(typeof setUser === 'undefined') throw new Error('Element is outside UserProvider')

    return { user, setUser }
}