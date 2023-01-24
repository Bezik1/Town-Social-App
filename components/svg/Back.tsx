import { useNavigation } from "@react-navigation/native"
import { Pressable } from "react-native"
import Svg, { Path } from "react-native-svg"
import { COLORS } from "../../consts"
import { styles } from "../../styles"
import { NavigationProps } from "../../types"

const BackSvg = () =>{
    const navigation = useNavigation<NavigationProps>()
    
    return (
        <Pressable style={styles.announcementBack} onPress={() => navigation.goBack()}>
            <Svg
                color={COLORS.white}
                viewBox="0 0 512 512"
                style={{ width: 40, height: 40 }}
            >
            <Path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={48}
                d="M328 112L184 256l144 144"
            />
            </Svg>
        </Pressable>
    )
}

export default BackSvg