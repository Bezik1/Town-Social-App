import { ScrollView } from "react-native"
import { styles } from "../styles"
import { API_URLS } from "../consts"
import { useFetch } from "../hooks/useFetch"
import { Announcment } from "../types"
import AnnouncmentComponent from "./Announcment"
import CreateAnnouncment from "./CreateAnnouncment"
import { useReloadContext } from "../contexts/ReloadContext"

const HomeScreen = () =>{
    const { reload, setReload } = useReloadContext()
    const { data, loading } = useFetch<Announcment[]>(API_URLS.GetAnnouncments, undefined, reload)

    const sortAlghoritm = (a: Announcment, b: Announcment) => b.likes.length - a.likes.length

    return (
        <ScrollView style={styles.home}>
            <CreateAnnouncment setReload={setReload}/>
            <ScrollView style={{ paddingBottom: '20%' }}>
                {!loading && data.sort(sortAlghoritm)
                                 .map((announcment, i) => <AnnouncmentComponent
                                                            key={i} 
                                                            announcment={announcment} 
                                                        />)}
            </ScrollView>
        </ScrollView>
    )
}

export default HomeScreen