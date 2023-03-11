import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, RefreshControl  } from 'react-native';
import { accesstoken } from '../config';
import PostItem from './pages/PostItem';

export default function Home(props) {
    const [isloading, setloading] = useState(true)
    var [posts, setposts] = useState([])
    var datas = []
    const [refreshing, setRefreshing] = useState(false);
    const [loadinit, setloadinit] = useState(false)
    const [page, setpage] = useState(1)
    const [totalpage, settotalpage] = useState(0)

    const onRefresh = () => {
      setRefreshing(true);
      // Call the API or fetch data
      setpage(2);
      console.log(page);
      getpost();
    };
  
  
    const goToCreate = () => {
      
            props.navigation.navigate('Create')
        };

        useEffect(() => {
            console.log();
           getpost();
          }, [])
          const getpost = async ()=>{
            
            await fetch('http://ec2-54-173-48-20.compute-1.amazonaws.com:1337/api/posts?populate=*&pagination[page]='+page+'&pagination[pageSize]=2', {
                headers: {
                  'Authorization': 'Bearer '+accesstoken
                }
              })
                .then(response => response.json())
                .then(data => {
                    setposts(data?.data)
                   // console.log(data?.data)
                    settotalpage(data?.meta.pagination.total)
                    
                        setpage(2)
                    
                   // console.log(totalpage);
                })
                .catch(error => {
                    fetch('../data.json')
                    .then(response => response.json())
                    .then(data =>  setposts(data?.data))
                    .catch(error => console.error(error));
                  console.error(error)
                })

            setRefreshing(false);
            
          }
          const fetchNextData = async () => {
        
              await fetch('http://ec2-54-173-48-20.compute-1.amazonaws.com:1337/api/posts?populate=*&pagination[page]=1&pagination[pageSize]='+page, {
                headers: {
                  'Authorization': 'Bearer '+accesstoken
                }
              })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    // posts = [...Array.from(data.data)]
                    //setposts([])
                    setposts(data.data);
                    if (page < totalpage-1) {
                        setpage(page+1)
                    }
                    //console.log(posts);
                })
                .catch(error => {
                    getpost()
                  console.error(error)
                }) 
            
          };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Button title="Create new post" onPress={goToCreate } />
      </View>  
      <View style={styles.postsContainer}>
    <FlatList
          data={posts}
          renderItem={({ item }) =>
        //   <Text>{item.attributes.imagepost.data.attributes.url}</Text>  
           <PostItem post={item} props={props}/>
        }
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={fetchNextData}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postsContainer: {
    flex: 1,
    padding: 16,
  },
});




































// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import { StyleSheet, View, Button, TextInput, ScrollView, TouchableOpacity, Text, Image } from 'react-native';


// class HomePageprops{
//     navigation
// }

// export default function HomePage(props) {

//     //const navigation = useNavigation
//     const goToCreate = () => {
      
//         props.navigation.navigate('Create')
//     };

//     return (
    
//             <View>
//                 <Button title="Go to details" onPress={goToCreate } />
//             </View>
     
//     )
// }