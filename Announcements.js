import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native'
import { useRoute } from '@react-navigation/native';
import { bySlug } from './collections';
import React, { useEffect, useRef, useState } from 'react'
import AnnouncementItem from './components/AnnouncementItem';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const { width, height } = Dimensions.get('window');


export default function Announcements() {
const [currentDetailsId, setCurrentDetailsId] = useState(null);
const route = useRoute();
const { slug } = route.params;

const collection = bySlug(slug);
const [data, setData] = useState(null);
const [page, setPage] = useState(0);

function getDate(item) {
    return item.timestamp ? new Date(item.timestamp).toLocaleString() : "-";
  }

useEffect(() => {
    fetch(`https://mellifluous-centaur-e6602b.netlify.app/news?id=${collection.id}&page=${page}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [collection.id, page]);

const handleDetailsToggle = (announcementId) => {
    setCurrentDetailsId(currentDetailsId === announcementId ? null : announcementId);
};

  const scrollRef = useRef();


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollRef} horizontal={false} style={styles.scrollView}>

      <View style={styles.newsHeader}>
      <Text numberOfLines={0} ellipsizeMode="tail" style={styles.newsTitle}>News From <Text style={styles.newsTitleBold}>{collection.name}</Text></Text>
      </View>

      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      
      <View>
      {data && data.length > 0 && (
            data.map((announcement) => (
                <AnnouncementItem
                key = {announcement.id}
                collectionImage = {collection.image}
                announcementAuthor = {announcement.author.tag}
                announcementDate = {getDate(announcement)}
                annouImages = {announcement.media}
                announcementDesc = {announcement.content}
                isDetailsShown = {currentDetailsId === announcement.id}
                onDetailsToggle = {() => handleDetailsToggle(announcement.id)}
                announcementID = {announcement.id}
                colSlug = {collection.slug}
                ></AnnouncementItem>
            ))
        )}

      {data && data.length  < 1 && 
          <Text>NO ANNOUNCEMENTS YET</Text>
      }
      
      </View>

      <View style={styles.pagination}>
      <TouchableOpacity disabled={page === 0} activeOpacity={0.9} style={[styles.prevButton, page === 0 && styles.disabledButton]} onPress={() => setPage(page - 1)}><Text style={styles.prevButtonText}> Previous Page </Text></TouchableOpacity>
      <TouchableOpacity disabled={data && data.length  < 10} activeOpacity={0.9} style={[styles.nextButton, data && data.length < 10 && styles.disabledButton]} onPress={() => setPage(page + 1)}><Text style={styles.nextButtonText}> Next Page </Text></TouchableOpacity>
      </View>

      </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
    },

    newsTitle:{
      fontFamily:'medium',
      fontSize:18,
      marginTop:5,
      padding:10,
      maxWidth:320,
    },

    newsTitleBold:{
    fontFamily:'bold',
    color:'#002d74'
    },

    pagination:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    },

    prevButton:{
      padding:5,
      backgroundColor:'#002d74',
      marginLeft:20,
      marginBottom:10,
      marginTop:10,
    },

    nextButton:{
      padding:5,
      backgroundColor:'#002d74',
      marginRight:20,
      marginBottom:10,
      marginTop:10,
    },

    prevButtonText:{
        color:'#fff',
        fontFamily:'medium',
    },

    nextButtonText:{
      color:'#fff',
      fontFamily:'medium',
    },

    disabledButton:{
      backgroundColor:'#000'
    },

    newsHeader:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:'100%'
    },

    followButton:{
      padding:5,
      backgroundColor:'#002d74',
      marginRight:10
    }

  });
  