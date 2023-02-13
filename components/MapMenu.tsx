import { useEffect, useState } from "react"
import { Image, Pressable, View, Animated, TextInput } from "react-native"
import { Text } from "react-native-svg"
import { COLORS, CoordinateRole, mapMenuElements } from "../consts"
import { styles } from "../styles"
import { MapMenuProps } from "../types"
import CheckedSvg from "./svg/Checked"

const MapMenu = ({ role, setRole, setDescription, onSubmit, setTitle } : MapMenuProps) =>{
    const [height] = useState(new Animated.Value(0))
    const [expanded, setExpanded] = useState(true)

    useEffect(() => {
      Animated.timing(height, {
        toValue: !expanded ? 300 : 100,
        duration: 150,
        useNativeDriver: false
      }).start()
    }, [expanded, height])

    const handlePress = () =>{
        onSubmit()
        setExpanded(true)
    }

    const handleMenuElementPress = ({ mode } : { url: any, mode: CoordinateRole}) =>{
        setRole((role) => role === mode ? undefined : mode)
    }
    return (
        <Animated.View style={{height, ...styles.mapMenuView, display: 'flex', flexDirection: 'column'}}>
            <View style={{ width: '100%', height: 75, display: 'flex', flexDirection: 'row' }}>
                <View style={{ marginLeft: '5%', marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {mapMenuElements.map((mapElement, i) =>(
                        <Pressable 
                            key={`${mapElement.url}/${i}`} 
                            style={{ 
                                ...styles.mapMenuElement,
                                opacity: role === mapElement.mode ? 1 : 0.5
                            }} 
                            onPress={() => handleMenuElementPress(mapElement)}
                        >
                            <Image key={`image/${mapElement.url}`} style={{ width: '100%', height: '100%' }} source={mapElement.url} />
                        </Pressable>
                    ))}
                </View>
                <Pressable 
                    style={{ 
                        marginTop: 10, 
                        marginLeft: '15%', 
                        width: 50, 
                        height: 50 
                    }} 
                    onPress={() => setExpanded(!expanded)}
                >
                    <Image 
                        style={{ width: 50, height: 50, transform: [{rotate: !expanded ? '180deg' : '0deg'}] }} 
                        source={require('../assets/arrow-up-map.png')}
                    />
                </Pressable>
            </View>
            {!expanded && 
            <View style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextInput
                        onChangeText={title => setTitle(title)}
                        style={{
                            color: COLORS.white,
                            paddingLeft: 10,
                            marginLeft: '5%', 
                            width: '75%', 
                            height: 50, 
                            borderWidth: 2, 
                            borderColor: COLORS.white 
                        }}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                    <TextInput
                        onChangeText={desc => setDescription(desc)}
                        style={{
                            color: COLORS.white,
                            paddingLeft: 10,
                            marginLeft: '5%', 
                            width: '75%',
                            paddingTop: 10,
                            paddingBottom: 80, 
                            borderWidth: 2, 
                            borderColor: COLORS.white 
                        }}
                    />
                    <Pressable 
                        onPress={handlePress} 
                        style={{ marginLeft: '5%', marginTop: '10%', width: 50, height: 50 }}
                    >
                        <CheckedSvg/>
                    </Pressable>
                </View>
            </View>
            }
        </Animated.View>
    )
}

export default MapMenu