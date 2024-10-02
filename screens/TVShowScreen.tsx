import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { fetchTVShows } from '../api/api';
import TVShowCard from '../components/TVShowCard';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  popularity: number;
}

const TVShowsScreen = () => {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [category, setCategory] = useState<string>('popular');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('popular');
  const navigation = useNavigation<any>();

  useEffect(() => {
    const getShows = async () => {
      const data = await fetchTVShows(category);
      setShows(data);
    };
    getShows();
  }, [category]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={[
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
        ]}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={(value) => setCategory(value || 'popular')}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
        labelStyle={styles.label}
        placeholderStyle={styles.placeholder}
      />
      <FlatList
        data={shows}
        renderItem={({ item }) => (
          <TVShowCard
            show={item}
            onPress={() => navigation.navigate('TVShowDetails', { id: item.id })}
          />
        )}
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
  dropdown: {
    borderWidth: 0,
    alignSelf: 'center',
  },
  dropDownContainer: {
    borderWidth: 0,
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default TVShowsScreen;
