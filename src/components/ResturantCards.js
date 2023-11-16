import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { StarIcon } from 'react-native-heroicons/outline';

import {MapPinIcon} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';



const ResturantCards = ({
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
  id,
}) => {


  const navigation = useNavigation();

  return (
    <TouchableOpacity className="bg-white shadow mr-3  mb-2"
    onPress={() => navigation.navigate("Resturant",{
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
      id,
    })}
    >
      <Image source={{uri: imgUrl}} className="w-64 h-36 rounded" />
      <View className="px-2 pb-3">
        <Text className="font-bold text-lg pt-2 text-black">{title}</Text>
        <View className="flex-row items-center space-x-1">
            <StarIcon color='green' size={20} opacity={0.5}/>
            <Text className="text-gray-500 text-xs">
                <Text className="text-green-500">{rating}</Text>. {genre}
            </Text>
        </View>

        <View className="flex-row items-center space-x-1">
           <MapPinIcon size={22} color='gray' opacity={0.4}/>
           <Text className="text-gray text-xs">Nearby . {address}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default ResturantCards;

const styles = StyleSheet.create({});
