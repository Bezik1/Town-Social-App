import { Image, ImageStyle, StyleProp } from "react-native"
import { useEffect, useState } from "react"
import { COLORS } from "../consts"
import { styles } from "../styles"
import { ProfilImageProps } from "../types"

const ProfileImage = ({ style, data, loading, dynamicImage } : ProfilImageProps) =>{
    const defaultUri: {uri: string} = require('../assets/user-icon.png')
    const [source, setSource] = useState<{uri: string}>(defaultUri)
    const [userImage, setUserImage] = useState('')
    const userImageUri = `data:image/jpg;base64,${userImage}`

    const ifData = (data !== undefined || data === '')
    const ifDataStyle: StyleProp<ImageStyle> = ifData ? {} : { borderWidth: 0.25, borderColor: COLORS.white }

    useEffect(() => setUserImage(data), [data])
    useEffect(() => (!loading && ifData) ? setSource({ uri: userImageUri }) : undefined, [loading])
    useEffect(() => dynamicImage ? setSource({ uri: dynamicImage }) : undefined, [dynamicImage])
    
    return (
        <Image
            source={loading ? require('../assets/user-icon.png') : source} 
            style={{...styles.profileImage, ...ifDataStyle, ...style}} 
        />
    )
}

export default ProfileImage