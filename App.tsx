import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, TouchableOpacity, Modal } from 'react-native';

// Define the TypeScript interface for a Task
interface Task {
  id: string; // A unique identifier for the task, useful for list rendering and future operations.
  title: string; // The title of the task.
  description: string; // A detailed description of the task.
  status: 'pending' | 'completed'; // The current status of the task. Limited to 'pending' or 'completed'.
}

// Hard-coded mock data for tasks
const mockTasks: Task[] = [
  { id: '1', title: 'Learn React Native Basics', description: 'Read official documentation and understand components.', status: 'completed' },
  { id: '2', title: 'Design Task List UI', description: 'Sketch out the layout and elements for the task list screen.', status: 'pending' },
  { id: '3', title: 'Implement Add Task Feature', description: 'Create a form to add new tasks and connect to state.', status: 'pending' },
  { id: '4', title: 'Set Up Navigation', description: 'Integrate Expo Router for moving between screens.', status: 'pending' },
  { id: '5', title: 'Refactor Code for Readability', description: 'Improve code organization and use meaningful names.', status: 'pending' },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false); // State to control modal visibility
  const [currentEditingTask, setCurrentEditingTask] = useState<Task | null>(null); // State to hold the task being edited


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
    <View style={styles.taskItem}>
      <View style={styles.taskItemContent}>
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
          {/* Add an Edit button */}
          <Button title="Edit" onPress={() => handleEditTask(item)} color="#007bff" /> {/* Blue color for edit */}
          <View style={{ width: 10 }} /> {/* Spacer between buttons */}
          {/* Existing Delete button */}
          <Button title="Delete" onPress={() => handleDeleteTask(item.id)} color="#ff3b30" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header for the task list */}
      <Text style={styles.header}>My Personal Tasks</Text>

      {/* Task Input Form Section */}
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
          multiline // Allow multiple lines for description
        />
        <Button title="Add Task" onPress={handleAddTask} />
      </View>

      {/* FlatList component to render the list of tasks */}
      <FlatList
        data={tasks} // The array of data to display
        renderItem={renderTaskItem} // The function that renders each item in the list
        keyExtractor={(item) => item.id} // A function to extract a unique key for each item, crucial for performance
        contentContainerStyle={styles.listContent} // Apply padding to the content inside the FlatList
      />

      {/* Edit Task Modal */}
      <Modal
        animationType="slide" // Slide from bottom
        transparent={true} // Allow background to be semi-transparent
        visible={isEditModalVisible} // Control visibility with state
        onRequestClose={() => { // Required for Android back button handling
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
              style={styles.textInput} // Reusing the same text input style
              placeholder="Task Title"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <TextInput
              style={styles.textInput} // Reusing the same text input style
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
                color="#6c757d" // Gray color for cancel
              />
              <View style={{ width: 10 }} /> {/* Spacer */}
              <Button title="Save" onPress={handleSaveEditedTask} color="#28a745" /> {/* Green color for save */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up all available space.
    backgroundColor: '#f5f5f5', // A light gray background for the entire screen.
    paddingTop: 50, // Adds padding at the top to avoid content being obscured by the status bar.
  },
  header: {
    fontSize: 28, // Large font size for the header.
    fontWeight: 'bold', // Bold text.
    textAlign: 'center', // Center align the text.
    marginVertical: 20, // Vertical margin above and below the header.
    color: '#333', // Dark gray text color.
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 15, // Match list padding
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
    marginBottom: 10, // Space between inputs
    backgroundColor: '#fefefe',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 15, // Horizontal padding for the content inside the FlatList.
  },
  taskItem: {
    backgroundColor: '#ffffff', // White background for each task item.
    padding: 15, // Internal padding within each task item.
    marginVertical: 8, // Vertical margin between task items.
    borderRadius: 10, // Rounded corners for the task item card.
    shadowColor: '#000', // Shadow color for iOS.
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS.
    shadowOpacity: 0.1, // Shadow opacity for iOS.
    shadowRadius: 3, // Shadow blur radius for iOS.
    elevation: 3, // Elevation for Android (creates a shadow effect).
  },
  taskItemContent: { // Style for task item layout to hold text and action buttons
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTextContainer: { // Style for the text area of the task item
    flex: 1, // Allows text to take available space
    marginRight: 10, // Space between text and action buttons
  },
  taskActions: { // Style for task action buttons container
    flexDirection: 'row', // Arrange buttons horizontally
    alignItems: 'center', // Vertically align buttons
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  completedTaskTitle: { // Style for completed tasks (strike-through)
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
  // --- New Styles for Modal ---
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black background overlay
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
    width: '90%', // Modal takes 90% of screen width
    maxHeight: '80%', // Max height for modal content
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
    width: '100%', // Buttons take full width of modal
    paddingHorizontal: 10, // Padding for buttons
  },
  // --- End New Styles for Modal ---
});