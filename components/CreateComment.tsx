import axios from "axios"
import { useEffect, useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { API_URLS, COLORS } from "../consts"
import { useReloadContext } from "../contexts/ReloadContext"
import { useUserContext } from "../contexts/UserContext"
import { useFetch } from "../hooks/useFetch"
import { Comment, CreateCommentProps } from "../types"
import ProfileImage from "./ProfileImage"
import CheckedSvg from "./svg/Checked"

const CreateComment = ({ id , setVisibleComments} : CreateCommentProps) =>{
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const { user } = useUserContext()
    const { setReload } = useReloadContext()
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${user?.username}`)

    const handlePress = async () =>{
        try {
            if(content.length < 4) setError('Komentarz musi zawierać, co najmniej 4 znaki')
            else {
                const comment: Comment = {
                    author: String(user?.username),
                    content
                }
        
                await axios.post(`${API_URLS.AddCommentToAnnouncments}/${id}`, comment)
                setContent('')
                setVisibleComments((prevComments) => [...prevComments, comment])
                setReload((reload) => !reload)
            }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => console.log(error), [error])

    return (
        <View style={{ width: '95%', height: 150, backgroundColor: COLORS.gray, marginTop: 20, marginBottom: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <ProfileImage style={{ width: 40, height: 40, margin: 5 }} data={data} loading={loading} />
                <Text style={{ marginTop: 15, color: COLORS.purple }}>{user?.username}</Text>
            </View>
            <TextInput
                style={{ padding: 10, color: COLORS.white }}
                placeholderTextColor={COLORS.white}
                value={content}
                onChangeText={text => setContent(text)}
                placeholder="Dodaj komentarz..." 
            />
            <Pressable
                onPress={handlePress}
                style={{ width: 50, height: 50, position: 'absolute', right: 20, bottom: 20 }}
            >
                <CheckedSvg />
            </Pressable>
        </View>
    )
}

export default CreateComment