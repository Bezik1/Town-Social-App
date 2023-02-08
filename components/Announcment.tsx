import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { Pressable, View } from "react-native"
import { Text } from "react-native-elements"
import { ANNOUNCMENTS_URL, API_URLS, COLORS } from "../consts"
import { useReloadContext } from "../contexts/ReloadContext"
import { useUserContext } from "../contexts/UserContext"
import { useFetch } from "../hooks/useFetch"
import { flexCenterStyles, styles } from "../styles"
import { AnnouncmentComponentProps, Comment, Data, HeartConfigType, NavigationProps } from "../types"
import ProfileImage from "./ProfileImage"
import HeartSvg from "./svg/HeartSvg"
import TrashSvg from "./svg/Trash"

const AnnouncmentComponent = ({ announcment } : AnnouncmentComponentProps) =>{
    const { author, comments, content, date, likes, _id } = announcment
    const navigation = useNavigation<NavigationProps>()
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${announcment.author}`)
    const { user } = useUserContext()
    const { setReload } = useReloadContext()

    const commentsAmmount = comments.length + 
        comments.reduce((amount, object) => amount + Number(object.responses?.length), 0)

    const heartConfig: HeartConfigType = {
        reqObject: {
            username: String(user?.username), 
        },
        likeUrl: `${API_URLS.LikeAnnouncments}/${_id}`,
        disLikeUrl: `${API_URLS.DisLikeAnnouncments}/${_id}`,
        likes: likes || [],
        style: { marginLeft: 10, width: 40, ...flexCenterStyles }
    }

    const dateString = `${date.day}.${date.month}.${date.year}`
    
    const commentsText = () =>{
        if(commentsAmmount === 1) return ' Komentarz'
        else if(commentsAmmount === 0 || commentsAmmount > 4) return ' Komentarzy'
        else return ' Komentarze'
    }

    const Trash = () =>{
        const handleDelete = async () =>{
            const { status }: Data<any> = (await axios.delete(`${ANNOUNCMENTS_URL}/${_id}`)).data
            status === 'succes' && setReload((reload) => !reload)
        }

        return (
        <Pressable onPress={handleDelete}>
            <TrashSvg style={{ width: 40, height: 40 }}/>
        </Pressable>
        )
    }

    const handleCommentPress = () =>{
        navigation.navigate('AnnouncementsScreen', {announcment, data})
    }

    return (
        <View key={_id} style={styles.announcment}>
            <View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                <ProfileImage style={{ width: 40, height: 40 }} data={data} loading={loading} />
                <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: COLORS.purple }}>{author}</Text>
                    <Text style={{ color: COLORS.white }}>{dateString}</Text>
                </View>
            </View>
            <View style={{ marginLeft: '2%', width: '95%', paddingBottom: '10%', marginTop: 10 }}>
                <Text style={{ color: COLORS.white, fontSize: 18 }}>{content}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <HeartSvg config={heartConfig} />
                { user?.username === author && Trash() }
            </View>
            <Pressable 
                style={{ position: 'absolute', right: 20, bottom: '15%', opacity: 0.75 }}
                onPress={handleCommentPress}
            >
                <Text style={{ color: COLORS.white, textAlign: 'center', width: 100 }}>
                    {commentsAmmount}
                    {commentsText()}
                </Text>
            </Pressable>
        </View>
    )
}

export default AnnouncmentComponent