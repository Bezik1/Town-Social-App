import axios from "axios"
import { Pressable, View } from "react-native"
import { Text } from "react-native-elements"
import { API_URLS, COLORS } from "../consts"
import { useReloadContext } from "../contexts/ReloadContext"
import { useUserContext } from "../contexts/UserContext"
import { styles } from "../styles"
import { CommentComponentProps } from "../types"
import ProfileImage from "./ProfileImage"
import TrashSvg from "./svg/Trash"

const CommentComponent = ({ comment, id,setVisibleComments } : CommentComponentProps) =>{
    const { user } = useUserContext()
    const { setReload } = useReloadContext()

    const handleRemove = async () =>{
        try {
            await axios.post(`${API_URLS.RemoveCommentToAnnouncments}/${id}`, comment)
            setVisibleComments((prevComments) => prevComments.filter(prevComment => prevComment !== comment))
            setReload((reload) => !reload)
        } catch(err) {
            console.log(err)
        }
    }

    const ifAuthor = () =>{
        if(String(user?.username) === comment.author) return (
            <Pressable
                onPress={handleRemove} 
                style={{ width: 30, height: 30, position: 'absolute', right: 20, top: 30 }}
            >
                <TrashSvg />
            </Pressable>
        )
    }

    return (
        <View key={id} style={styles.announcementComment}>
            <ProfileImage style={{ width: 40, height: 40, margin: 5, marginRight: 2 }} />
            <View>
                <Text style={{ color: COLORS.purple, marginLeft: 5, marginBottom: 5, marginTop: 15 }}>{comment.author}</Text>
                <Text style={{ color: COLORS.white, marginTop: 5 }}>{comment.content}</Text>
            </View>
            {ifAuthor()}
        </View>
    )
}

export default CommentComponent