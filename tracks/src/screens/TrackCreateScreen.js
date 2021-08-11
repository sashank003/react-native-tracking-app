import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import useLocation from '../hooks/useLocation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as LocationContext } from '../context/LocationContext';
import TrackForm from '../components/TrackForm';
import Map from '../components/Map';
import { FontAwesome } from '@expo/vector-icons';


const TrackCreateScreen = ({ isFocused }) => {
    const { state, addLocation } = useContext(LocationContext);

    const callback = useCallback((location) => {
        addLocation(location, state.recording );
    },[state.recording]);

    const [err] = useLocation(isFocused || state.recording , callback);


    return (
        <SafeAreaView>
            <Text style={{ fontSize: 40 }}>Track Create Screen</Text>
            <Map />
            
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    
    );
};

const styles = StyleSheet.create({});

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={20} color="black" />
}

export default withNavigationFocus(TrackCreateScreen);