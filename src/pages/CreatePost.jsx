import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View,Button, TextInput, ScrollView, TouchableOpacity,Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { accesstoken } from '../../config';


export default function CreatePost() {
  const [isImage, setImagechec] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
   // console.log(`Title: ${title}\nBody: ${body}\nImage: ${image}`);
    uploadImage(image)
  }

  const API_URL = 'http://ec2-54-173-48-20.compute-1.amazonaws.com:1337'; 

const formData = new FormData();
// formData.append('files', image);
// formData.append('data', description)


const uploadImage = async (imageUri) => {
    const apiUrl = API_URL+"/api/upload";
  
    // Create form data object
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'my_image.jpg',
    });
  
    // Send POST request with form data
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer '+accesstoken,
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
  
    const responseData = await response.json();
    const imageUrl = responseData
    console.log(response);

     console.log(imageUrl);
  };
  
// axios.post(
//     'http://ec2-54-173-48-20.compute-1.amazonaws.com:1337/upload',
//     headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: 'Bearer your-auth-token',
//       },
// )

// axios.post(API_URL, formData, {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     Authorization: 'Bearer your-auth-token',
//   },
// })
// .then(response => console.log(response.data))
// .catch(error => console.log(error)); 

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImagechec(true)
        setImage(result.assets[0].uri);
      }
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      { isImage ? <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>Change Image</Text>
      </TouchableOpacity> : <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>Choose an Image</Text>
      </TouchableOpacity> }
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="Ecriver votre message ici"
        multiline={true}
        onChangeText={setBody}
        value={body}
        />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} >
      <Text style={styles.buttonText}>Publish</Text>
    </TouchableOpacity>      
    </View>
  </ScrollView>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    marginTop:35,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
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
  imagePickerButton: {
    backgroundColor: '#e3e3e3',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
});
