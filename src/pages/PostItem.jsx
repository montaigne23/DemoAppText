import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function PostItem({ post, props }) {

  const goToDetails = () => {
   props.navigation.navigate('detail', { post: post})
};

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.body}>{post?.attributes.description}</Text>
        {post?.attributes.imagepost.data != null ?  <Image source={{ uri: 'http://ec2-54-173-48-20.compute-1.amazonaws.com:1337' + post?.attributes.imagepost.data.attributes.url }} style={styles.image} /> : null}
      </View>
      <View style={styles.iconContainer}>
        <Icon name="thumbs-up" size={30} color="blue" />
        <Text style={styles.iconText}>3</Text>
        <View style={styles.iconSpacing} />
        <Icon name="comment" onPress={goToDetails} size={30} color="green" />
        {post?.attributes.commentaires.data.length !=0 ? <Text style={styles.iconText}>{post?.attributes.commentaires.data.length}</Text>:<Text style={styles.iconText}>0</Text>}
      </View>
    </View>
  );
} 

const styles = StyleSheet.create({
    iconSpacing: {
        width: 138,
      },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconText: {
        marginLeft: 4,
        fontSize: 16,
      },
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyContainer: {
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 8,
  },
});
