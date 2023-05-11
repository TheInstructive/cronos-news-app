import { View, Text, StyleSheet, Image, Linking, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageModal from 'react-native-image-modal';
import { Video, ResizeMode } from 'expo-av';
import FastImage from 'react-native-fast-image'

const { width, height } = Dimensions.get('window');

const timestampFormats = {
    'D': { dateStyle: 'long' },
    't': { timeStyle: 'short' },
    'd': { dateStyle: 'short' },
    'T': { timeStyle: 'medium' },
    'R': { style: 'long', numeric: 'auto' },
    'f': { dateStyle: 'long', timeStyle: 'short' },
    'F': { dateStyle: 'full', timeStyle: 'short' },
};

function automaticRelativeDifference(timestamp) {
    const diff = -((Date.now() - timestamp)/1000)|0;
    const absDiff = Math.abs(diff);
    if (absDiff > 86400*30*10) {
        return { duration: Math.round(diff/(86400*365)), unit: 'years' };
    }
    if (absDiff > 86400*25) {
        return { duration: Math.round(diff/(86400*30)), unit: 'months' };
    }
    if (absDiff > 3600*21) {
        return { duration: Math.round(diff/86400), unit: 'days' };
    }
    if (absDiff > 60*44) {
        return { duration: Math.round(diff/3600), unit: 'hours' };
    }
    if (absDiff > 30) {
        return { duration: Math.round(diff/60), unit: 'minutes' };
    }
    return { duration: diff, unit: 'seconds' };
}

function convertTimestamp(type, timestamp) {
    timestamp *= 1000;

    if (type === 'R') {
        const formatter = new Intl.RelativeTimeFormat(navigator.language || 'en', timestampFormats[type] || {});
        const format = automaticRelativeDifference(timestamp);
        return formatter.format(format.duration, format.unit);
    }
    
    const formatter = new Intl.DateTimeFormat(navigator.language || 'en', timestampFormats[type] || {});
    return formatter.format(new Date(timestamp));
}


function convertNewsNode(node) {
    if (typeof(node) === 'string') {
        return node;
    }

    if (node.type === 'text') {
        return node.content;
    }

    if (node.type === 'twemoji') {
        return node.name;
    }

    if (node.type === 'br') {
        return <Text>{"\n"}</Text>;
    }

    if (node.type === 'user') {
        return <Text style={styles.user}>@{node.tag}</Text>;
    }

    if (node.type === 'here' || node.type === 'everyone') {
        return <Text style={styles.user}>@{node.type}</Text>;
    }

    if (node.type === 'role') {
        return <Text style={[styles.role, {color: node.color, fontFamily:'medium'}]}>@{node.name}</Text>;
    }

    if (node.type === 'channel') {
        return <Text style={styles.channel}>#{node.name}</Text>;
    }

    if (node.type === 'emoji') {
        return <Image source={{uri: node.url}} style={{width: 16, height: 16}} />;
    }

    if (node.type === 'codeBlock') {
        return <Text style={styles.code}>{convertNews(node.content)}</Text>;
    }

    if (node.type === 'blockQuote') {
        return (
            <View style={styles.blockQuote}>
                <Text style={styles.quote}>{convertNews(node.content)}</Text>
            </View>
        );
    }

    if (node.type === 'inlineCode') {
        return <Text style={styles.code}>{convertNews(node.content)}</Text>;
    }

    if (node.type === 'em') {
        return <Text style={styles.em}>{convertNews(node.content)}</Text>;
    }

    if (node.type === 'strong') {
        return <Text style={styles.strong}>{convertNews(node.content)}</Text>;
    }

    if (node.type === 'strikethrough') {
        return <Text style={styles.strikethrough}>{convertNews(node.content)}</Text>;
    }

    if (node.type === 'underline') {
        return <Text style={styles.underline}>{convertNews(node.content)}</Text>;
    }

    if (node.type === 'spoiler') {
        return <Text style={styles.spoiler}>{convertNews(node.content)}</Text>;
    }

    if (node.type === 'url' || node.type === 'autolink') {
        return <Text style={styles.link} onPress={() => Linking.openURL(node.target)}>{convertNews(node.content)}</Text>;
    }

    if (node.type === 'timestamp') {
        return <Text style={styles.timestamp} title={new Date(node.timestamp * 1000).toLocaleString()}>{convertTimestamp(node.format, node.timestamp)}</Text>;
    }

    if (node.content) {
        return convertNewsNode(node.content);
    }

    console.warn("parser missing node:", node);

    return "<ERROR>";
}


function convertNews(nodes) {
    if (typeof(nodes) === 'string') {
        return nodes;
    }

    return nodes.flatMap((node, i) => <Text key={i}>{convertNewsNode(node)}</Text>);
}


export default function AnnouncementItem(props) {
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
      
  return (
    <>
    <View style={styles.newsTable}>
        <FastImage source={{ uri: props.collectionImage, cache: 'immutable' }} style={styles.colImage}/>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.newsAuthor}>{props.announcementAuthor}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.annouDate}>{props.announcementDate}</Text>
        <TouchableOpacity activeOpacity={0.9} style={styles.showButton} onPress={announcementDetails}><Text style={styles.showButtonText} >{showDetails ? "HIDE" : "SHOW" }</Text></TouchableOpacity>
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
  