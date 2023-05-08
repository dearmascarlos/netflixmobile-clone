import {useCallback, useEffect, useState} from 'react';
import {
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import tw from 'twrnc';
import {useDeviceContext} from 'twrnc';
import requests from '../lib/requests';
//ICONS
import {TvIcon} from 'react-native-heroicons/outline';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {ChevronDownIcon} from 'react-native-heroicons/solid';
import {UserIcon} from 'react-native-heroicons/outline';
import ImageColors from 'react-native-image-colors';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation}) => {
  useDeviceContext(tw);
  const imgAssets = process.env.IMG_ASSETS;
  const [heroMovie, setHeroMovie] = useState();
  const [heroMovieColor, setHeroMovieColor] = useState();

  useEffect(() => {
    const fetchColor = async () => {
      const data = await ImageColors.getColors(
        `${imgAssets}${heroMovie?.poster_path}`,
        {
          fallback: '#000000',
          cache: true,
          key: 'unique_key',
        },
      ).then(data => {
        if (Platform.OS === 'ios') {
          setHeroMovieColor(data.primary);
        } else {
          setHeroMovieColor(data.average);
        }
      });
    }
    fetchColor()
      .catch(e => {
        console.log(e)
        return e
      });
  }, [heroMovie])
  
  useEffect(() => {
    fetch(`${requests.fetchTopRated}`)
      .then(res => res.json())
      .then(data => {
        setHeroMovie(data.results[7]);
      });
  }, []);

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View
        style={tw`relative z-10 flex flex-row justify-between items-center px-6 gap-4 android:pt-4`}
      >
        <Text style={tw`android:hidden text-white font-bold text-xl`}>
          For Matias
        </Text>
        <View style={tw`ios:hidden flex-6 relative`}>
          <MagnifyingGlassIcon
            style={tw`absolute z-10 left-2 top-2.5`}
            color={tw.color('gray-300')}
            size={20}
          />
          <TextInput
            style={tw`pr-4 pl-8 h-10 font-medium bg-white rounded w-full text-white`}
            autoCorrect={false}
            autoCapitalize={'none'}
            placeholderTextColor={tw.color('text-gray-400')}
            placeholder={'Search'}
          />
        </View>
        <View style={tw`flex android:flex-1 flex-row items-center gap-4`}>
          <MagnifyingGlassIcon
            style={tw`android:hidden`}
            color={tw.color('white')}
            size={20}
          />
          <TvIcon color={tw.color('white')} size={20} />
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={tw`rounded bg-white/20 w-6 h-6 flex items-center justify-center`}
          >
            <UserIcon color={tw.color('white')} size={16} />
          </Pressable>
        </View>
      </View>
      <View style={tw`flex flex-row px-6 pt-3 gap-4 relative z-10`}>
        <Pressable style={tw`border border-white/30 rounded-full px-2 py-1`}>
          <Text style={tw`text-white`}>TV Shows</Text>
        </Pressable>
        <Pressable style={tw`border border-white/30 rounded-full px-2 py-1`}>
          <Text style={tw`text-white`}>Movies</Text>
        </Pressable>
        <Pressable
          style={tw`border border-white/30 rounded-full px-2 py-1 flex flex-row items-center gap-1`}
        >
          <Text style={tw`text-white`}>Categories</Text>
          <ChevronDownIcon color={tw.color('gray-300')} size={16} />
        </Pressable>
      </View>
      <View style={tw`p-6 relative z-10`}>
        <ImageBackground
          source={{uri: `${imgAssets}${heroMovie?.poster_path}`}}
          resizeMode={'cover'}
          style={tw`rounded-xl bg-white h-[500px] border border-white/30 overflow-hidden`}
        ></ImageBackground>
      </View>
      {heroMovieColor !== undefined && (
        <LinearGradient
          style={tw`absolute top-0 left-0 w-screen h-screen z-0`}
          colors={[`${heroMovieColor}`, tw.color('black')]}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
