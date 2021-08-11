import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = ({ navigation}) => {

    const {state, signin, clearErrorMessage } = useContext(AuthContext);

    
    return (
    <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm 
            headerText="Sign In to Your Account" 
            errorMessage={state.errorMessage}
            onSubmit={signin} 
            buttonText="Sign In" 
        />
        <NavLink 
        routeName="Signup"
        text="Don't have an account? Sign up instead"
        />
    </View>
    );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;