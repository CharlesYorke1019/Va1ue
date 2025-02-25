import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./models/store";

import { Index } from "./screens/Index";
import { Home } from "./screens/Home";
import { FeedDisplay1 } from "./screens/FeedDisplay1";
import { FeedDisplay2 } from "./screens/FeedDisplay2";

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: false
    }}>


      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FeedDisplay1" component={FeedDisplay1} />
      <Stack.Screen name="FeedDisplay2" component={FeedDisplay2} />


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
