import "react-native-gesture-handler";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import ContextWrapper from "./context/ContextWrapper";

import Navigation from "./shared/Navigation";

export default function App() {
  return (
    <ContextWrapper>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <TailwindProvider>
            <Navigation />
          </TailwindProvider>
        </ApplicationProvider>
      </NavigationContainer>
    </ContextWrapper>
  );
}
