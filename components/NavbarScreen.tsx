import { styles } from "../styles"
import { useNavbarSelectContext } from "../contexts/NavbarSelectContext"
import { Pressable, Image, View } from "react-native"
import Logo from "./svg/Logo"

const NavbarScreen = () =>{
    const { selected, setSelected } = useNavbarSelectContext()

    return (
        <View style={styles.navbar}>
            <View style={styles.navbarLogoView}>
                <Logo scale={0.75}/>
            </View>
            <Pressable
                onPress={() => setSelected(!selected)}
            >
                <Image
                    source={require('../assets/menu.png')}
                    style={styles.navbarBtn} 
                />
            </Pressable>
        </View>
    )
}

export default NavbarScreen