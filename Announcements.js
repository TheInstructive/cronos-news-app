import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native'
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import AnnouncementItem from './components/AnnouncementItem';
import messaging from '@react-native-firebase/messaging';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const collection_top = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6849324531484948/3483761816';
const collection_bot = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6849324531484948/9448219145';

const { width, height } = Dimensions.get('window');


export default function Announcements() {
const [currentDetailsId, setCurrentDetailsId] = useState(null);
const route = useRoute();
const { slug } = route.params;

const [data, setData] = useState(null);
const [page, setPage] = useState(0);

const [isSubscribed, setIsSubscribed] = useState(false);
const [collection, setCollection] = useState(null);


useEffect(() => {
  fetch('https://collections.cronos.news/index.json')
    .then((response) => response.json())
    .then((data) => {
      setCollection(data.filter(col => col.slug === slug)[0]);
    })
    .catch((error) => console.log(error));
}, []);


useEffect(() => {
  if (collection) {
    fetch(`https://mellifluous-centaur-e6602b.netlify.app/news?id=${collection.id}&page=${page}`)
      .then(response => response.json())
      .then(data => setData(data));
      checkSubscribe()
  }
}, [collection, page]);

function checkSubscribe(){
  fetch(`https://mellifluous-centaur-e6602b.netlify.app/topics?token=ceBuB-RVSIa54jC9NAFEgs:APA91bEIVwtoy99M92O_x3JSUhX9-sOu0bLvQpktcF9XCXHFaRfeQ7_JlhmBROSaRVCDVVLw71e0rIetsgmK4L43noca2f1Vdkkl89332Irs3tt0sHDQnHGpO7NSAYTlU1JkncOIkKqa`)
  .then(response => response.json())
  .then(data => setIsSubscribed(data.some(col => col === collection.id)));
}

const toggleSubscription = async () => {
  try {
    if (isSubscribed) {
      await messaging().unsubscribeFromTopic(collection.id);
    } else {
      await messaging().subscribeToTopic(collection.id);
    }

    setIsSubscribed(!isSubscribed);
  } catch (error) {
    console.log(error);
  }
}


function getDate(item) {
    return item.timestamp ? new Date(item.timestamp).toLocaleString() : "-";
  }


const handleDetailsToggle = (announcementId) => {
    setCurrentDetailsId(currentDetailsId === announcementId ? null : announcementId);
};




if (collection){
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false} style={styles.scrollView}>

      <View style={styles.newsHeader}>
      <Text numberOfLines={0} ellipsizeMode="tail" style={styles.newsTitle}>News From <Text style={styles.newsTitleBold}>{collection.name}</Text></Text>
      {collection.canSubscribe &&
      <>
      {isSubscribed ? (
      <TouchableOpacity activeOpacity={0.9} style={styles.followButton} onPress={toggleSubscription}><Text style={styles.prevButtonText}> Unfollow </Text></TouchableOpacity>
      ):
      <TouchableOpacity activeOpacity={0.9} style={styles.followButton} onPress={toggleSubscription}><Text style={styles.prevButtonText}> Follow </Text></TouchableOpacity>
      }
      </>
      }
      </View>

      <BannerAd
        unitId={collection_top}
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
                collectionImage = {`https://collections.cronos.news/${collection.image}`}
                announcementAuthor = {announcement.author.tag}
                announcementDate = {getDate(announcement)}
                annouImages = {announcement.media}
                announcementDesc = {announcement.content}
                isDetailsShown = {currentDetailsId === announcement.id}
                onDetailsToggle = {() => handleDetailsToggle(announcement.id)}
                announcementID = {announcement.id}
                colID = {collection.id}
                whichpage = {page}
                ></AnnouncementItem>
            ))
        )}

      {data && data.length  < 1 && 
          <Text style={styles.noAnnou}>NO ANNOUNCEMENTS YET</Text>
      }
      
      </View>

      <View style={styles.pagination}>
      <TouchableOpacity disabled={page === 0} activeOpacity={0.9} style={[styles.prevButton, page === 0 && styles.disabledButton]} onPress={() => setPage(page - 1)}><Text style={styles.prevButtonText}> NEXT </Text></TouchableOpacity>
      <TouchableOpacity disabled={data && data.length  < 10} activeOpacity={0.9} style={[styles.nextButton, data && data.length < 10 && styles.disabledButton]} onPress={() => setPage(page + 1)}><Text style={styles.nextButtonText}> PREVIOUS </Text></TouchableOpacity>
      </View>

      <BannerAd
        unitId={collection_bot}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />

      </ScrollView>
      </SafeAreaView>
  )
}
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
    },

    noAnnou:{
      fontFamily:'medium',
      fontSize:18,
      marginTop:5,
      padding:10,
    }

  });
  