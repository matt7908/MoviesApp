import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { fetchMovies } from '../api/api';
import MovieCard from '../components/MovieCard';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
}

type RootStackParamList = {
  Movies: undefined;
  MovieDetails: { id: number };
};

type MoviesScreenProp = StackNavigationProp<RootStackParamList, 'Movies'>;

const MoviesScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState('popular');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('popular');
  const navigation = useNavigation<MoviesScreenProp>();

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(category);
      setMovies(data);
    };
    getMovies();
  }, [category]);

  return (
    <View style={styles.container}>
      <DropDownPicker
  open={open}
  value={value}
  items={[
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' }
  ]}
  setOpen={setOpen}
  setValue={setValue}
  onChangeValue={(value) => setCategory(value || 'popular')}
  style={{
    borderWidth: 0, // Elimina el borde
    alignSelf: 'center', // Centra el componente en su contenedor
  }}
  dropDownContainerStyle={{
    borderWidth: 0, // Elimina el borde del dropdown
  }}
  labelStyle={{
    fontWeight: 'bold', // Letra en negrilla
    textAlign: 'center', // Texto centrado
  }}
  placeholderStyle={{
    fontWeight: 'bold', // Placeholder en negrilla
    textAlign: 'center', // Placeholder centrado
  }}
/>

      <FlatList
        data={movies}
        renderItem={({ item }: { item: Movie }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer} // Agregar estilo al contenedor de la lista
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default MoviesScreen;
