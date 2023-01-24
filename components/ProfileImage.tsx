import axios from "axios"
import { Image, ImageStyle, StyleProp } from "react-native"
import { useEffect, useState } from "react"
import { API_URLS } from "../consts"
import { useUserContext } from "../contexts/UserContext"
import { Data } from "../types"
import { styles } from "../styles"
import { useFetch } from "../hooks/useFetch"

const ProfileImage = ({ style, changedUri } : { style: {}, changedUri?: string }) =>{
    const [userImage, setUserImage] = useState('')
    const [defaultUri, setDefaultUri] = useState({ uri: '' })
    const userImageUri = `data:image/jpg;base64,${userImage}`
    const { user } = useUserContext()
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${user?._id}`)

    useEffect(() =>{
        setUserImage(data)
    }, [data])

    useEffect(() =>{
        if(changedUri) {
            setDefaultUri({ uri: changedUri })
        } else {
            setDefaultUri(require('../assets/user-icon.png'))
        }
    }, [changedUri])

    return (
        <Image
            source={ loading ? defaultUri : { uri: userImageUri }} 
            style={{...styles.profileImage, ...style}} 
        />
    )
}

export default ProfileImage