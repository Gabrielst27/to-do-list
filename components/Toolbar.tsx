import { Drawer } from "@/components/Drawer";
import { Theme } from "@/themes/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Toolbar() {
  const insets = useSafeAreaInsets();

  const [drawerIsVisible, setDrawerIsVisible] = useState(false);

  function closeDrawer() {
    setDrawerIsVisible(false);
  }

  return (
    <>
      {drawerIsVisible && (
        <Drawer isMounted={drawerIsVisible} onClose={closeDrawer} />
      )}

      <View style={[styles.mainContainer, { height: insets.bottom + 40 }]}>
        <Pressable
          style={styles.addButton}
          onPress={() => setDrawerIsVisible(true)}
        >
          <MaterialIcons name="add" size={40} color={Theme.colors.primary50} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.colors.tabs,
    alignItems: "center",
    position: "relative",
  },

  addButton: {
    position: "absolute",
    top: -32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Theme.colors.primary500,
    justifyContent: "center",
    alignItems: "center",
  },
});
