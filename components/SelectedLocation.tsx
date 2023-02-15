import { useEffect, useState } from "react"
import { Animated, Pressable, View, Text } from "react-native"
import { API_URLS, COLORS } from "../consts"
import { useFetch } from "../hooks/useFetch"
import { styles } from "../styles"
import { CoordinateInterface } from "../types"
import ProfileImage from "./ProfileImage"

const SelectedLocation = ({ location } : { location: CoordinateInterface }) =>{
    const [width] = useState(new Animated.Value(0))
    const [height] = useState(new Animated.Value(0))
    const [rotate] = useState(new Animated.Value(0))
    const [expanded, setExpanded] = useState(false)
    const [reload, setReload] = useState(false)
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${location.author}`, undefined, reload)

    const handlePress = () =>{
        setReload((reload) => !reload)
        setExpanded(!expanded)
    }

    useEffect(() => {
        Animated.timing(height, {
            toValue: !expanded ? 400 : 50,
            duration: 250,
            useNativeDriver: false
            }).start()

        Animated.timing(width, {
            toValue: !expanded ? 300 : 65,
            duration: 250,
            useNativeDriver: false
        }).start()

        Animated.timing(rotate, {
            toValue: expanded ? 0 : 1,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [expanded, width])

    const rotateInterpolate = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      });

    return (
        <Animated.View 
            style={{
                height, 
                width,
                padding: expanded ? 30 : 0,
                borderRadius: expanded ? 100 : 0,
                margin: expanded ? 5 : 0,
                ...styles.selectedLocation
            }}>
            {!expanded && <View style={{ width: '75%', height: '100%' }}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                    <ProfileImage 
                        style={{ width: 40, height: 40 }}
                        data={data} 
                        loading={loading} 
                    />
                    <Text style={{ color: COLORS.purple, marginLeft: 5, marginTop: 10 }}>{location.author}</Text>
                </View>
                <Text style={{ marginTop: '10%', marginLeft: '5%', fontSize: 18, color: COLORS.purple }}>
                    {location.title}
                </Text>
                <Text style={{ marginTop: '15%', marginLeft: '5%', color: COLORS.white }}>
                    {location.description}
                </Text>
            </View>
            }
            <Pressable 
                style={{ marginLeft: expanded ? -20 : 0 }} 
                onPress={handlePress}
            >
                <Animated.Image
                    style={{ width: 50, height: 50, transform: [{ rotate: rotateInterpolate }] }}
                    source={require('../assets/arrow-right-map.png')} 
                />
            </Pressable>
        </Animated.View>
    )
}

export default SelectedLocation