import { Image, ImageStyle, StyleProp } from "react-native"

const ReplySvg = ({ style } : { style?: StyleProp<ImageStyle> }) =>
    <Image style={style} source={require('../../assets/reply.png')} />


export default ReplySvg
