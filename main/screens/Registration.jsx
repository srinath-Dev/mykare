import { SafeAreaView, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigatorNames from "../utils/NavigatorNames";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync, setError } from "../store/slices/userSlice";
import { themeColors } from "../theme";

const Registration = ({ navigation }) => {

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const handleRegistration = async () => {
    if (fullName && username && password && mobileNumber) {
      try {
        // Load the existing users from AsyncStorage or initialize as an empty array.
        const existingUsers = JSON.parse(await AsyncStorage.getItem("users")) || [];

        // Check if the username already exists.
        if (existingUsers.find(user => user.username === username)) {
          alert("Username already exists.");
          return;
        }

        dispatch(registerUserAsync({ fullName, username, password, mobileNumber })).then(() => {
          navigation.navigate(NavigatorNames.login);
        });

      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(setError("Please fill in all fields."));
      alert("Please fill in all fields.");
    }
  };

  const handleLoginNav = async () => {
    navigation.navigate(NavigatorNames.login);
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex">

        <View className="flex-row justify-center mt-8">
          <Image source={require("../../assets/images/mykarelogo.png")}
                 style={{ width: 180, height: 50 }}
                 resizeMode="contain"
          />
        </View>
      </SafeAreaView>

      <View className="flex-1 bg-white px-8 pt-8 mt-8"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >

        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <Text className="text-gray-700 ml-4">Mobile Number</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Enter Mobile Number"
          />
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

        </View>

        <TouchableOpacity
          className="py-5 bg-secondary rounded-xl"
          onPress={handleRegistration}
        >
          <Text className="font-xl font-bold text-center text-gray-700">
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginNav} className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">Already have an account?</Text>
          <View>
            <Text className="font-semibold text-yellow-500"> Login</Text>
          </View>
        </TouchableOpacity>

      </View>


    </View>
  );

};

export default Registration;
