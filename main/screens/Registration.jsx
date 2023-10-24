import { Button, SafeAreaView, Text, TextInput } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigatorNames from "../utils/NavigatorNames";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../store/slices/userSlice";

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

        // Add the new user to the existing users array.
        existingUsers.push({ fullName, username, password, mobileNumber });
        await AsyncStorage.setItem("users", JSON.stringify(existingUsers));
        navigation.navigate(NavigatorNames.login);
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(setError('Please fill in all fields.'));
      alert("Please fill in all fields.");
    }
  };

  const handleLoginNav = async () => {
    navigation.navigate(NavigatorNames.login)
  }

  return (
    <SafeAreaView>

      <Text>Registration</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
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

      <TextInput
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <Button title="Register" onPress={handleRegistration} />

      <Button title="Login Here" onPress={handleLoginNav} />

    </SafeAreaView>
  );

};

export default Registration;
