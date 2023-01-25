import { Pressable, View } from "react-native"
import { useUserContext } from "../contexts/UserContext"
import * as ImagePicker from 'expo-image-picker';
import { basicContainerStyles, flexCenterStyles, styles } from "../styles"
import { Text, Image } from "react-native";
import { useEffect, useState } from "react";
import PhotoSvg from "./svg/Photo";
import { API_URLS, COLORS } from "../consts";
import { useReloadContext } from "../contexts/ReloadContext";
import axios from "axios";
import { Data } from "../types";
import ProfileImage from "./ProfileImage";
import BackSvg from "./svg/Back";
import { useFetch } from "../hooks/useFetch";

const OptionsComponent = () =>{
    const [file, setFile] = useState('')
    const { setReload } = useReloadContext()
    const { user } = useUserContext()
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${user?.username}`)

    const addImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            //mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            //quality: 1,
        });

        if(image.assets && !image.canceled) {
            setFile(String(image.assets[0].uri))
            console.log(file)
        }
    }

    const handleSubmit = async () =>{
        try {
            const uriParts = file.split('.');
            const fileType = uriParts[uriParts.length - 1];

            const photoData = new FormData()
            photoData.append('photo', {
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
                uri: file,
            })
            const { data }: Data<{ data: string }> = (await axios.post(`${API_URLS.AddPhoto}`, photoData)).data
            await axios.post(`${API_URLS.ChangePhoto}/${user?._id}`, { path: data })

            setReload(true)
        } catch (error) {
            console.log(error)
          }
    }

    return (
        <View style={basicContainerStyles}>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View style={{margin: 10, marginTop: 40, width: 150, height: 150, ...flexCenterStyles }}>
                    <ProfileImage 
                        style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: '#fff'}} 
                        data={data} 
                        loading={loading} 
                    />
                    <Pressable style={styles.addPhotoImage} onPress={addImage}>
                        <PhotoSvg />
                    </Pressable>
                    <Text style={{ color: COLORS.purple, marginTop: 10, fontSize: 20 }}>{user?.username} </Text>
                </View>
                <Pressable
                    onPress={handleSubmit} 
                    style={{ marginTop: 20, marginLeft: 20, borderRadius: 100, backgroundColor: COLORS.purple, width: '30%', padding: 10 }}
                >
                    <Text style={{ color: COLORS.white, textAlign: 'center' }}> Zapisz zdjęcie </Text>
                </Pressable>
                <View style={{ marginTop: 50, marginLeft: 20 }}>
                    <Text style={{ color: COLORS.white, fontSize: 18 }}>
                        Email: <Text style={{ color: COLORS.purple }}>{user?.email} </Text>
                    </Text>
                </View>
            </View>
            <BackSvg />
        </View>
    )
}

export default OptionsComponent