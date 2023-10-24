import { Button, SafeAreaView, Text } from "react-native";
import NavigatorNames from "../utils/NavigatorNames";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";

const Dashboard = ({ route, navigation }) => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  return(
    <SafeAreaView>
      <Text>Welcome, {user.fullName}</Text>
      <Text>Username: {user.username}</Text>
      <Text>Mobile Number: {user.mobileNumber}</Text>
      <Button title="Logout" onPress={() => navigation.navigate(NavigatorNames.login)} />
    </SafeAreaView>
  )

}

export default  Dashboard;
