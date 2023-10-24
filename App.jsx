import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NavigatorNames from "./main/utils/NavigatorNames";
import Registration from "./main/screens/Registration";
import Login from "./main/screens/Login";
import Dashboard from "./main/screens/Dashboard";
import { Provider } from "react-redux";
import store from "./main/store/store";


const Stack = createStackNavigator();

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={NavigatorNames.registration}>
          <Stack.Screen name={NavigatorNames.registration} component={Registration} />
          <Stack.Screen name={NavigatorNames.login} component={Login} />
          <Stack.Screen name={NavigatorNames.dashboard} component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
