import React, { useCallback, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSelector } from "react-redux";
import { BlogState } from "./type/typeBlog";
import { LinearGradient } from "expo-linear-gradient";
import { FlashList } from "@shopify/flash-list";
import Modal from 'react-native-modal';

interface ShoppingCartProps {
  item: {
    imageUri: string;
    title: string;
    description: string;
    detail: string;
  };
  onPress: () => void;
}

const dimensions = Dimensions.get("screen");

const ShoppingCart: React.FC<ShoppingCartProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: item.imageUri }} style={styles.image} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Home: React.FC = () => {
  const blogs = useSelector((state: { blog: BlogState }) => state.blog.blogs);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <LinearGradient
        colors={["#2ecc71", "#4caf50", "#8bc34a"]}
        style={{ flex: 1 }}
      >
        <View onLayout={onLayoutRootView}>
            {blogs.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>
              Your blog is empty.
            </Text>
            <Text style={styles.emptyCartText}>
            Please enter a blog.
            </Text>
          </View>
        ) : (
            <FlatList
            data={blogs}
            renderItem={({ item }) => (
              <ShoppingCart
                item={item}
                onPress={() => handleItemPress(item)}
              />
            )}
            keyExtractor={(item) => item.title}
          />
        )}
          
        </View>
      </LinearGradient>

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedItem?.imageUri }} style={styles.modalImage} />
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            <Text style={styles.modalDescription}>{selectedItem?.description}</Text>
            <Text style={styles.modalDetail}>{selectedItem?.detail}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 0,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#f6dbc6",
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Anta-Regular',
    fontSize: 18,
    color: "black",
    marginLeft: 60,
  },
  description: {
    fontFamily: 'Anta-Regular',
    fontSize: 18,
    color: "black",
    margin: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  modalContentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  modalTitle: {
    fontFamily: 'Anta-Regular',
    fontSize: 20,
    color: 'black',
  },
  modalDescription: {
    fontFamily: 'Anta-Regular',
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  modalDetail:{
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  emptyCartContainer: {
    height: dimensions.height/1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartText: {
    fontFamily: 'Anta-Regular',
    fontSize: 20,
    color: "black",
  },
});
