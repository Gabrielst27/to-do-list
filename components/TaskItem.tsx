import { TaskModel } from "@/models/task";
import { Theme } from "@/themes/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TaskItemProps = {
  task: TaskModel;
  onPress: () => void;
};

export function TaskItem({ task, onPress }: TaskItemProps) {
  const createdAt = new Date(task.createdAt);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <MaterialIcons
        name={task.isDone ? "check-circle" : "radio-button-unchecked"}
        size={24}
        color={Theme.colors.primary500}
      />

      <View style={styles.content}>
        <Text
          style={[styles.title, task.isDone && styles.completedTitle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {task.title}
        </Text>

        <Text style={styles.date}>
          Criado em {createdAt.toLocaleDateString("pt-BR")} às{" "}
          {createdAt.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Theme.colors.toolbar,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: Theme.text.families.semibold,
    fontSize: Theme.text.sizes.default,
    color: Theme.colors.primary50,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  date: {
    marginTop: 4,
    fontFamily: Theme.text.families.regular,
    fontSize: Theme.text.sizes.sm,
    color: Theme.colors.primary500,
  },
});
