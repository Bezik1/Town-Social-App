import { StyleProp, ViewStyle } from "react-native"
import Svg, { Path } from "react-native-svg"
import { COLORS } from "../../consts"

const TrashSvg = ({  style} : { style?: StyleProp<ViewStyle> }) =>{
  return (
    <Svg
      color={COLORS.lightRed}
      viewBox="0 0 512 512"
      style={style}
    >
      <Path
        d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M80 112h352"
      />
      <Path
        d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40m-64 64v224m-72-224l8 224m136-224l-8 224"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </Svg>
  )
}

export default TrashSvg