import { Theme } from "@/themes/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export function Toolbar() {
  return (
    <View style={styles.mainContainer}>
      <TextInput style={styles.titleInput}></TextInput>
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          {
            backgroundColor: pressed
              ? Theme.colors.primary700
              : Theme.colors.primary500,
          },
        ]}
        onPress={() => {}}
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
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
