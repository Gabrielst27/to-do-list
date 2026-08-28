import { TaskModel } from "@/models/task";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { TaskItem } from "@/components/TaskItem";
import { RootState } from "@/store";
import { Theme } from "@/themes/theme";

type TaskListProps = {
  onSelect?: (task: TaskModel) => void;
};

export function TaskList({ onSelect }: TaskListProps) {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <TaskItem task={item} onPress={() => onSelect?.(item)} />
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada...</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    gap: 12,
  },
  empty: {
    alignItems: "center",
    paddingTop: 32,
  },
  emptyText: {
    color: Theme.colors.muted,
  },
});
