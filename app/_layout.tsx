import { Drawer } from "@/components/Drawer";
import { TaskList } from "@/components/TaskList";
import { Toolbar } from "@/components/Toolbar";
import { TaskModel } from "@/models/task";
import { persistor, store } from "@/store";
import {
  addTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "@/store/tasks-slice";
import { Theme } from "@/themes/theme";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
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
        <App />
      </PersistGate>
    </Provider>
  );
}

function App() {
  const [selectedTask, setSelectedTask] = useState<TaskModel | null>(null);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const dispatch = useDispatch();

  function handleAddTask(title: string) {
    dispatch(addTask(title));
  }

  function handleSaveTaskTitle(id: string, newTitle: string): boolean {
    dispatch(updateTask({ id, title: newTitle }));
    return true;
  }

  function handleToggleTask(id: string) {
    dispatch(toggleTask(id));
  }

  function handleDeleteTask(id: string) {
    dispatch(deleteTask(id));
  }

  function handleSelectTask(task: TaskModel) {
    setSelectedTask(task);
    setDrawerVisible(true);
  }

  function handleCloseDrawer() {
    setDrawerVisible(false);
    setSelectedTask(null);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Image
            source={require("../assets/images/logo.svg")}
            style={{ width: 32, height: 32 }}
          />
          <Text style={styles.title}>Lista de tarefas</Text>
        </View>
        <Toolbar onAdd={handleAddTask} />
        <TaskList onSelect={handleSelectTask} />
        {!!selectedTask && (
          <Drawer
            visible={drawerVisible}
            task={selectedTask}
            onClose={handleCloseDrawer}
            onSaveTitle={handleSaveTaskTitle}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: Theme.text.families.bold,
    fontSize: Theme.text.sizes.lg,
    color: Theme.colors.primary100,
  },
});
