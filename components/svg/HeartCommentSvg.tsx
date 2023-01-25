import axios from "axios"
import { useEffect, useState } from "react"
import { Pressable, Text } from "react-native"
import Svg, { Path } from "react-native-svg"
import { API_URLS, COLORS } from "../../consts"
import { useUserContext } from "../../contexts/UserContext"
import { flexCenterStyles } from "../../styles"

const HeartCommentSvg = ({ id, index, likes } : { id: string, index: number, likes: string[] }) =>{
    const [clicked, click] = useState(false)
    const [active, setActive] = useState(false)
    const { user } = useUserContext()
    const ifUserLiked = likes.includes(String(user?.username))

    const handleClick = () =>{
        click(true)
        setActive(!active)
    }

    useEffect(() =>{
        const searchUserLiked = () => ifUserLiked ? setActive(true) : setActive(false)

        searchUserLiked()
    }, [])

    useEffect(() =>{
        const checkIfUserClicked = async () =>{
            if(active && clicked) {
                await axios.post(API_URLS.LikeComment, { _id: id, username: String(user?.username), index })
            } else if(!active && clicked) {
                await axios.post(API_URLS.DisLikeComment, { _id: id, username: String(user?.username), index })
            }
        }

        checkIfUserClicked()
    }, [active])

    const likesNumber = () =>{
        if(ifUserLiked && active) return likes.length
        else if(ifUserLiked && !active) return likes.length - 1
        else if(!ifUserLiked && active) return likes.length + 1
        else if(!ifUserLiked && !active) return likes.length
    }

    return (
    <Pressable 
        style={{ 
            marginLeft: 10, 
            width: 40, 
            ...flexCenterStyles, 
            position: 'absolute', 
            right: '15%',
            bottom: '30%' 
        }} 
        onPress={handleClick}
    >
        <Svg
            viewBox="0 0 512 512"
            style={{ width: 30, height: 30 }}
        >
            <Path
            d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
            fill={active ? COLORS.white : 'none'}
            stroke={COLORS.white}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            />
        </Svg>
        <Text style={{ color: COLORS.white, textAlign: 'center', width: 30 }}>{likesNumber()}</Text>
     </Pressable>
    )
}

export default HeartCommentSvg