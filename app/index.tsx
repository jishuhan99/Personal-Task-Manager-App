import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router'; // IMPORTANT: useRouter for navigation

// Define the TypeScript interface for a Task
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

// Hard-coded mock data for tasks
const mockTasks: Task[] = [
  { id: '1', title: 'Learn React Native Basics', description: 'Read official documentation and understand components.', status: 'completed' },
  { id: '2', title: 'Design Task List UI', description: 'Sketch out the layout and elements for the task list screen.', status: 'pending' },
  { id: '3', title: 'Implement Add Task Feature', description: 'Create a form to add new tasks and connect to state.', status: 'pending' },
  { id: '4', title: 'Set Up Navigation', description: 'Integrate Expo Router for moving between screens.', status: 'pending' },
  { id: '5', title: 'Refactor Code for Readability', description: 'Improve code organization and use meaningful names.', status: 'pending' },
];

export default function Page() { // Expo Router uses 'Page' for screen components
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false); // State to control modal visibility
  const [currentEditingTask, setCurrentEditingTask] = useState<Task | null>(null); // State to hold the task being edited

  const router = useRouter(); // Initialize router for navigation from this screen

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      Alert.alert('Validation Error', 'Task title cannot be empty!');
      return;
    }

    const newId = String(tasks.length > 0 ? Math.max(...tasks.map(task => Number(task.id))) + 1 : 1);
    const newTask: Task = {
      id: newId,
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'pending',
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  // Function to toggle a task's status (pending/completed)
  const handleToggleTaskStatus = (taskId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  // Function to delete a task
  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // Function to open the edit modal and set the task to be edited
  const handleEditTask = (task: Task) => {
    setCurrentEditingTask(task); // Set the task to be edited
    setNewTaskTitle(task.title); // Pre-fill the title input
    setNewTaskDescription(task.description); // Pre-fill the description input
    setIsEditModalVisible(true); // Show the modal
  };

  // Function to save the edited task
  const handleSaveEditedTask = () => {
    if (!currentEditingTask) return; // Should not happen if modal is open correctly

    if (newTaskTitle.trim() === '') {
      Alert.alert('Validation Error', 'Task title cannot be empty!');
      return;
    }

    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === currentEditingTask.id
          ? { ...task, title: newTaskTitle, description: newTaskDescription }
          : task
      )
    );

    // Close modal and clear editing states
    setIsEditModalVisible(false);
    setCurrentEditingTask(null);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  // This function tells FlatList how to render each individual task item.
  const renderTaskItem = ({ item }: { item: Task }) => (
    // Wrap the entire task item in TouchableOpacity for navigation to detail screen
    <TouchableOpacity
      style={styles.taskItem} // This style is for the whole item container
      onPress={() => router.push({ // Navigate to the detail screen on press
        pathname: `/detail`, // Path to your detail screen (app/detail.tsx)
        params: { id: item.id, title: item.title, description: item.description, status: item.status }
      })}
    >
      <View style={styles.taskItemContent}>
        {/* This inner TouchableOpacity handles toggling task status */}
        <TouchableOpacity onPress={() => handleToggleTaskStatus(item.id)} style={styles.taskTextContainer}>
          <Text style={[
            styles.taskTitle,
            item.status === 'completed' && styles.completedTaskTitle
          ]}>
            {item.title}
          </Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
          <Text style={styles.taskStatus}>Status: {item.status === 'completed' ? 'Completed' : 'Pending'}</Text>
        </TouchableOpacity>
        <View style={styles.taskActions}>
          <Button title="Edit" onPress={() => handleEditTask(item)} color="#007bff" />
          <View style={{ width: 10 }} />
          <Button title="Delete" onPress={() => handleDeleteTask(item.id)} color="#ff3b30" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Personal Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Task Title"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Task Description"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
          multiline
        />
        <Button title="Add Task" onPress={handleAddTask} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => {
          setIsEditModalVisible(false);
          setCurrentEditingTask(null);
          setNewTaskTitle('');
          setNewTaskDescription('');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Task Title"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Task Description"
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
              multiline
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => {
                  setIsEditModalVisible(false);
                  setCurrentEditingTask(null);
                  setNewTaskTitle('');
                  setNewTaskDescription('');
                }}
                color="#6c757d"
              />
              <View style={{ width: 10 }} />
              <Button title="Save" onPress={handleSaveEditedTask} color="#28a745" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles for the main screen (index.tsx)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fefefe',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    lineHeight: 20,
  },
  taskStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#007bff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});