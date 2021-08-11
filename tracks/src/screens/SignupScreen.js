import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation}) => {

    const {state, signup, clearErrorMessage } = useContext(AuthContext);

    
    return (
    <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm 
            headerText="Sign Up for Tracker" 
            errorMessage={state.errorMessage}
            onSubmit={signup} 
            buttonText="Sign Up" 
        />
        <NavLink 
        routeName="Signin"
        text="Already have an account? Sign in instead"
        />
    </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
      header: () => false
    };
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    }
});

export default SignupScreen;