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
    const [responsesVisiblity, setresponsesVisiblity] = useState(false)
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${comment.author}`)
    const { data: userPhoto, loading: userPhotoLoading } = useFetch<string>(`${API_URLS.GetPhoto}/${user?.username}`)
    const [reply, setReply] = useState(false)
    const { setReload } = useReloadContext()

    const responsesAmmount = responses?.length ? responses?.length : 0

    const responsesText = () =>{
        if(responsesAmmount === 1) return ' Komentarz'
        else if(responsesAmmount === 0 || responsesAmmount > 4) return ' Komentarzy'
        else return ' Komentarze'
    }

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
        style: { marginLeft: 5, marginTop: 20, width: 40, ...flexCenterStyles }
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
                <TrashSvg style={{ marginTop: '75%' }} />
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
                <Pressable 
                    onPress={() => setReply(!reply)} 
                    style={{ 
                        marginTop: 5, 
                        position: 'absolute', 
                        right: '6%', 
                        top: '7%'
                    }}>
                        <ReplySvg style={{ width: 30, height: 30 }} />
                    </Pressable>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <HeartSvg config={heartConfig} />
                    {ifAuthor()}
                    <Pressable 
                        style={{ position: 'absolute', right: '5%', bottom: '20%', opacity: 0.75 }}
                        onPress={() =>setresponsesVisiblity(!responsesVisiblity)}
                    >
                        <Text style={{ color: COLORS.white, textAlign: 'center', width: 100 }}>
                            {responsesAmmount}
                            {responsesText()}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.announcementCommentResponsesView}>
                {reply && <CreateResponseComment
                            responses={responses}
                            data={userPhoto}
                            loading={userPhotoLoading}
                            setReply={setReply} 
                            setResponses={setResponses} 
                            _id={id} 
                            index={index} 
                          />
                }
                {responsesVisiblity && responses?.map((response, i) => <CommentResponse
                                                            id={id}
                                                            lastIndex={responses.length-1}
                                                            key={`responseComment/${i}`}
                                                            setResponses={setResponses}
                                                            comment={response}
                                                            resIndex={i}
                                                            index={index}
                                                        />)}
            </View>
        </>
    )
}

export default CommentComponent