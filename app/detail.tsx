import { StyleSheet, Text, View, Button } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import React from 'react';

// Define the TypeScript interface for a Task (can be moved to a shared file later for better organization)
interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
}

export default function TaskDetailScreen() {
    // useLocalSearchParams hook to get parameters passed through the URL (e.g., from index.tsx)
    const { id, title, description, status } = useLocalSearchParams();
    const router = useRouter(); // Hook to get the router object for navigation actions

    // Reconstruct task object from the received parameters.
    // Type casting (as string) is used because useLocalSearchParams returns unknown/string | string[]
    const task: Task = {
        id: id as string,
        title: title as string,
        description: description as string,
        // Ensure status is correctly typed as 'completed' or 'pending'
        status: status === 'completed' ? 'completed' : 'pending',
    };

    return (
        <View style={styles.container}>
            {/* Stack.Screen options to customize the header for this specific screen. */}
            {/* This will set the title in the navigation bar and ensure the header is visible. */}
            <Stack.Screen options={{ title: "Task Details", headerShown: true }} />

            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.status}>Status: {task.status === 'completed' ? 'Completed' : 'Pending'}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Go Back" onPress={() => router.back()} />
                {/* You could add an edit button specific to the detail screen here later if desired */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        alignItems: 'center', // Center content horizontally in the view
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    description: {
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    status: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007bff',
        marginBottom: 30,
    },
    buttonContainer: {
        marginTop: 20,
        width: '80%', // Make button container take 80% width
    }
});