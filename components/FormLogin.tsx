import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useEffect, useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { API_URLS, COLORS } from "../consts"
import * as Device from 'expo-device';
import { useUserContext } from "../contexts/UserContext"
import { styles } from "../styles"
import { Data, NavigationProps, User } from "../types"
import Logo from "./svg/Logo"

const FormLogin = () =>{
    const [formData, setFormData] = useState<User>({} as User)
    const [err, setErr] = useState('')
    const { setUser } = useUserContext()

    const navigation = useNavigation<NavigationProps>()

    const IfError = () => 
        err.length > 0 
            ? <View style={styles.loginError}><Text style={styles.loginErrorText}>{err}</Text></View> 
            : <></>

    const handleSubmit = async () =>{
        try {
            const reqFormData = {
                ...formData,
                device: String(Device.osInternalBuildId)
            }
            const { data, status, message } = (await axios.post<Data<User>>(API_URLS.Login, reqFormData)).data

            if(status === 'succes') {
                setErr('')
                setUser(data)
                navigation.navigate('Ogłoszenia', {})
            } else {
                setErr(message)
            }
        } catch(err: any) {
            setErr(err.message)
        }
    }

    return (
        <View style={styles.loginView}>
            <View style={styles.loginLogoView}>
                <Logo scale={3}/>
                <Text style={styles.loginLogoText}> Zaloguj się do <Text style={{ color: COLORS.purple }}>Polkowic</Text>!</Text>
            </View>
            <View style={styles.login}>
                <TextInput
                    style={styles.loginInpt}
                    placeholder="Email"
                    textContentType="emailAddress"
                    placeholderTextColor={COLORS.white}
                    onChangeText={email => setFormData((prevState) => ({...prevState, email}))}
                />
                <TextInput
                    style={styles.loginInpt}
                    secureTextEntry={true}
                    placeholderTextColor={COLORS.white}
                    placeholder='Password'
                    textContentType="password"
                    onChangeText={password => setFormData((prevState) => ({...prevState, password}))}
                />
                <View style={styles.loginRegisterTexts}>
                    <Text style={{ fontSize: 14, color: COLORS.white }}> Jeżeli nie masz jeszcze konta</Text>
                    <Pressable onPress={() => navigation.navigate('Zarejestruj', {})}>
                        <Text style={{ fontSize: 16, color: COLORS.purple }}> Zarejestruj się </Text>
                    </Pressable>
                </View>
                <Pressable
                    style={styles.loginBtn}
                    onPress={handleSubmit}    
                >
                    <Text style={{ color: COLORS.white}}> Zaloguj </Text>
                </Pressable>
            </View>
            {IfError()}
        </View>
    )
}

export default FormLogin