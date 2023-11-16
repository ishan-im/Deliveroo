import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {selectResturant} from '../../features/resturantSlice';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

import {XMarkIcon} from 'react-native-heroicons/solid';

import * as Progressbar from 'react-native-progress';

import {Marker} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps/lib/MapView';
import {useState} from 'react';
import {useEffect} from 'react';

const OrderScreen = () => {
  const navigation = useNavigation();

  const resturant = useSelector(selectResturant);

  console.log('resturant data', resturant);

  const [state, setState] = useState({
    lat: null,
    long: null,
  });

  const {lat, long} = state;

  useEffect(() => {
    setState({
      lat: resturant.lat,
      long: resturant.long,
    });
  }, []);

  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md z-50 shadow-md p-6">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arival</Text>
              <Text className="text-4xl font-bold">45-55 minutes</Text>
            </View>
            <Image
              source={{
                uri: 'https://ouch-cdn2.icons8.com/UIfDFSx33GCYjtn2_8RL3y3F2ve6djNjxjvgTYvYuz8/rs:fit:456:456/extend:true/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNDU1/LzI5NzY2MDQxLTE4/MGUtNGY4YS04Mjc5/LTE0OWQxZTBjM2Fm/MC5zdmc.png',
              }}
              className="h-20 w-20"
            />
          </View>
          <Progressbar.Bar size={30} indeterminate={true} color="#00ccbb" />
          <Text className="mt-3 text-gray-400">
            Your order at {resturant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          className="flex-1 -mt-10 z-0"></MapView>
      </SafeAreaView>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
