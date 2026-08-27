import { Toolbar } from "@/components/Toolbar";
import { Theme } from "@/themes/theme";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [] = useFonts({
    InterRegular: Inter_400Regular,
    InterSemibold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar hidden={true} />
      </SafeAreaView>
      <Toolbar />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: "space-between",
  },
});
