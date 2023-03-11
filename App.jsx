import React, { useState } from 'react';
import { StyleSheet, View,Button, TextInput, ScrollView, TouchableOpacity,Text, Image } from 'react-native';
import CreatePost from './src/pages/CreatePost';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/HomePage';
import PageDetail from './src/pages/pagedetaille';

const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Accueil">
      <Stack.Screen name="Accueil" component={HomePage} />
      <Stack.Screen name="Create" component={CreatePost} />
      <Stack.Screen name="detail" component={PageDetail} />
    </Stack.Navigator>
  </NavigationContainer>  
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
