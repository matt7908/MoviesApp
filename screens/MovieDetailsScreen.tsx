import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchSingleMovie } from '../api/api';
import { RouteProp } from '@react-navigation/native';

interface Movie {
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  poster_path: string;
}

type RootStackParamList = {
  MovieDetails: { id: number };
};

interface MovieDetailsScreenProps {
  route: RouteProp<RootStackParamList, 'MovieDetails'>;
}

const MovieDetailsScreen = ({ route }: MovieDetailsScreenProps) => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchSingleMovie(id);
      setMovie(data);
    };
    getMovieDetails();
  }, [id]);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <View style={styles.container}>
      {movie ? (
        <>
          <Image
            source={{ uri: `${imageBaseUrl}${movie.poster_path}` }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{movie.title}</Text>
          <Text>{movie.overview}</Text>
          <Text>Popularity: {movie.popularity}</Text>
          <Text>Release Date: {movie.release_date}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    margin: 32,
  },
  image: {
    width: 300,
    height: 450,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MovieDetailsScreen;
