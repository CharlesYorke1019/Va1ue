import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Index } from "./screens/Index";
import { Home } from "./screens/Home";

const Stack = createNativeStackNavigator()

function App() {
  const isLoadingComplete = useLoadedAssets();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="home" component={Home} />


      </Stack.Navigator>
    )
  }
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
