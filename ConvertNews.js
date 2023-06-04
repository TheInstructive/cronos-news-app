import { View, Text, StyleSheet, Image, Linking } from 'react-native'


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
        return <Text style={styles.timestamp} title="use the website if you want better experience">{new Date(node.timestamp * 1000).toLocaleString()}</Text>;
    }

    if (node.content) {
        return convertNewsNode(node.content);
    }

    console.warn("parser missing node:", node);

    return "<ERROR>";
}


export function convertNews(nodes) {
    if (typeof(nodes) === 'string') {
        return nodes;
    }

    return nodes.flatMap((node, i) => <Text key={i}>{convertNewsNode(node)}</Text>);
}

const styles = StyleSheet.create({

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
  