import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { Task } from '../types/Todo';

interface TodoRowProps {
  item: Task;
  toggleTodo: (id: string) => void;
}

export default function Row({ item, toggleTodo }: TodoRowProps) {
  return (
    <Pressable onPress={() => toggleTodo(item.id)}>
      <View style={styles.todoItem}>
        <Text style={[styles.todoText, item.completed ? styles.completed : null]}>
          {item.text}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 4,
    margin: 4,
    borderColor: '#c1c0c0',
    borderWidth: 8,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center'
  },
  todoText: {
    flex: 1,
    color: 'black'
  },
  completed: {
    textDecorationLine: 'line-through'
  }
});