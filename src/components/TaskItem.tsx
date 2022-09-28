import React, { useEffect, useRef, useState } from "react";
import { 
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput
} from "react-native";


import trashIcon from '../assets/icons/trash/trash.png';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from "./TasksList";
import { taskEditedProps } from "../pages/Home";
import editIcon from '../assets/icons/edit/edit.png';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }:taskEditedProps) => void;
}

export default function TaskItem({ task, editTask, removeTask, toggleTaskDone }:TaskItemProps) {
  
  //item esta sendo editado
  const [isEditing, setIsEditing] = useState(false);
  //salvar o valor editado - esse estado comeca com o valor antigo: task.title
  const [newTaskValue, setNewTaskValue] = useState(task.title);
  // referência é para você manipular manualmente se o item está sendo editado ou não.
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing(){
    setIsEditing(true);
  }

  function handleCancelEditing(){
    //se vou cancelar a edicao, vou setar o valor antigo
    setNewTaskValue(task.title);
    //encerro a edicao
    setIsEditing(false);
  }

  function handleSubmitEditing(){
    //chamo a funcao de edicao e passo os parametro que ela recebe
    editTask({taskId: task.id, taskNewTitle: newTaskValue});
    //encerro a edicao
    setIsEditing(false);
  }

  useEffect(() => {
    if(textInputRef.current) {
      isEditing 
        ? textInputRef.current.focus()
        : textInputRef.current.blur()      
    }
  },[])
  

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            value={newTaskValue}
            onChangeText={setNewTaskValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          {
            isEditing
              ? (<TouchableOpacity
                  onPress={handleCancelEditing}
                >
                  <Icon name="x" size={24} color="#b2b2b2"/>
                </TouchableOpacity>)
              : (<TouchableOpacity
                  onPress={handleStartEditing}
                >
                  <Image source={editIcon} />
                </TouchableOpacity>)
          }
        </View>
          <View style={styles.iconsDivider}/>
          <TouchableOpacity
            onPress={() => removeTask(task.id)}
            disabled={isEditing}
          >
            <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1}}/>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 24
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196,196,196,0.24)',
    marginHorizontal: 12
  }
})
