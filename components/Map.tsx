import { Image, View } from 'react-native';
import { basicContainerStyles } from '../styles'
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { CoordinateInterface, Data } from '../types';
import { API_URLS, CoordinateRole } from '../consts';
import MapMenu from './MapMenu';
import axios from 'axios';
import SelectedLocation from './SelectedLocation';
import { useUserContext } from '../contexts/UserContext';

const Map = () =>{
    const [role, setRole] = useState<CoordinateRole>()
    const {
        data: coordinates, 
        setData: setCoordinates,
        loading
    } = useFetch<CoordinateInterface[]>(API_URLS.GetAllCoordinates)
    const [coordinate, setCoordinate] = useState<LatLng>()
    const [selectedLocation, selectLocation] = useState<CoordinateInterface>()
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const { user } = useUserContext()

    const addNewMarker = async () =>{
        try {
            if(!coordinate) throw new Error('Location not selected')
            if(description.length < 4) throw new Error('Description must has minimum 4 characters')
            if(!role) throw new Error('Role not selected')

            const { latitude, longitude } = coordinate
            const newMarker: CoordinateInterface = {
                author: String(user?.username),
                latitude,
                longitude,
                role,
                title,
                description
            }

            const { status }: Data<CoordinateInterface> = (await axios.post(API_URLS.CreateCoordinates, newMarker)).data
            if(status === 'succes') setCoordinates((before) => [...before, newMarker] )
            console.log(status)
        } catch(err) {
            console.log(err)
        }
    }

    const getColor = (role: string) =>{
        const { Accident, Home, Pool, TrafficJam, WorkPlace } = CoordinateRole

        switch(role) {
            case Accident:
                return 'red'
            case Home:
                return 'green'
            case Pool:
                return 'lightblue'
            case TrafficJam:
                return 'red'
            case WorkPlace:
                return 'black'
            default:
                return 'black'
        }
    }

    return (
        <View style={basicContainerStyles}>
            <MapView
                provider={PROVIDER_GOOGLE}
                onPress={e => setCoordinate(e.nativeEvent.coordinate)}
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude: 51.503889,
                    longitude: 16.072500,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.025,
                }}
            >
                {!loading && coordinates.map((data, i) =>{
                    const { latitude, longitude, role, description } = data

                    return (
                        <Marker
                            onPress={() => selectLocation(selectedLocation ? undefined : data)}
                            key={`${data.title}/${i}`}
                            title={data.title}
                            coordinate={{ latitude, longitude }} pinColor={getColor(role)} 
                        />
                    )
                })}
                {(coordinate && role) && <Marker pinColor={getColor(role)} coordinate={coordinate} /> 
                }
            </MapView>
            {selectedLocation && <SelectedLocation location={selectedLocation} />}
            <MapMenu
                setTitle={setTitle}
                role={role}
                setRole={setRole} 
                setDescription={setDescription}
                onSubmit={addNewMarker}
            />
        </View>
    )
}

export default Map