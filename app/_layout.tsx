import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [] = useFonts({
    InterRegular: Inter_400Regular,
    InterSemibold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });
  return <SafeAreaView></SafeAreaView>;
}
