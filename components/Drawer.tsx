import { TaskModel } from "@/models/task";
import { Theme } from "@/themes/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type DrawerProps = {
  visible: boolean;
  task: TaskModel;
  onClose: () => void;
  onSaveTitle: (id: string, newTitle: string) => boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function Drawer({
  visible,
  task,
  onClose,
  onSaveTitle,
  onToggle,
  onDelete,
}: DrawerProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [newTitle, setNewTitle] = useState(task.title);
  const [savedTitle, setSavedTitle] = useState(task.title);
  const [isDone, setIsDone] = useState(task.isDone);

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

  if (!visible) {
    return null;
  }

  function handleDelete() {
    Alert.alert(
      "Excluir tarefa",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            onDelete(task.id);
            onClose();
          },
        },
      ],
    );
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
        <View style={styles.drawerHeader}>
          <View style={styles.topRow}>
            <Pressable style={styles.closeDrawerRow} onPress={closeDrawer}>
              <MaterialIcons
                name="close"
                size={24}
                color={Theme.colors.primary50}
              />
              <Text style={styles.closeDrawerText}>Fechar</Text>
            </Pressable>
            <Pressable onPress={handleDelete}>
              <MaterialIcons
                name="delete"
                size={24}
                color={Theme.colors.danger}
              />
            </Pressable>
          </View>

          <View style={styles.titleContainer}>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.titleInput}
              multiline
              scrollEnabled
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.drawerFooter}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              savedTitle === newTitle
                ? styles.disabledSaveTitleButton
                : pressed
                  ? styles.pressedSaveTitleButton
                  : styles.saveTitleButton,
            ]}
            onPress={() => {
              if (savedTitle === newTitle) {
                Alert.alert(
                  "Não houve mudança no título",
                  "É necessário alterar o título para poder salvá-lo.",
                );
                return;
              }

              const success = onSaveTitle(task.id, newTitle);

              if (success) {
                setSavedTitle(newTitle);
              }
            }}
          >
            <Text
              style={[
                styles.buttonText,
                savedTitle === newTitle
                  ? styles.disabledSaveTitleButtonText
                  : styles.saveTitleButtonText,
              ]}
            >
              Salvar título
            </Text>
          </Pressable>

          {!isDone ? (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressedToggleButton : styles.toggleButton,
              ]}
              onPress={() => {
                setIsDone(!isDone);
                onToggle(task.id);
              }}
            >
              <Text style={[styles.buttonText, styles.toggleButtonText]}>
                Concluir tarefa
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressedToggleButton : styles.toggleButton,
              ]}
              onPress={() => {
                setIsDone(!isDone);
                onToggle(task.id);
              }}
            >
              <Text style={[styles.buttonText, styles.toggleButtonText]}>
                Reabrir tarefa
              </Text>
            </Pressable>
          )}
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
    gap: 40,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  drawerHeader: {
    flex: 1,
    gap: 48,
  },
  drawerFooter: {
    gap: 16,
  },
  closeDrawerRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  closeDrawerText: {
    fontSize: Theme.text.sizes.lg,
    fontFamily: Theme.text.families.bold,
    color: Theme.colors.primary50,
  },
  titleContainer: {
    flex: 1,
  },
  titleInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Theme.colors.toolbar,
    color: Theme.colors.primary50,
    fontSize: Theme.text.sizes.default,
    fontFamily: Theme.text.families.regular,
    textAlignVertical: "top",
  },
  button: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: Theme.text.families.semibold,
    fontSize: Theme.text.sizes.default,
  },
  saveTitleButton: {
    backgroundColor: Theme.colors.primary100,
  },
  pressedSaveTitleButton: {
    backgroundColor: Theme.colors.primary300,
  },
  disabledSaveTitleButton: {
    backgroundColor: Theme.colors.muted,
  },
  saveTitleButtonText: {
    color: Theme.colors.primary900,
  },
  disabledSaveTitleButtonText: {
    color: Theme.colors.mutedForeground,
  },
  toggleButton: {
    backgroundColor: Theme.colors.primary500,
  },
  pressedToggleButton: {
    backgroundColor: Theme.colors.primary700,
  },
  toggleButtonText: {
    color: Theme.colors.primary50,
  },
});
