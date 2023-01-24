import { createContext, useContext, useState } from "react";
import { ParentProps } from "../types";

const ReloadContext = createContext<{ reload: boolean, setReload: React.Dispatch<React.SetStateAction<boolean>> | undefined}>({
    reload: false,
    setReload: undefined
})

export const ReloadProvider = ({ children } : ParentProps) =>{
    const [reload, setReload] = useState(false)

    return (
        <ReloadContext.Provider value={{reload, setReload}}>
            { children }
        </ReloadContext.Provider>
    )
}

export const useReloadContext = () =>{
    const { reload, setReload } = useContext(ReloadContext)

    if(typeof setReload === 'undefined') throw new Error('Element is outside NavbarSelectProvider Provider')

    return { reload, setReload }
}