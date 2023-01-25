import axios from "axios"
import { useState } from "react"
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
    const [clicked, click] = useState(false)
    const [content, setContent] = useState('')

    const { user } = useUserContext()
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${user?.username}`)

    const handleSubmit = async () =>{
        const currentDate = new Date()

        const announcment: CreateAnnouncmentInterface = {
            author: String(user?.username),
            content,
            rang: Rang.Casual,
            date: {
                hour: currentDate.getHours(),
                day: currentDate.getDate(),
                month: currentDate.getUTCMonth()+1,
                year: currentDate.getFullYear()
            }
        }

        try {
            const { status } = await axios.post(API_URLS.CreateAnnouncment, announcment)

            if(status === 201) {
                setReload((reload) => !reload)
                click(false)
                setContent('')
            } else if(content.length < 10) console.log('Too short contentt') 
              else console.log('Error')
        } catch(err) {
            console.log(err)
        }
    }

    const ifClicked = () =>{
        if(clicked) return (
            <View style={{ width: '100%' }}>
                <TextInput 
                    placeholderTextColor={COLORS.white} 
                    placeholder="Co słychać?" 
                    style={styles.createAnnouncementInput}
                    onChangeText={text => setContent(text)}
                />
            </View>
        )
        else return (
            <Pressable 
                style={{ position: 'absolute', top: 15, left: 50 }}
                onPress={() => click(true)}
            >
                <Text style={{ color: COLORS.white }}> Napisz 
                    <Text> ogłoszenie</Text>!
                </Text>
            </Pressable>
        )
    }

    return (
        <View style={clicked ? { ...styles.createAnnouncement, height: 125 } : styles.createAnnouncement}>
            <Pressable onPress={()=> click(!clicked)} style={{ width: 60, height: 50 }}>
            <ProfileImage style={{ width: 40, height: 40, margin: 5, marginRight: 2 }} data={data} loading={loading} />
            </Pressable>
            {clicked && <Pressable onPress={handleSubmit} style={{ width: 40, height: 40, position: 'absolute', top: 70, left: 10 }}>
                <CheckedSvg />
            </Pressable>
            }
            {ifClicked()}
        </View>
    )
}

export default CreateAnnouncment