import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useState } from "react"
import { Text, Pressable, TextInput, View } from "react-native"
import { API_URLS, COLORS } from "../consts"
import { styles } from "../styles"
import { Data, NavigationProps, User } from "../types"
import Logo from "./svg/Logo"

const RegisterForm = () =>{
    const [formData, setFormData] = useState<User>({} as User)
    const [err, setErr] = useState('')

    const navigation = useNavigation<NavigationProps>()

    const IfError = () => 
        err.length > 0 
            ? <View style={styles.loginError}><Text style={styles.loginErrorText}>{err}</Text></View> 
            : <></>

    const handleSubmit = async () =>{
        try {
            const { data, status, message } = (await axios.post<Data<User>>(API_URLS.CreateUser, formData)).data
            console.log(message)
            if(status === 'succes') {
                setErr('')
                navigation.navigate('Login', {})
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
                <Logo scale={3} color={COLORS.lightViolet}/>
                <Text 
                    style={{ fontSize: 18, color: COLORS.white }}
                > 
                    Zarejestruj się do <Text style={{ color: COLORS.purple }}>Polkowic</Text>!
                </Text>
            </View>
            <View style={{...styles.login, marginTop: 20}}>
                <TextInput
                    style={styles.loginInpt}
                    placeholder="Username"
                    textContentType="username"
                    placeholderTextColor={COLORS.white}
                    onChangeText={username => setFormData((prevState) => ({...prevState, username}))}
                />
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
                    <Text style={{ fontSize: 14, color: COLORS.white }}> Jeżeli masz już konto</Text>
                    <Pressable onPress={() => navigation.navigate('Login', {})}>
                        <Text style={{ fontSize: 16, color: COLORS.purple }}> Zaloguj się </Text>
                    </Pressable>
                </View>
                <Pressable
                    style={styles.loginBtn}
                    onPress={handleSubmit}    
                >
                    <Text style={{ color: COLORS.white}}> Zarejestruj się </Text>
                </Pressable>
            </View>
            {IfError()}
        </View>
    )
}

export default RegisterForm