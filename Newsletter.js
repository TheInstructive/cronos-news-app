import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions,ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import FastImage from 'react-native-fast-image'
import {fetchCollectionData} from './FetchData'

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const main_ad = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6849324531484948/5124996605';

const { width, height } = Dimensions.get('window');


export default function App() {
  const navigation = useNavigation();

  const handlePress = (slug) => {
    navigation.navigate('Announcement', {slug});
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [collections, setCollections] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  const handleSearch = (searchText) => {
    setSearchTerm(searchText.toLowerCase());
  };

  const handleTag = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags((tags) => tags.filter((tag) => tag !== value));
    } else {
      setSelectedTags((tags) => [...tags, value]);
    }
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const collectionData = await fetchCollectionData();
        setCollections(collectionData);
        setAvailableTags([...collectionData.reduce((ret, col) => new Set([...ret, ...col.tag.split(', ')]), new Set())]);
      } catch (error) {
        console.log(error)
      }
    };
  
    fetchCollection();
  }, []);

  useEffect(() => {
    const filteredBySearch = collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchTerm)
    );
  
    const filteredByTags =
      selectedTags.length > 0
        ? filteredBySearch.filter((collection) =>
            collection.tag && selectedTags.some((tag) => collection.tag.includes(tag))
          )
        : filteredBySearch;
  
    setFilteredCollections(filteredByTags);
  }, [searchTerm, selectedTags, collections]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false} style={styles.scrollView}>
      <View style={styles.content}>
      <BannerAd
        unitId={main_ad}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
        <TextInput style={styles.searchBar} onChangeText={(text) => handleSearch(text)} placeholder='SEARCH PROJECT'></TextInput>

    <View style={styles.collectionTags}>
    {availableTags.map((tag, idx) => (
      <View key={idx} style={[styles.collectionTag, selectedTags.includes(tag) && styles.selectedTag]}>
        <Checkbox
          style={styles.tagInput}
          value={selectedTags.includes(tag)}
          onValueChange={() => handleTag(tag)}
        />
        <Text style={styles.tagText}>{tag}</Text>
      </View>
    ))}
    </View>

        <View style={styles.collectionItems}> 
          {filteredCollections.map((collection, idx) => (
            <TouchableOpacity key={idx} activeOpacity={0.9} onPress={() => handlePress(collection.slug)}>
            <View style={styles.collectionItem} key={collection.name}>
              <Text style={styles.collectionNameText}>{collection.name}</Text>
              <FastImage
              source={{
                uri: `https://collections.cronos.news/${collection.image}`,
                cache: 'immutable'
              }} 
              style={{width: 100, height: 100}}
              />
              <View style={styles.selectButton}>
              <Text style={styles.selectButtonText}> SELECT </Text>
              </View>
            </View>
            </TouchableOpacity>
          ))}
        </View>

      </View>
      </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  content:{
    width:'100%',
  },

  collectionItems:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center'
  },

  collectionItem:{
    width:width/3.6,
    textAlign:'center',
    margin:10,
    minHeight:180,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    borderColor:'#002d74',
    borderWidth:1,

  },

  searchBar:{
    padding:10,
    borderRadius:50,
    borderWidth:1,
    width:width-20,
    alignSelf:'center',
    borderColor:'#002d74',
    fontFamily:'medium',
    paddingLeft:20,
    marginTop:20,
    marginBottom:10,

  },

  collectionTags:{
    width:'99%',
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    marginBottom: 10,
  },

  collectionTag:{
    backgroundColor:'#f2f2f2',
    padding:6,
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    display:'flex',
    flexDirection:'row'
  },

  selectedTag: {
    borderWidth:2,
    borderColor:'#002d74'
  },

  tagInput: {
    marginRight:10,
    borderColor:'#002d74',
    borderRadius:0
  },

  tagText:{
    fontFamily:'medium',
    color:'black'
  },

  collectionNameText:{
    marginTop:0.5,
    fontFamily:'medium',
    textAlign:'center',
    fontSize:10,

  },

  selectButton:{
    backgroundColor:'#002d74',
    padding:5,
    width:'80%',
  },

  selectButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'bold',
    fontSize:12,
  }


});
