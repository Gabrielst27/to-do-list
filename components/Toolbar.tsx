import { Theme } from "@/themes/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";

type ToolbarProps = {
  onAdd: (title: string) => void;
};

export function Toolbar({ onAdd }: ToolbarProps) {
  const [title, setTitle] = useState("");

  function handleAdd() {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      Alert.alert(
        "Título obrigatório",
        "Digite um título para criar a tarefa.",
      );
      return;
    }

    onAdd(normalizedTitle);
    setTitle("");
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.titleInput}
        placeholder="Digite a nova tarefa"
        placeholderTextColor={Theme.colors.muted}
        returnKeyType="done"
        onSubmitEditing={handleAdd}
      ></TextInput>
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          {
            backgroundColor: pressed
              ? Theme.colors.primary700
              : Theme.colors.primary500,
          },
        ]}
        onPress={handleAdd}
      >
        <MaterialIcons name="add" size={32} color={Theme.colors.primary50} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    backgroundColor: Theme.colors.toolbar,
  },
  titleInput: {
    flex: 1,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: Theme.colors.primary50,
    backgroundColor: Theme.colors.background,
    color: Theme.colors.primary50,
    fontSize: Theme.text.sizes.default,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
