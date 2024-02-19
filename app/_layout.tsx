import { Tabs } from "expo-router";
import React from "react";
import {Ionicons} from "@expo/vector-icons";

const Layout = () => {
    return(
        <Tabs>
            <Tabs.Screen name="index" options={{title: 'BlogApp',tabBarLabel:'Home', tabBarIcon: ({size, color}) => (<Ionicons name="home" size={size} color={color} />)}} />
            <Tabs.Screen name="addBlog" options={{tabBarLabel:'Share', tabBarIcon: ({size, color}) => (<Ionicons name="cloud-upload-outline" size={size} color={color} />)}} />
            <Tabs.Screen name="profile" options={{tabBarLabel:'Profile', tabBarIcon: ({size, color}) => (<Ionicons name="person" size={size} color={color} />)}} />
            
        </Tabs>
    )
};

export default Layout;