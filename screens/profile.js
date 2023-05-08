import React, { Component } from 'react';
import { View, Text , Pressable} from 'react-native';
import tw from 'twrnc'
import auth from '@react-native-firebase/auth';


const Profile = () => {
	return (
		<View style={tw`flex flex-1 items-center justify-center`}>
			<Pressable 
				style={tw`bg-red-500`}
				onPress={() => auth().signOut()}
			>
				<Text> Logout </Text>
			</Pressable>
		</View>
	);
}
  

export default Profile;
