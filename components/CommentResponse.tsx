import axios from "axios"
import { Pressable, Text, View } from "react-native"
import { API_URLS, COLORS } from "../consts"
import { useReloadContext } from "../contexts/ReloadContext"
import { useUserContext } from "../contexts/UserContext"
import { useFetch } from "../hooks/useFetch"
import { flexCenterStyles, styles } from "../styles"
import { Comment, HeartConfigType } from "../types"
import ProfileImage from "./ProfileImage"
import HeartSvg from "./svg/HeartSvg"
import TrashSvg from "./svg/Trash"

const CommentResponse = ({ id, comment, resIndex, index } : { id: string, comment: Comment, resIndex: number, index: number }) =>{
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${comment.author}`)
    const { user } = useUserContext()
    const { setReload } = useReloadContext()

    const heartConfig: HeartConfigType = {
        reqObject: {
            username: String(user?.username), 
            index,
            _id: id,
            resIndex,
        },
        likeUrl: API_URLS.LikeResponse,
        disLikeUrl: API_URLS.DisLikeResponse,
        likes: comment.likes || [],
        style: {  width: 40, ...flexCenterStyles }
    }

    const handleRemove = async () =>{
        try {
            await axios.post(API_URLS.DeleteResponse, { _id: id, resIndex, index })
            setReload((reload) => !reload)
        } catch(err) {
            console.log(err)
        }
    }

    const ifAuthor = () =>{
        if(String(user?.username) === comment.author) return (
            <Pressable
                onPress={handleRemove} 
                style={{ width: 30, height: 30}}
            >
                <TrashSvg />
            </Pressable>
        )
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.announcementCommentResponseLine} />
            <View style={styles.announcementCommentResponse}>
                <View style={{ display: "flex",flexDirection: 'row'}}>
                    <ProfileImage 
                        style={{ 
                            width: 40,
                                height: 40, 
                                margin: 5, 
                                marginRight: 2 
                        }} 
                        data={data} 
                        loading={loading} 
                    />
                    <Text 
                    style={{ 
                        color: COLORS.purple, 
                        marginLeft: 5, 
                        marginBottom: 5, 
                        marginTop: 15 
                    }}>
                        {comment.author}
                    </Text>
                </View>
                <View>
                    <Text style={{ color: COLORS.white, marginTop: 10, marginLeft: 10 }}>{comment.content}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', position: 'absolute', right: 20, bottom: '20%' }}>
                    {ifAuthor()}
                    <HeartSvg config={heartConfig} />
                </View>
            </View>
        </View>
    )
}

export default CommentResponse