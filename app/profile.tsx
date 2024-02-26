import React,{useCallback} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from "expo-linear-gradient";

type SocialMedia = "facebook" | "twitter"| "instagram" | "github"; 

const ProfileScreen: React.FC = () => {
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

  const handleSocialMediaPress = (socialMedia: SocialMedia) => {
    let socialMediaLink = "";

    switch (socialMedia) {
      case "facebook":
        socialMediaLink = "https://www.facebook.com";
        break;
      case "twitter":
        socialMediaLink = "https://www.twitter.com";
        break;
      case "instagram":
        socialMediaLink = "https://www.instagram.com";
        break;
      case "github":
        socialMediaLink = "https://www.github.com";
        break;
      default:
        break;
    }

    Linking.openURL(socialMediaLink);
  };

  return (
    <LinearGradient
      colors={["#2ecc71", "#4caf50", "#8bc34a"]}
      style={{ flex: 1 }}
    >
      <View onLayout={onLayoutRootView}>
        <View style={styles.profileContainer}>
          <Image
            source={require('./assets/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
        </View>
        
        <TouchableOpacity style={styles.socialMediaButton} onPress={() => handleSocialMediaPress("facebook")}>
          <Image
            source={require('./assets/Facebook.png')}
            style={styles.socialMediaIcon}
          />
          <Text style={styles.socialMediaText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaButton} onPress={() => handleSocialMediaPress("twitter")}>
          <Image
            source={require('./assets/twitter.png')}
            style={styles.socialMediaIcon}
          />
          <Text style={styles.socialMediaText}>Twitter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaButton} onPress={() => handleSocialMediaPress("instagram")}>
          <Image
            source={require('./assets/Instagram.png')}
            style={styles.socialMediaIcon}
          />
          <Text style={styles.socialMediaText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton} onPress={() => handleSocialMediaPress("github")}>
          <Image
            source={require('./assets/github.png')}
            style={styles.socialMediaIcon}
          />
          <Text style={styles.socialMediaText}>Github</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    profileContainer: {
      alignItems: 'center',
      marginTop: 50,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 10,
    },
    profileName: {
      fontFamily: 'Anta-Regular',
      fontSize: 20,
      color: 'white',
    },
    profileSurname: {
      fontFamily: 'Anta-Regular',
      fontSize: 16,
      color: 'white',
      marginTop: 5,
    },
    socialMediaButton: {
      alignItems: 'center',
      marginVertical: 20,
    },
    socialMediaIcon: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginBottom: 10,
      borderRadius: 10,
    },
    socialMediaText: {
      fontFamily: 'Anta-Regular',
      fontSize: 16,
      color: 'white',
    },
  });