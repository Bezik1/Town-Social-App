import axios from "axios"
import { useEffect, useState } from "react"
import { Pressable, TextInput, View } from "react-native"
import { Text } from "react-native-elements"
import { API_URLS, COLORS, Rang } from "../consts"
import { useUserContext } from "../contexts/UserContext"
import { useFetch } from "../hooks/useFetch"
import { styles } from "../styles"
import { CreateAnnouncmentInterface } from "../types"
import ProfileImage from "./ProfileImage"
import CheckedSvg from "./svg/Checked"

const CreateAnnouncment = ({ setReload } : { setReload: React.Dispatch<React.SetStateAction<boolean>> }) =>{
    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    const currentDate = new Date()
    const date = {
        hour: currentDate.getHours(),
        day: currentDate.getDate(),
        month: currentDate.getUTCMonth()+1,
        year: currentDate.getFullYear()
    }

    const { user } = useUserContext()
    const dateString = `${date.day}.${date.month}.${date.year}`
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${user?.username}`)

    const handleSubmit = async () =>{

        const announcment: CreateAnnouncmentInterface = {
            author: String(user?.username),
            content,
            rang: Rang.Casual,
            date
        }

        try {
            if(content.length < 10) setError('Ogłoszenie musi zawierać, co najmneij 10 znaków')
            else {
                const { status } = await axios.post(API_URLS.CreateAnnouncment, announcment)

                if(status === 201) {
                    setReload((reload) => !reload)
                    setContent('')
                }
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.createAnnouncement}>
            <View style={{ display: 'flex', flexDirection: 'row', width: 60, height: 50 }}>
                <ProfileImage style={{ width: 40, height: 40, margin: 5, marginRight: 2 }} data={data} loading={loading} />
                <View style={{ width: 200, marginTop: 10, marginLeft: 5 }}>
                    <Text style={{ color: COLORS.purple }}>{user?.username}</Text>
                    <Text style={{ color: COLORS.white }}>{dateString}</Text>
                </View>
            </View>
            <View style={{ width: '100%' }}>
                <TextInput 
                    placeholderTextColor={COLORS.white} 
                    placeholder="Co słychać?" 
                    style={styles.createAnnouncementInput}
                    value={content}
                    onChangeText={text => setContent(text)}
                />
            </View>
            <Pressable onPress={handleSubmit} style={{ width: 50, height: 50, position: 'absolute', bottom: 20, right: 20 }}>
                <CheckedSvg />
            </Pressable>
        </View>
    )
}

export default CreateAnnouncment