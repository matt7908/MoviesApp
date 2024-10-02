import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchSingleTVShow } from '../api/api';
import { RouteProp } from '@react-navigation/native';

interface TVShow {
  name: string;
  overview: string;
  popularity: number;
  first_air_date: string;
  poster_path: string;
}

type RootStackParamList = {
  TVShowDetails: { id: number };
};

interface TVShowDetailsScreenProps {
  route: RouteProp<RootStackParamList, 'TVShowDetails'>;
}

const TVShowDetailsScreen = ({ route }: TVShowDetailsScreenProps) => {
  const { id } = route.params;

  const [tvShow, setTVShow] = useState<TVShow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTVShowDetails = async () => {
      try {
        const data = await fetchSingleTVShow(id);
        console.log('API Data:', data);
        setTVShow(data);
      } catch (error) {
        console.error('Error fetching TV show:', error);
      } finally {
        setLoading(false);
      }
    };

    getTVShowDetails();
  }, [id]);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {tvShow ? (
        <>
          {tvShow.poster_path ? (
            <Image 
              source={{ uri: `${imageBaseUrl}${tvShow.poster_path}` }} 
              style={styles.image} 
              resizeMode="cover" 
            />
          ) : (
            <Text>No image available</Text>
          )}
          <Text style={styles.title}>{tvShow.name}</Text>
          <Text>{tvShow.overview || 'No overview available'}</Text>
          <Text>Popularity: {tvShow.popularity}</Text>
          <Text>First Air Date: {tvShow.first_air_date || 'Unknown'}</Text>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
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
    textAlign: 'center',
  },
});

export default TVShowDetailsScreen;
