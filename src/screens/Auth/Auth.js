import React from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';

import backgroundImage from '../../assets/background.jpg';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import BtnWithBackground from '../../components/UI/BtnWithBackground/BtnWithBackground';

import { signUp, logIn, autoAuth } from '../../store/actions/index';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import validate from '../../utility/validate'

class AuthScreen extends React.Component {

    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Auth',
                    color: 'white'
                },
                background: {
                    color: 'rebeccapurple'
                }
            }
        };
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }    

    componentDidAppear() {
        this.props.autoAuth()
    }

    state = {
        viewType: Dimensions.get('window').width < 500 ? 'Portrait' : 'Landscape',
        mode: 'login',
        form: {
            email: {
                value: '',
                valid: false,
                touched: false,
                rules: {
                    email: true
                }
            },
            password: {
                value: '',
                valid: false,
                touched: false,
                rules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                touched: false,
                rules: {
                    equalTo: 'password'
                }
            }
        }
    }

    componentWillMount() {
        Dimensions.addEventListener('change', this.dimensionsHandler)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.dimensionsHandler);
    }

    dimensionsHandler = (dimension) => {
        this.setState({
            viewType: dimension.window.width < 500 ? 'Portrait' : 'Landscape'
        })
    }

    submitHandler = () => {
        const authData = {
            email: this.state.form.email.value,
            password: this.state.form.password.value
        }
        console.log(this.state.mode);
        if(this.state.mode == 'signUp')
            this.props.signUp(authData)
        else
            this.props.logIn(authData)
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === 'login' ? 'signUp' : 'login' })
    }

    textInputHandler = (val, field) => {
        this.setState(prevState => {
            return {
                ...prevState,
                form: {
                    ...prevState.form,
                    [field]: {
                        ...prevState.form[field],
                        value: val,
                        touched: true,
                        valid: validate(this.state.form, val, prevState.form[field].rules)
                    }
                }
            }
        })
    }

    render() {

        const emailStyles = [styles.input];
        if (this.state.form.email.touched) {
            if (!this.state.form.email.valid)
                emailStyles.push(styles.invalid);
            else
                emailStyles.push(styles.valid);
        }

        const passwordStyles = [styles.input];
        if (this.state.form.password.touched) {
            if (!this.state.form.password.valid)
                passwordStyles.push(styles.invalid);
            else
                passwordStyles.push(styles.valid);
        }

        const confirmPasswordStyles = [styles.input];
        if (this.state.form.confirmPassword.touched) {
            if (!this.state.form.confirmPassword.valid)
                confirmPasswordStyles.push(styles.invalid);
            else
                confirmPasswordStyles.push(styles.valid)
        }

        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImg} >
                <StatusBar
                    barStyle="light-content"
                />
                <KeyboardAvoidingView style={styles.page} behavior="padding">
                    {this.state.viewType === 'Portrait' ? <HeadingText style={styles.heading}>{this.state.mode === 'login' ? "Log In" : "Sign Up"}</HeadingText> : null}
                    <BtnWithBackground
                        color="salmon"
                        title={this.state.mode === 'login' ? "Switch to Sign Up" : "Switch to Log In"}
                        onPress={this.switchModeHandler} />
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput
                                autoCorrect={false}
                                allowFontScaling={false}
                                autoCapitalize="none"
                                keyboardAppearance="dark"
                                keyboardType="email-address"
                                value={this.state.form.email.value}
                                onChangeText={(val) => { this.textInputHandler(val, 'email') }}
                                placeholder="Your E-Mail Address"
                                style={emailStyles} />
                            <View style={this.state.viewType === 'Landscape' && this.state.mode === 'signUp' ? styles.passwordCont : null}>
                                <View style={this.state.viewType === 'Landscape' && this.state.mode === 'signUp' ? styles.passwordWidth : null}>
                                    <DefaultInput
                                        autoCorrect={false}
                                        allowFontScaling={false}
                                        autoCapitalize="none"
                                        keyboardAppearance="dark"
                                        secureTextEntry
                                        value={this.state.form.password.value}
                                        onChangeText={(val) => {
                                            this.textInputHandler(val, 'password');
                                            this.textInputHandler(this.state.form.confirmPassword.value, 'confirmPassword')
                                        }}
                                        placeholder="Password"
                                        style={passwordStyles} />
                                </View>
                                {this.state.mode === 'login' ? null :
                                    <View style={this.state.viewType === 'Landscape' ? styles.passwordWidth : null}>
                                        <DefaultInput
                                            autoCorrect={false}
                                            allowFontScaling={false}
                                            autoCapitalize="none"
                                            keyboardAppearance="dark"
                                            secureTextEntry
                                            value={this.state.form.confirmPassword.value}
                                            onChangeText={(val) => { this.textInputHandler(val, 'confirmPassword') }}
                                            placeholder="Confirm Password"
                                            style={confirmPasswordStyles} />
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.props.loading ?  <ActivityIndicator color="rebeccablue" /> : 
                        <BtnWithBackground
                            color="rebeccapurple"
                            title="Submit"
                            disabled={
                                !this.state.form.email.valid ||
                                !this.state.form.password.valid ||
                                !this.state.form.confirmPassword.valid && this.state.mode === 'signUp'
                            }
                            onPress={this.submitHandler} />
                    }
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.uiReducer.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: authData => dispatch(logIn(authData)),
        signUp: authData => dispatch(signUp(authData)),
        autoAuth: () => dispatch(autoAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImg: {
        flex: 1
    },
    heading: {
        marginVertical: 20,
        color: 'white'
    },
    passwordCont: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    passwordWidth: {
        width: '45%'
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: '#eee',
        color: '#777'
    },
    invalid: {
        borderBottomColor: 'orangered',
        borderBottomWidth: 3
    },
    valid: {
        borderBottomColor: 'yellowgreen',
        borderBottomWidth: 3
    }
});