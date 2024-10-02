// TVShowCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  popularity: number;
}

interface TVShowCardProps {
  show: TVShow;
  onPress: () => void;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ show, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${show.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{show.name}</Text>
        <Text style={styles.detailsText}>Popularity: {show.popularity}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 0,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TVShowCard;
