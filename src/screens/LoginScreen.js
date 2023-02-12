import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, FlatList, VariantsBox } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import Snackbar from '../components/Snackbar'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import Login from '../http/Login'
import AllUser from '../http/GetAllUser'
import TextInputDropdown from '../components/TextInputDropdown'

export default function LoginScreen({ navigation }) {
  try {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [visibleSnackbar, setVisibleSnackbar] = useState(false)
    const [textSnackbar, setTextSnackbar] = useState('')
    const [allItem, setAllItem] = useState([]);
    const [emails, setEmails] = useState([])

    const onLoginPressed = () => {
      const emailError = emailValidator(email.value)
      const passwordError = passwordValidator(password.value)
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
      }
      Login(email.value, password.value)
        .then(data => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        })
        .catch(err => {
          setTextSnackbar((err?.message ?? '') + '. Try again.')
          setVisibleSnackbar(true)
        })
    }

    useEffect( () => {
      const fetehUserEmail = async()=>{
        const result = await AllUser().then(data=>data)
        setEmails(result.map((item) => item.email))
      }
      fetehUserEmail()

    }, []);

    const filterItems = (info) => {
      if(!info){
        setAllItem()
        return 
      }
      const result = emails.filter(item => item.indexOf(info) === 0);
      setAllItem(result)
    };
    return (
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Header>Welcome back.</Header>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          onChangeText={(text) => {
            setEmail({ value: text, error: '' })
            filterItems(text)
          }}
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInputDropdown
          data={allItem}
          value={(text)=>{
            setEmail({ value: text, error: '' })
            filterItems('')
          }}
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          text={textSnackbar}
          onDismiss={() => { setVisibleSnackbar(false) }}
          visible={visibleSnackbar}
        />
      </Background>
    )

  } catch (error) {
    console.log(error);
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
