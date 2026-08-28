import { TaskModel } from "@/models/task";
import { Theme } from "@/themes/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type DrawerProps = {
  visible: boolean;
  task: TaskModel | null;
  onClose: () => void;
};

export function Drawer({ visible, task, onClose }: DrawerProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    if (visible) {
      translateX.setValue(width);

      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, width]);

  function closeDrawer() {
    Animated.timing(translateX, {
      toValue: width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  }

  if (!visible || !task) {
    return null;
  }

  return (
    <View style={styles.drawerOverlay}>
      <Pressable style={styles.overlay} onPress={closeDrawer} />

      <Animated.View
        style={[
          styles.drawer,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 12,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.formHeader}>
          <Pressable onPress={closeDrawer}>
            <MaterialIcons
              name="close"
              size={24}
              color={Theme.colors.primary50}
            />
          </Pressable>

          <Text style={styles.title}>Fechar</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "80%",
    paddingHorizontal: 12,
    backgroundColor: Theme.colors.background,
  },
  formHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontSize: Theme.text.sizes.lg,
    fontFamily: Theme.text.families.bold,
    color: Theme.colors.primary50,
  },
});
