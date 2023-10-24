import { Button, SafeAreaView, Text } from "react-native";
import NavigatorNames from "../utils/NavigatorNames";

const Dashboard = ({ route, navigation }) => {

  const { user } = route.params;

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
