import { Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import NavigationNames from "../utils/NavigatorNames";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../store/slices/userSlice";
import NavigatorNames from "../utils/NavigatorNames";
import { themeColors } from "../theme";

const Login = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const handleRegisterNav = async () => {
    navigation.navigate(NavigatorNames.registration);
  };

  const handleLogin = async () => {
    if (username && password) {
      try {
        const existingUsers = JSON.parse(await AsyncStorage.getItem("users")) || [];

        const user = existingUsers.find(u => u.username === username && u.password === password);

        if (user) {
          // Successfully logged in, navigate to the dashboard.
          dispatch(loginUserAsync(user)).then(() => {
            setUsername("");
            setPassword("");
            navigation.navigate(NavigationNames.dashboard, { user });
          });
        } else {
          alert("Incorrect username or password");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex ">

        <View className="flex-row justify-center mt-8">
          <Image source={require("../../assets/images/mykarelogo.png")}
                 style={{ width: 180, height: 50 }}
                 resizeMode="contain"
          />
        </View>

      </SafeAreaView>

      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8 mt-8">

        <View className="form space-y-2">

          <Text className="text-gray-700 ml-4">UserName</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={username}
            onChangeText={setUsername}
            autoCapitalize='none'
            placeholder="Enter UserName"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"

            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="py-3 bg-secondary rounded-xl">
            <Text
              className="text-xl font-bold text-center text-gray-700"
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRegisterNav}
            className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold mt-8">
              Don't have an account?
            </Text>
            <View>
              <Text className="font-semibold text-yellow-500 mt-8"> Register</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );

};

export default Login;

