import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const alreadyExists = tasks.find((task) => task.title === newTaskTitle);
    if (alreadyExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      setTasks((prevState) => [...prevState, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            done: task.done ? false : true,
          };
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () =>
            setTasks((prevState) => prevState.filter((item) => item.id !== id)),
        },
        {
          text: "Não",
          onPress: () => {
            return;
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title: taskNewTitle,
          };
        }
        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
