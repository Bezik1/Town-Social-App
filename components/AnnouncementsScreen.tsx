import { ScrollView, Text, View } from "react-native"
import { RouteProp } from '@react-navigation/native'
import { basicContainerStyles, flexCenterStyles, styles } from "../styles"
import { API_URLS, COLORS } from "../consts"
import { AnnouncementsScreenRouteProps, Comment, HeartConfigType } from "../types"
import BackSvg from "./svg/Back"
import CreateComment from "./CreateComment"
import CommentComponent from "./Comment"
import { useEffect, useState } from "react"
import ProfileImage from "./ProfileImage"
import { useFetch } from "../hooks/useFetch"
import { useUserContext } from "../contexts/UserContext"
import HeartSvg from "./svg/HeartSvg"

const AnnouncementsScreen = ({ route } : { route: RouteProp<AnnouncementsScreenRouteProps> }) =>{
    const [visibleComments, setVisibleComments] = useState<Comment[]>([])
    const { author, comments, content, date, likes, _id } = route.params.announcment
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${author}`)
    const { user } = useUserContext()

    const heartConfig: HeartConfigType = {
        reqObject: {
            username: String(user?.username), 
        },
        likeUrl: `${API_URLS.LikeAnnouncments}/${_id}`,
        disLikeUrl: `${API_URLS.DisLikeAnnouncments}/${_id}`,
        likes: likes || [],
        style: { marginLeft: 10, width: 40, ...flexCenterStyles }
    }

    useEffect(() =>{
        setVisibleComments(comments)
    }, [])

    const dateString = `${date.day}.${date.month}.${date.year}`
    const commentsText = () =>{
        if(visibleComments.length === 1) return ' Komentarz'
        else if(visibleComments.length === 0 || visibleComments.length > 4) return ' Komentarzy'
        else return ' Komentarze'
    }

    return (
        <View style={{ ...basicContainerStyles, paddingBottom: '20%' }}>
            <ScrollView key={_id} style={styles.announcment}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                    <ProfileImage style={{ width: 40, height: 40 }} data={data} loading={loading} />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ color: COLORS.purple }}>{author}</Text>
                        <Text style={{ color: COLORS.white }}>{dateString}</Text>
                    </View>
                </View>
                <View style={{ marginLeft: '2%', width: '95%', paddingBottom: '15%', marginTop: 10 }}>
                    <Text style={{ color: COLORS.white, fontSize: 18 }}>{content}</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <HeartSvg config={heartConfig} />
                    <View style={{ position: 'absolute', right: 20, top: 20, opacity: 0.75 }}>
                        <Text style={{ color: COLORS.white, textAlign: 'center', width: 100 }}>
                            {visibleComments.length + 
                             visibleComments.reduce((amount, object) => amount + Number(object.responses?.length), 0)
                            }
                            {commentsText()}
                        </Text>
                    </View>
                </View>
                <View style={flexCenterStyles}>
                    <CreateComment id={_id} setVisibleComments={setVisibleComments}/>
                </View>
                <View style={{ paddingBottom: 40, display: 'flex', alignItems: 'flex-start'}}>
                        {visibleComments.map((comment, i) => <CommentComponent 
                                                                id={_id}
                                                                key={i}
                                                                index={i} 
                                                                comment={comment} 
                                                                setVisibleComments={setVisibleComments} 
                                                            />)}
                </View>
            </ScrollView>
            <BackSvg />
        </View>
    )
}

export default AnnouncementsScreen