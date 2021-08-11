import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
        case 'signin':
            return { errorMessage:'', token: action.payload};
        case 'signout':
            return {token: null, errorMessage:''};
        case 'clear_error_message':
            return { ...state, errorMessage: ''}
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
        dispatch({
            type: 'signin',
            payload: token
        });

        navigate('TrackList');
    } else {
        navigate('Signup');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({
        type: 'clear_error_message'
    })
};

const signup = (dispatch) => async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', {email, password});

            await AsyncStorage.setItem('token', response.data.token);

            dispatch({
                type: 'signup',
                payload: response.data.token
            });
            
            navigate('TrackList');
        } catch (err) {
            dispatch({
                type: 'add_error',
                payload: 'something went wrong'
            })
        }
        
    };


const signin = (dispatch) => async ({email, password}) => {
    try {
        const response = await trackerApi.post('/signin', {email, password});

        await AsyncStorage.setItem('token', response.data.token);

        dispatch({
            type: 'signin',
            payload: response.data.token
        });

        navigate('TrackList');
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'something went wrong'
        })
    }
    };


const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
        dispatch({
            type: 'signout'
        });

        navigate('loginFlow');
    };

export const { Context, Provider } = createDataContext(
    reducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    {token: null, errorMessage: ''}
);