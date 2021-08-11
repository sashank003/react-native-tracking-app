import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Context as TrackContext } from '../context/TrackContext';


const TrackDetailScreen = ({ navigation }) => {
    const id = navigation.getParam('_id');

    const { state } = useContext(TrackContext);

    const track = state.find(t => t._id === id);

    const initialcords = track.locations[0].coords;

    return (
        <>
            <Text style={{ fontSize: 40 }}>{track.name}</Text>
            <MapView style={styles.map}
                initialRegion={{
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    ...initialcords
                }}
            >
                <Polyline coordinates={track.locations.map(loc => loc.coords )}
                strokeColor="#055C9D"
                strokeWidth={5}
                lineDashPattern={[0]}
                />
            </MapView>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default TrackDetailScreen;