import Svg, { Path } from "react-native-svg"
import { COLORS } from "../../consts"

const CheckedSvg = () =>{
  return (
        <Svg
            scale={0.5}
            viewBox="0 0 512 512"
            color={COLORS.white}

        >
        <Path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M416 128L192 384l-96-96"
        />
        </Svg>
  )
}

export default CheckedSvg