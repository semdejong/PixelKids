import "react-native-gesture-handler";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DrawerContent from "./shared/DrawerContent";
import ExtraScreen from "./screens/ExtraScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        <TailwindProvider>
          <Drawer.Navigator
            initialRouteName="Login"
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Register" component={RegisterScreen} />
            <Drawer.Screen name="Extra" component={ExtraScreen} />
          </Drawer.Navigator>
        </TailwindProvider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
