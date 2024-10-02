import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchMedia } from '../api/api';
import SearchInput from '../components/SearchInput';
import MovieCard from '../components/MovieCard';
import TVShowCard from '../components/TVShowCard';
import DropDownPicker from 'react-native-dropdown-picker';
import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
  Search: undefined;
  MovieDetails: { id: number };
  TVShowDetails: { id: number };
};


type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
}

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  popularity: number;
}

interface MediaResult extends Movie, TVShow {
  media_type?: 'movie' | 'tv'; 
}

const SearchScreen = () => {
  const [results, setResults] = useState<MediaResult[]>([]);
  const [type, setType] = useState<string>('movie');
  const [open, setOpen] = useState(false);
  const [items] = useState([
    { key: 'movies', label: 'Movies', value: 'movie' }, 
    { key: 'tvshows', label: 'TV Shows', value: 'tv' }, 
    { key: 'any', label: 'Any', value: 'multi' },       
  ]);

 
  const navigation = useNavigation<SearchScreenNavigationProp>();


  const handleSearch = async (query: string) => {
    const data = await searchMedia(query, type); 
    setResults(data); 
  };


  const renderItem = ({ item }: { item: MediaResult }) => {
    if (type === 'multi') {
      if (item.media_type === 'movie') {
        return (
          <MovieCard
            movie={item as Movie}
            onPress={() => navigation.navigate('MovieDetails', { id: item.id })} 
          />
        );
      } else if (item.media_type === 'tv') {
        return (
          <TVShowCard
            show={item as TVShow}
            onPress={() => navigation.navigate('TVShowDetails', { id: item.id })} 
          />
        );
      }
    } else if (type === 'movie') {
      return (
        <MovieCard
          movie={item as Movie}
          onPress={() => navigation.navigate('MovieDetails', { id: item.id })} 
        />
      );
    } else if (type === 'tv') {
      return (
        <TVShowCard
          show={item as TVShow}
          onPress={() => navigation.navigate('TVShowDetails', { id: item.id })} 
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {}
      <DropDownPicker
  open={open}
  value={type}
  items={items}
  setOpen={setOpen}
  setValue={setType}
  zIndex={5000}  
  style={{
    borderWidth: 0,        
    alignSelf: 'center',   
  }}
  dropDownContainerStyle={{
    borderWidth: 0,        
  }}
  labelStyle={{
    fontWeight: 'bold',    
    textAlign: 'center',   
  }}
  placeholderStyle={{
    fontWeight: 'bold',    
    textAlign: 'center',   
  }}
/>

      <SearchInput onSearch={handleSearch} />

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} 
        contentContainerStyle={styles.listContainer}
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

export default SearchScreen;
