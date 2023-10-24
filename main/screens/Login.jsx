import { Button, SafeAreaView, Text, TextInput } from "react-native";
import NavigationNames from "../utils/NavigatorNames";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, registerUserAsync } from "../store/slices/userSlice";
import NavigatorNames from "../utils/NavigatorNames";

const Login = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const handleLogin = async () => {
    if (username && password) {
      try {
        const existingUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];

        const user = existingUsers.find(u => u.username === username && u.password === password);

        if (user) {
          // Successfully logged in, navigate to the dashboard.
          dispatch(loginUserAsync(user)).then(() => {
            navigation.navigate(NavigationNames.dashboard, { user });
          });
        } else {
          alert('Incorrect username or password');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return(
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  )

}

export default Login;
