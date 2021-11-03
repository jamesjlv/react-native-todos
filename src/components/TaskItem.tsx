import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import cancel from "../assets/icons/X.png";
import edit from "../assets/icons/Pen.png";

interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
  Task: {
    id: number;
    title: string;
    done: boolean;
  };
  index: number;
}

export function TaskItem({
  toggleTaskDone,
  removeTask,
  editTask,
  Task,
  index,
}: TaskItemProps) {
  const { id, title, done } = Task;
  const [isBeingEdit, setIsBeingEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsBeingEdit(true);
  }

  function handleCancelEditing() {
    setNewTitle(title);
    setIsBeingEdit(false);
  }

  function handleSubmitEditing() {
    editTask(id, newTitle);
    setIsBeingEdit(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdit) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdit]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(id)}
        >
          <View
            testID={`marker-${index}`}
            style={done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isBeingEdit}
            onSubmitEditing={handleSubmitEditing}
            style={done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.buttons}>
          {isBeingEdit ? (
            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={handleCancelEditing}
            >
              <Image source={cancel} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={handleStartEditing}
            >
              <Image source={edit} />
            </TouchableOpacity>
          )}
          <View style={styles.divider} />
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => removeTask(id)}
            disabled={isBeingEdit}
          >
            <Image
              source={trashIcon}
              style={{ opacity: isBeingEdit ? 0.2 : 1 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
