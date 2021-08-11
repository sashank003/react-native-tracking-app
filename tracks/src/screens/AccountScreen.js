import React, {useContext} from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as AuthContext } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);

    return (
    <SafeAreaView>
        <Text style={{ fontSize: 40 }}>Account Screen</Text>
        <Spacer>
            <Button title="Sign Out" onPress={signout} />
        </Spacer>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

AccountScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: <FontAwesome name="gear" size={20} color="black" />
}

export default AccountScreen;