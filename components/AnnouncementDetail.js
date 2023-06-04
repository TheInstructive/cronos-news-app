import { View, Text, StyleSheet, Image, Linking, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { convertNews } from '../ConvertNews'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import ImageModal from 'react-native-image-modal';
import { Video, ResizeMode } from 'expo-av';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import {fetchNewsData, fetchCollectionData} from '../FetchData'

const { width, height } = Dimensions.get('window');
const details_ad = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6849324531484948/5918353464';


export default function AnnouncementDetail() {
  const route = useRoute();
  const {annouid, colid, apage} = route.params;

  const [collection, setCollection] = useState(null);
  const [data, setData] = useState(null);
  const [imageNum, setimageNum] = useState(0)

  const [announcemenetContent, setAnnouncemenetContent] = useState("");

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const collectionData = await fetchCollectionData();
        setCollection(collectionData.filter(col => col.id === colid)[0]);
      } catch (error) {
        console.log(error)
      }
    };

    fetchCollection();
  }, []);
  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await fetchNewsData(collection.id, apage);
        const filteredData = newsData.filter((item) => item.id === annouid);
        setData(filteredData);
        const content = convertNews(filteredData[0].content);
        setAnnouncemenetContent(content);

      } catch (error) {
        console.log(error)
      }
    };

    if (collection) { fetchNews(); }
  }, [collection, apage]);


  function nextImage(){
    if(imageNum === data[0].media.length-1){return}
    else{setimageNum(imageNum+1)}
  }

  function prevImage(){
      if(imageNum === 0){return}
      else{setimageNum(imageNum-1)}
  }

  function getDate(item) {
    return item.timestamp ? new Date(item.timestamp).toLocaleString() : "-";
  }

if(collection && data){
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView horizontal={false} style={styles.scrollView}>
    <View style={styles.newsTable}>
        <Image style={styles.colImage} source={{uri:`https://collections.cronos.news/${collection.image}`}} alt="Collection"></Image>

        <View style={styles.collectionHeader}>
          <Text style={styles.collname} numberOfLines={1} ellipsizeMode="tail">{collection.name}</Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.authortag}>{data[0].author.tag}</Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.annouDate}>{getDate(data[0])}</Text>
        </View>

    </View>

    <View style={styles.newsDetails}>
            {data && data[0].media.length > 0 &&
            <View style={styles.imageGallery}>
                {data[0].media[0].type === 'image' && (
                <ImageModal
                    resizeMode="contain"
                    imageBackgroundColor="#000000"
                    style={{
                    width: width,
                    height: 200,
                    }}
                    source={{
                    uri: data[0].media[imageNum].url,
                    }}
                />
                )}

                {data[0].media[0].type === 'video' && (
                  <Video
                    style={styles.video}
                    source={{
                    uri: data[0].media[imageNum].url,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                />
                )}

                {data[0].media.length > 1 &&
                    <View style={styles.mediaControlPanel}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.prevButton} onPress={prevImage}><Text style={styles.prevButtonText}> PREV </Text></TouchableOpacity>
                    <Text style={{fontFamily:'bold'}}>{imageNum+1}/{data[0].media.length}</Text>
                    <TouchableOpacity activeOpacity={0.9} style={styles.nextButton} onPress={nextImage}><Text style={styles.nextButtonText}> NEXT </Text></TouchableOpacity>
                    </View>
                }
            </View>
            }
            <View style={styles.newsContent}>
                <Text style={styles.contentText}>{announcemenetContent}</Text>
            </View>
            
            <BannerAd
                  unitId={details_ad}
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                  }}
                />
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}
}
const styles = StyleSheet.create({
  newsTable:{
      width: width,
      height: width/6,
      display:'flex',
      flexDirection:'row',
      backgroundColor:'#fff',
      alignItems:'center'
  },
  
  newsDetails:{
      backgroundColor:'#fff',
  },

  colImage:{
      width: 50, 
      height: 50,
      marginLeft:10,
  },

  video:{
      width:width,
      height:200,
  },

  mediaControlPanel:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:5,
  },

  prevButton:{
      padding:10,
      backgroundColor:'#002d74',
      marginLeft:20,
  },

  prevButtonText:{
      color:'#fff',
      fontFamily:'medium',
  },

  nextButton:{
      padding:10,
      backgroundColor:'#002d74',
      marginRight:20,
  },

  nextButtonText:{
      color:'#fff',
      fontFamily:'medium',
  },


  contentText:{
      padding:20,
      fontFamily:'regular',
  },

  collname:{
    fontFamily:'bold',
    fontSize: 15
  },

  newsAuthor:{
      fontFamily:'regular',
  },

  annouDate:{
      fontFamily:'regular',
      fontSize:12
  },

  authortag:{
    fontFamily:'regular',
    fontSize:12
  },

  collectionHeader:{
    marginLeft:20,
  },

  showButton:{
      backgroundColor:'#002d74',
      marginRight:20,
      padding:10
  },

  showButtonText:{
      color:'#fff',
      fontFamily:'bold',
  },
});
