import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const AddBlog = () => {
  const [hasGallery, setHasGallery] = useState<boolean|null>(null);
  const [image, setImage] = useState<string|null> (null);

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
    }
  }

  if (hasGallery === false) {
    return <Text>No access to internal Storage</Text>
  }

  return (
    <View>
      <Button title="ImagePicker" onPress={() => pickImage()} />
    </View>
  );
};

export default AddBlog;
