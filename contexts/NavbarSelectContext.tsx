import { createContext, useContext, useState } from "react";
import { NavbarSelectContextType, ParentProps } from "../types";

const NavbarSelectContext = createContext<NavbarSelectContextType>({
    selected: false,
    setSelected: undefined
})

export const NavbarSelectProvider = ({ children } : ParentProps) =>{
    const [selected, setSelected] = useState(false)

    return (
        <NavbarSelectContext.Provider value={{selected, setSelected}}>
            { children }
        </NavbarSelectContext.Provider>
    )
}

export const useNavbarSelectContext = () =>{
    const { selected, setSelected } = useContext(NavbarSelectContext)

    if(typeof setSelected === 'undefined') throw new Error('Element is outside NavbarSelectProvider Provider')

    return { selected, setSelected }
}