import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Task } from './types/Todo';
import Row from './components/Row';

const STORAGE_KEY = 'TODO_LIST_ITEMS';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');

  const addTodo = () => {
    if (input.trim()) {
      setTasks(prev => [
        ...prev,
        { id: Date.now().toString(), text: input.trim(), completed: false }
      ]);
      setInput('');
    }
  };

  const toggleTodo = (id: string) => {
    setTasks(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  useEffect(() => {
     (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setTasks(JSON.parse(json));
      } catch (e) {
        console.log(e);
      } 
      })();
    }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add task"
        />
        <Button title="Add" onPress={addTodo} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Row item={item} toggleTodo={toggleTodo} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'black'
  },
   inputRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    color: 'black'
  }
});