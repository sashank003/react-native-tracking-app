import { useState, useEffect } from 'react';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';


export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            try {
                let {status} = await requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErr( "ACCESS_FINE_LOCATION permission denied" );
                }
                const subscriber =  await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, callback);
            } catch (err) {
                setErr(err);
            }
        };

        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber){
                subscriber.remove(); 
            }
            subscriber =null;
            
        }

        return () => {
           if(subscriber) {
               subscriber.remove();
           } 
        };
    }, [shouldTrack, callback]);

    return [err];
};
