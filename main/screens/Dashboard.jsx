import { Button, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import NavigatorNames from "../utils/NavigatorNames";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";
import { themeColors } from "../theme";

const Dashboard = ({ route, navigation }) => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex ">
        <View  className="flex-row justify-center mt-8">
          <Image source={require("../../assets/images/mykarelogo.png")}
                 style={{ width: 180, height: 50 }}
                 resizeMode="contain"
          />
        </View>
      </SafeAreaView>

      <View
        style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius:15, borderBottomRightRadius:15 }}
        className="flex bg-white px-8 pt-8 mt-8 mb-8 ml-3 mr-3">

        <View className="form space-y-2">

          <Text className="text-center text-black font-bold ml-4">Welcome, {user.fullName}</Text>
         <View className=" mb-8">
           <Text  className=" mt-8 text-center">Username: {user.username}</Text>
           <Text className=" mt-3 text-center">Mobile Number: {user.mobileNumber}</Text>
         </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(NavigatorNames.login)}
            className="py-2 bg-secondary rounded-xl mb-8">
            <Text
              className="text-xl font-bold text-center text-gray-700"
            >
              Logout
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );

};

export default Dashboard;
