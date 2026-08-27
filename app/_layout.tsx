import { Toolbar } from "@/components/Toolbar";
import { persistor, store } from "@/store";
import { Theme } from "@/themes/theme";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterSemibold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.mainContainer}>
            <StatusBar hidden={true} />
            <View style={styles.header}>
              <Text style={styles.title}>Lista de tarefas</Text>
            </View>
            <Toolbar />
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    padding: 24,
  },
  title: {
    fontFamily: Theme.text.families.bold,
    fontSize: Theme.text.sizes.xl,
    color: Theme.colors.primary100,
  },
});
