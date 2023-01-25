import { Image, ImageStyle, StyleProp } from "react-native"
import { useEffect, useState } from "react"
import { COLORS } from "../consts"
import { styles } from "../styles"

const ProfileImage = ({ style, data, loading } : { style: {}, data: string, loading: boolean }) =>{
    const [userImage, setUserImage] = useState('')
    const defaultUri = require('../assets/user-icon.png')
    const userImageUri = `data:image/jpg;base64,${userImage}`

    const ifData = (data !== undefined || data === '')
    const ifDataStyle: StyleProp<ImageStyle> = ifData ? {} : { borderWidth: 0.25, borderColor: COLORS.white }

    useEffect(() =>{
        setUserImage(data)
    }, [data])

    
    return (
        <Image
            source={ !loading && ifData ? { uri: userImageUri } : defaultUri} 
            style={{...styles.profileImage, ...ifDataStyle, ...style}} 
        />
    )
}

export default ProfileImage