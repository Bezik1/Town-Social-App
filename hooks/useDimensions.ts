import { useEffect, useState } from "react"
import { DimensionParameter, ScreenDimensions } from "../types"
import { Dimensions, ScaledSize } from "react-native"

export const useDimensions = (dimensionParameter: DimensionParameter) =>{
    const defaultWindow = Dimensions.get('window')
    const defaultScreen = Dimensions.get('screen')
    
    const[dimensions, setDimensions] = useState<ScreenDimensions>({
        width: 0,
        height: 0
    })

    const setDimensioWithParameter = (window: ScaledSize, screen: ScaledSize) =>{
        switch(dimensionParameter) {
            case 'WINDOW':
                setDimensions({ 
                    width: window.width, 
                    height: window.height 
                })
            case 'SCREEN':
                setDimensions({ 
                    width: screen.width, 
                    height: screen.height 
                })
        }
    }

    useEffect(() => setDimensioWithParameter(defaultWindow, defaultScreen), [])

    useEffect(() =>{
        const subscription = Dimensions.addEventListener('change', ({ window, screen }) => 
            setDimensioWithParameter(window, screen))

        return () => subscription?.remove();
    }, [])

    return dimensions
}