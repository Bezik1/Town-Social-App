import { Image, View } from 'react-native';
import { basicContainerStyles } from '../styles'
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { CoordinateInterface } from '../types';
import { API_URLS, CoordinateRole } from '../consts';
import MapMenu from './MapMenu';

const Map = () =>{
    const { data: coordinates, loading } = useFetch<CoordinateInterface[]>(API_URLS.GetAllCoordinates)
    const [coordinate, setCoordinate] = useState<LatLng>()


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
                {!loading && coordinates.map(data =>{
                    const { latitude, longitude, role, description } = data

                    return (
                        <Marker
                            title={description}
                            coordinate={{ latitude, longitude }} pinColor={getColor(role)} 
                        />
                    )
                })}
                {coordinate && <Marker coordinate={coordinate} /> 
                }
            </MapView>
            <MapMenu />
        </View>
    )
}

export default Map