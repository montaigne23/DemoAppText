import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PageDetail({ route }) {
    const { post } = route.params;
    const [comments, setComments] = useState([ ]);
    const [newComment, setNewComment] = useState('');

    //setComments(post?.attributes.commentaires.data)

    const handleAddComment = () => {
      const newId = comments.length + 1;
      const currentDate = new Date().toISOString().slice(0, 10);
      const newCommentObject = { id: newId,
      attributes: {
          message: newComment,
          createdAt: currentDate,
          updatedAt: currentDate,
          publishedAt: currentDate
      }};
      setComments([...comments, newCommentObject]);
      setNewComment('');
    };
  
    const handleDeleteComment = (commentId) => {
      const filteredComments = comments.filter(comment => comment.id !== commentId);
      setComments(filteredComments);
    };
  
    const handleEditComment = (commentId, newText) => {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          comment.text = newText;
        }
        return comment;
      });
      setComments(updatedComments);
    };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.body}>{post?.attributes.description}</Text>
        {post?.attributes.imagepost.data != null ?  <Image source={{ uri: 'http://ec2-54-173-48-20.compute-1.amazonaws.com:1337' + post?.attributes.imagepost.data.attributes.url }} style={styles.image} /> : null}
      </View>
      <View style={styles.iconContainer}>
        <Icon name="thumbs-up" size={30} color="blue" />
        <Text style={styles.iconText}>1</Text>
        <View style={{ width: 135 }} />
        <Icon name="comment" size={30} color="green" />
        <Text style={[styles.iconText, { marginLeft: 4 }]}>{post?.attributes.commentaires.data.length !=0 ? <Text style={styles.iconText}>{post?.attributes.commentaires.data.length}</Text>:<Text style={styles.iconText}>0</Text>}</Text>
      </View>
      <View style={{ width: 35, height: 35 }} />
      {post?.attributes.commentaires.data.map(comment => (
        <View key={comment.id} style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment.attributes.message}</Text>
          <View style={styles.commentInfo}>
            <Text style={styles.commentDate}>{comment.attributes.createdAt}</Text>
            <TouchableOpacity onPress={() => handleEditComment(comment.id, "Nouveau texte")}>
              <Text style={styles.commentEdit}>Modifier</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
              <Text style={styles.commentDelete}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={styles.newCommentContainer}>
        <TextInput
          style={[styles.input, styles.bodyInput]}
          placeholder="Ajouter un commentaire..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Text style={styles.newCommentButton}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </View>
       </ScrollView>
 
  );
} 

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontSize: 16,
      },
      bodyInput: {
        height: 120,
        textAlignVertical: 'top',
        paddingTop: 16,
      },
    commentContainer: {
        marginBottom: 16,
      },
      commentText: {
        fontSize: 16,
        marginBottom: 8,
      },
      commentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      commentDate: {
        fontSize: 12,
        marginRight: 16,
      },
      commentEdit: {
        fontSize: 12,
        marginRight: 16,
        color: '#007AFF',
      },
      commentDelete: {
        fontSize: 12,
        color: '#FF3B30',
      }, newCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
     
    justifyContent: 'space-between',
    marginTop: 16,
    },
    newCommentInput: {
    flex: 1,
    height: 40,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    },
    newCommentButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    },
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
  }
});
