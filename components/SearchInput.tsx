import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="James Bond"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => onSearch(query)}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderWidth: 0,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SearchInput;
