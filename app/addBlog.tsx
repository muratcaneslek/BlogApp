import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch } from 'react-redux';
import { addBlog } from "./redux/blog-slice";

const AddBlog = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [hasGallery, setHasGallery] = useState<boolean|null>(null);
  const [image, setImage] = useState<string|null> (null);

  const dispatch = useDispatch();

  const [fontsLoaded, fontError] = useFonts({
    'Anta-Regular': require('./assets/fonts/Anta-Regular.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGallery(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri)
      console.log("Image Upload succesfully")
    }
  }

  if (hasGallery === false) {
    return <Text>No access to internal Storage</Text>
  }

  const addBlogs = () => {
    dispatch(addBlog({title: title, description: description, imageUri: image, detail: detail}));
    setDescription('');
    setDetail('');
    setImage('');
    setTitle('');
  }

  return (
    <>
    <LinearGradient
      colors={["#2ecc71", "#4caf50", "#8bc34a"]}
      style={{ flex: 1 }}
    >
        <View onLayout={onLayoutRootView} style={{flex: 1}}>
          <TextInput style={styles.textInputContainer}  multiline placeholder="Please enter blog title" value={title} onChangeText={text => setTitle(text)} />
          <TextInput style={styles.textInputContainer} multiline placeholder="Please enter blog description" value={description} onChangeText={text => setDescription(text)} />
          <TextInput style={styles.textInputContainer} multiline placeholder="Please enter blog detail" value={detail} onChangeText={text => setDetail(text)} />

          <TouchableOpacity style={styles.buttonContainer} onPress={() => pickImage()}>
            <Text style={styles.buttonText} >Select Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonAddBlogContainer} onPress={() => addBlogs()}>
            <Text style={styles.buttonText} >Add Blog</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </>
  );
};

export default AddBlog;

const styles = StyleSheet.create({  
  textInputContainer: {
    borderWidth: 1,
    textAlign: 'center',
    margin: 15,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 5,
  },
  buttonContainer:{
    borderWidth: 1,
    margin:20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  buttonAddBlogContainer:{
    position: 'absolute',
    alignItems: 'center',
    alignSelf:'center',
    padding: 10,
    borderRadius: 100,
    bottom: 5,
    borderWidth: 1,
    width: '90%',
  },
  buttonText:{
    fontFamily: 'Anta-Regular',
    fontSize: 20,
    textAlign: 'center',
  }
})