import { View, Text, StyleSheet, Image, Linking, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ImageModal from 'react-native-image-modal';
import { Video, ResizeMode } from 'expo-av';
import { convertNews } from '../ConvertNews';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function AnnouncementItem(props) {
    const annouid = props.announcementID
    const collslug = props.colSlug
    const navigation = useNavigation();
    const [showDetails, setshowDetails] = useState(false)
    const [imageNum, setimageNum] = useState(0)

    const announcementImages = props.annouImages
    const { announcementDesc } = props;
    const content = convertNews(announcementDesc);

    function nextImage(){
        if(imageNum === announcementImages.length-1){return}
        else{setimageNum(imageNum+1)}
    }
    
    function prevImage(){
        if(imageNum === 0){return}
        else{setimageNum(imageNum-1)}
    }
    

    useEffect(() => {
        setshowDetails(props.isDetailsShown);
      }, [props.isDetailsShown]);
    
    const announcementDetails = () => {
        props.onDetailsToggle();
        setshowDetails(!showDetails);
    };
    

    const goDetails = () => {
        navigation.navigate('AnnouncementDetail', { annouid: annouid, collslug: collslug });
    };
      
      
  return (
    <>
    <View style={styles.newsTable}>
        <Image style={styles.colImage} source={props.collectionImage} alt="Collection"></Image>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.newsAuthor}>{props.announcementAuthor}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.annouDate}>{props.announcementDate}</Text>
        <TouchableOpacity activeOpacity={0.9} style={styles.showButton} onPress={announcementDetails}><Text style={styles.showButtonText} >{showDetails ? "HIDE" : "SHOW" }</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.linkButton} onPress={goDetails}><Text style={styles.showButtonText} >🔗</Text></TouchableOpacity>
    </View>

        {showDetails && 

        <View style={styles.newsDetails}>
            {announcementImages.length > 0 &&
            <View style={styles.imageGallery}>
                {announcementImages[imageNum].type === 'image' && (
                <ImageModal
                    resizeMode="contain"
                    imageBackgroundColor="#000000"
                    style={{
                    width: width,
                    height: 200,
                    }}
                    source={{
                    uri: announcementImages[imageNum].url,
                    }}
                />
                )}

                {announcementImages[imageNum].type === 'video' && (
                  <Video
                    style={styles.video}
                    source={{
                    uri: announcementImages[imageNum].url,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                />
                )}

                {announcementImages.length > 1 &&
                    <View style={styles.mediaControlPanel}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.prevButton} onPress={prevImage}><Text style={styles.prevButtonText}> PREV </Text></TouchableOpacity>
                    <Text style={{fontFamily:'bold'}}>{imageNum+1}/{announcementImages.length}</Text>
                    <TouchableOpacity activeOpacity={0.9} style={styles.nextButton} onPress={nextImage}><Text style={styles.nextButtonText}> NEXT </Text></TouchableOpacity>
                    </View>
                }
            </View>
            }
            <View style={styles.newsContent}>
                <Text style={styles.contentText}>{content}</Text>
            </View>
        </View>

        }
    </>
  )
}

const styles = StyleSheet.create({
    newsTable:{
        width: width,
        height: width/6,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
        marginTop:10,
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

    newsAuthor:{
        fontFamily:'regular',
        width:100,
    },

    annouDate:{
        fontFamily:'regular',
        width:100,
        textAlign:'center'
    },

    showButton:{
        backgroundColor:'#002d74',
        marginRight:20,
        padding:10
    },

    linkButton:{
        backgroundColor:'#ebebeb',
        marginRight:20,
        padding:10
    },

    showButtonText:{
        color:'#fff',
        fontFamily:'bold',
    },

    link:{
        color:'#00A8FC',
        fontFamily:'bold',
    },

    user:{
        backgroundColor:'#3D4270',
        color:'#fff',
        borderRadius:2,
    },

    channel:{
        backgroundColor:'#3D4270',
        color:'#fff',
        borderRadius:2,
    },

    code:{
        backgroundColor:'#2B2D31',
        borderWidth:1,
        borderColor:'#1E1F22',
        borderRadius:5,
    },

    blockQuote:{
        margin:0,
        borderLeftColor:'#4E5058',
        borderLeftWidth:3,
        paddingLeft:6,
    },

    em:{
        fontFamily:'italic'
    },

    strong:{
        fontFamily:'bold',
    },

    strikethrough:{
        textDecorationLine: 'line-through'
    },

    underline:{
        textDecorationLine:'underline'
    },

    spoiler:{
        backgroundColor:'#444',
        color:'#f2f2f2',
        padding:2,
    },

    timestamp:{
        color:'#fff',
        backgroundColor:'#002d74'
    }


  });
  