import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./models/store";

import { Index } from "./screens/Index";
import { Home } from "./screens/Home";
import { FeedDisplay } from "./screens/FeedDisplay";

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: false
    }}>


      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FeedDisplay" component={FeedDisplay} />


    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  )
}
