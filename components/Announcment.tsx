import { useNavigation } from "@react-navigation/native"
import { Pressable, View } from "react-native"
import { Text } from "react-native-elements"
import { API_URLS, COLORS } from "../consts"
import { useFetch } from "../hooks/useFetch"
import { styles } from "../styles"
import { AnnouncmentComponentProps, NavigationProps } from "../types"
import ProfileImage from "./ProfileImage"
import HeartSvg from "./svg/Heart"

const AnnouncmentComponent = ({ announcment } : AnnouncmentComponentProps) =>{
    const {  author, comments, content, date, likes, _id} = announcment
    const navigation = useNavigation<NavigationProps>()
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${announcment.author}`)

    const dateString = `${date.day}.${date.month}.${date.year}`
    const commentsText = () =>{
        if(comments.length === 1) return 'Komentarz'
        else if(comments.length === 0 || comments.length > 4) return 'Komentarzy'
        else return 'Komentarze'
    }

    const handleCommentPress = () =>{
        navigation.navigate('AnnouncementsScreen', {announcment})
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
            <HeartSvg id={String(_id)} likes={likes} />
            <Pressable 
                style={{ position: 'absolute', right: 20, bottom: '15%', opacity: 0.75 }}
                onPress={handleCommentPress}
            >
                <Text style={{ color: COLORS.white, textAlign: 'center', width: 100 }}>
                    {comments.length} {commentsText()}
                </Text>
            </Pressable>
        </View>
    )
}

export default AnnouncmentComponent