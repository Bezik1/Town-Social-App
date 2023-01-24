import Svg, { Path } from "react-native-svg"
import { COLORS } from "../../consts"
import { styles } from "../../styles"
import { LogoProps } from "../../types"

const Logo = ({ scale, color, style}: LogoProps) => (
  <Svg
    style={style || { width: '100%', height: '100%' }}
  >
    <Path
      d="m365.761 1088.121-16.846-6.782-11.315 11.721-11.313-11.721-16.845 6.782-7.365 18.848 10.423 21.811 25.1 12.481 25.1-12.481 10.423-21.811zm-16.412-4.752 14.488 5.833-12.109 20.109-12.96-14.981zm-24.625 28.262h25.76l-12.881 26.69zm11.012 26.78-21.375-10.629 8.918-15.185zm-10.5-28.5 12.367-14.3 12.369 14.3zm26.692 2.685 8.917 15.186-21.375 10.629zm-26.07-29.227 10.58 10.961-12.96 14.981-12.109-20.111zm-15.582 7.353 12.076 20.055-9.122 15.532-9.275-19.408zm51.7 35.587-9.121-15.532 12.075-20.055 6.323 16.179z"
      data-name="Path 1818"
      transform="translate(-302.08 -1081.339)"
      //@ts-ignore
      style={{
        fill: color || COLORS.white,
        scale,
      }}
    />
  </Svg>
)

export default Logo