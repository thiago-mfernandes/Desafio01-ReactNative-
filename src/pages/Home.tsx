import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type taskEditedProps = {
  taskId: number,
  taskNewTitle: string,
}

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    //aqui eu recebei o valor atraves de newTaskTitle
    //console.log(`'Inside function handleAddTask' => input text value: ${newTaskTitle}`);

    //verificando no array tasks, em cada task, vou chamar uma funcao que:
    // retorna true ou false se em cada objeto iterado, o titulo da nova task ja existe
    const findSameTask = tasks.find((task) => {
      return task.title === newTaskTitle;
    })

    if(findSameTask) {
      return Alert.alert('Task já cadastrada.', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    //criei um objeto tipado
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    //salvo a nova informacao junto com a antiga informacao
    // setTasks(oldTasks => [...tasks, receivedTask])
    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    // 1. a funcao vai para dentro da taskList como toggleTaskDOne
    
    //console.log(id);
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
    // alert()

    Alert.alert('Remover Item', 'Tem certeza que você deseja remover o item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const filteredTasks = tasks.filter( task => task.id !== id);
          setTasks(filteredTasks);
        }
      }
    ])
  }

  function handleEditTask({taskId, taskNewTitle}: taskEditedProps) {
    //faco uma copia do array
    const updatedTasks = tasks.map(task => ({...task}));
    //busco se essa task existe
    const taskToBeUpdate = tasks.find(task => task.id === taskId);
    //se nao existir retorno
    if(!taskToBeUpdate) return;
    //se eu encontrar pelo id, essa task recebe um novo titulo vindo do input
    taskToBeUpdate.title = taskNewTitle;
    //atualizo o estado
    setTasks(updatedTasks);
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
        editTask={handleEditTask}
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