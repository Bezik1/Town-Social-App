import axios from "axios"
import { useEffect, useState } from "react"
import { Pressable, View } from "react-native"
import { Text } from "react-native-elements"
import { API_URLS, COLORS } from "../consts"
import { useReloadContext } from "../contexts/ReloadContext"
import { useUserContext } from "../contexts/UserContext"
import { useFetch } from "../hooks/useFetch"
import { flexCenterStyles, styles } from "../styles"
import { Comment, CommentComponentProps, HeartConfigType } from "../types"
import CommentResponse from "./CommentResponse"
import CreateResponseComment from "./CreateResponseComment"
import ProfileImage from "./ProfileImage"
import HeartSvg from "./svg/HeartSvg"
import ReplySvg from "./svg/Reply"
import TrashSvg from "./svg/Trash"

const CommentComponent = ({ comment, id, setVisibleComments, index } : CommentComponentProps) =>{
    const { user } = useUserContext()
    const [responses, setResponses] = useState<Comment[]>()
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${comment.author}`)
    const { data: userPhoto, loading: userPhotoLoading } = useFetch<string>(`${API_URLS.GetPhoto}/${user?.username}`)
    const [reply, setReply] = useState(false)
    const { setReload } = useReloadContext()

    useEffect(() => setResponses(comment.responses), [])

    const heartConfig: HeartConfigType = {
        reqObject: {
            username: String(user?.username), 
            index,
            _id: id,
        },
        likeUrl: API_URLS.LikeComment,
        disLikeUrl: API_URLS.DisLikeComment,
        likes: comment.likes || [],
        style: { marginLeft: 5, width: 40, ...flexCenterStyles }
    }

    const handleRemove = async () =>{
        try {
            await axios.post(`${API_URLS.RemoveCommentToAnnouncments}/${id}`, comment)
            setVisibleComments((prevComments) => prevComments.filter(prevComment => prevComment !== comment))
            setResponses((responses) => responses?.
                filter(response => response.content !== comment.content || response.author !== comment.author))
            setReload((reload) => !reload)
        } catch(err) {
            console.log(err)
        }
    }

    const ifAuthor = () =>{
        if(String(user?.username) === comment.author) return (
            <Pressable
                onPress={handleRemove} 
                style={{ width: 30, height: 30, marginRight: 10 }}
            >
                <TrashSvg />
            </Pressable>
        )
    }

    return (
        <>
            <View key={id} style={styles.announcementComment}>
                <View style={{ display: "flex",flexDirection: 'row'}}>
                    <ProfileImage style={{ width: 40, height: 40, margin: 5, marginRight: 2 }} data={data} loading={loading} />
                    <Text style={{ color: COLORS.purple, marginLeft: 5, marginBottom: 5, marginTop: 15 }}>{comment.author}</Text>
                </View>
                <View>
                    <Text style={{ color: COLORS.white, marginTop: 10, marginLeft: 10 }}>{comment.content}</Text>
                </View>
                <View style={{ position: 'absolute', bottom: '20%', right: '5%', display: 'flex', flexDirection: 'row' }}>
                    {ifAuthor()}
                    <Pressable onPress={() => setReply(!reply)}>
                        <ReplySvg style={{ width: 30, height: 30 }} />
                    </Pressable>
                    <HeartSvg config={heartConfig} />
                </View>
            </View>
            <View style={styles.announcementCommentResponsesView}>
                {reply && <CreateResponseComment
                            data={userPhoto}
                            loading={userPhotoLoading}
                            setReply={setReply} 
                            setResponses={setResponses} 
                            _id={id} 
                            index={index} 
                          />
                }
                {responses?.map((response, i) => <CommentResponse
                                                            id={id}
                                                            key={`responseComment/${i}`} 
                                                            comment={response}
                                                            resIndex={i}
                                                            index={index}
                                                        />)}
            </View>
        </>
    )
}

export default CommentComponent