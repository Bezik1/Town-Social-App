import { Animated, Text, View, Pressable, Easing } from "react-native"
import { styles } from "../styles";
import { API_URLS, COLORS, SCREENS_NAMES } from "../consts";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useDimensions } from "../hooks/useDimensions";
import { useNavbarSelectContext } from "../contexts/NavbarSelectContext";
import { useEffect, useRef } from "react";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";

const NavbarHeader = ({ navigation } : NativeStackHeaderProps) =>{
    const { user, setUser } = useUserContext()
    const { selected, setSelected } = useNavbarSelectContext()
    const { width, height } = useDimensions('SCREEN')

    const scaleYAnim = useRef(new Animated.Value(0)).current

    const mapScreensNames = () =>{
        const handleClick = (screenName: string) =>{
            navigation.navigate(screenName)
            setSelected(false)
        }

        const handleLogout = async () =>{
            setUser(undefined)
            setSelected(false)
            navigation.navigate('Login', {})
            await axios.post(`${API_URLS.Logout}/${user?._id}`)
        }

        return SCREENS_NAMES.map(screenName =>{
            if(user && screenName === 'Login') return (
                <Pressable
                    key={'Logout'}
                    onPress={handleLogout}
                >
                    <Text key='LogoutText' style={styles.navbarHeaderBtn}> Logout </Text>
                </Pressable>
            )
            else if(user && screenName === 'Register') return <></>
            else if(!user && (screenName === 'Register' || screenName === 'Login')) return (
                <Pressable
                    key={screenName}
                    onPress={() => handleClick(screenName)}
                >
                    <Text key={`${screenName}Text`} style={styles.navbarHeaderBtn}> {screenName} </Text>
                </Pressable>
            )
            else if(user) {
                return (
                    <Pressable
                        key={screenName}
                        onPress={() => handleClick(screenName)}
                    >
                        <Text key={`${screenName}Text`}  style={styles.navbarHeaderBtn}> {screenName} </Text>
                    </Pressable>
                )
            } else return null
        })
    }

    useEffect(() =>{
        const animation = Animated.timing(
            scaleYAnim, {
                useNativeDriver: false,
                easing: Easing.ease,
                toValue: height,
                duration: 400,
            }
        )

        selected && animation.start()
        !selected && animation.reset()
    }, [selected])

    return (
        <Animated.View   
            key='AnimatedHeaderView'          
            style={{
                zIndex: 2,
                width: width,
                height: scaleYAnim,
                display: selected ? "flex" : 'none',
                backgroundColor: COLORS.purple
            }}
        >
            {
            selected && <View key="NavbarView" style={styles.navbarBtns}>
                {mapScreensNames()}
            </View>
            }
        </Animated.View>
    )
}

export default NavbarHeader