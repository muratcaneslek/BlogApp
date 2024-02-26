import { Tabs } from "expo-router";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import { Provider } from 'react-redux';
import { store } from "./store";
const Layout = () => {
    return(
        <Provider store={store}>
        <Tabs>
            <Tabs.Screen name="index" options={{title: 'BlogApp',tabBarLabel:'Home', tabBarIcon: ({size, color}) => (<Ionicons name="home" size={size} color={color} />)}} />
            <Tabs.Screen name="addBlog" options={{title: 'Add Blog',tabBarLabel:'Share', tabBarIcon: ({size, color}) => (<Ionicons name="cloud-upload-outline" size={size} color={color} />)}} />
            <Tabs.Screen name="profile" options={{tabBarLabel:'Profile', tabBarIcon: ({size, color}) => (<Ionicons name="person" size={size} color={color} />)}} />
            
        </Tabs>
        </Provider>
    )
};

export default Layout;