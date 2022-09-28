import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface TaskReceivedProps {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    //aqui eu recebei o valor atraves de newTaskTitle
    //console.log(`'Inside function handleAddTask' => input text value: ${newTaskTitle}`);

    //criei um objeto tipado
    const newTask:TaskReceivedProps = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    //salvo a nova informacao junto com a antiga informacao
    // setTasks(oldTasks => [...tasks, receivedTask])
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    // 1. a funcao vai para dentro da taskList como toggleTaskDOne
    
    console.log(id);
    //em uma nova variavel
    //no map, para cada task que tenha seu id === ao vindo por parametro
    //abrir a task, na chave done: negar
    //senao retornar a task intacta para as changedTasks
    const changedTasks = tasks.map(task => task.id === id
      ? {...task, done: !task.done}
      : task
    )
    setTasks(changedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const filteredTasks = tasks.filter( task => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <View style={styles.container}>
      {/* contem a imagem e o contador de tarefas */}
      <Header tasksCounter={tasks.length} />


      {/* a funcao de adicionar uma nova task */}
      <TodoInput addTask={handleAddTask} />


      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})