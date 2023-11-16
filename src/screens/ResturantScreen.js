import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';

import {useDispatch} from 'react-redux';

import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from 'react-native-heroicons/outline';
import DishRow from './DishRow';

import { setResturant } from '../../features/resturantSlice';

import BasketIcons from '../components/BasketIcons';

const ResturantScreen = () => {
  const navigation = useNavigation();

  const {
    params: {
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
    },
  } = useRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setResturant({
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      id,
      lat,
      long,
    }));
  }, [dispatch]);

  console.log('dishes :', dishes);

  return (
    <>
      <BasketIcons />
      <ScrollView>
        <View className="relative">
          <Image
            source={{uri: imgUrl}}
            className="w-full h-56 bg-gray-500 p-4"
          />
          <TouchableOpacity
            className="absolute top-9 left-5 p-2 bg-gray-100 rounded-full"
            onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} color={'#00ccbb'} />
          </TouchableOpacity>
        </View>

        <View className=" bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold color-black">{title}</Text>
            <View className="flex-row  space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" size={22} opacity={0.5} />
                <Text className="text-gray-500 text-xs my-1">
                  <Text className="text-green-500">{rating}</Text>. {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" size={22} opacity={0.5} />
                <Text className="text-gray-500 text-xs my-1">
                  <Text className="text-gray-500">Nearby: {address}</Text>.{' '}
                  {genre}
                </Text>
              </View>
            </View>

            <Text className="text-gray-600 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className=" flex-row items-center space-x-2 p-4 border-y border-gray-200">
            <QuestionMarkCircleIcon color="gray" size={22} opacity={0.5} />
            <Text className="pl-2 flex-1 text-md text-gray-500 font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00ccbb" size={22} opacity={0.5} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-2xl font-bold color-black">Menu</Text>
          </View>
          <View className="flex-row space-x-2 p-4">
            <TouchableOpacity className="bg-gray-100 rounded-lg p-2">
              <Text className="text-gray-500 text-xs">All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 rounded-lg p-2">
              <Text className="text-gray-500 text-xs">Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 rounded-lg p-2">
              <Text className="text-gray-500 text-xs">New</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 rounded-lg p-2">
              <Text className="text-gray-500 text-xs">Recommended</Text>
            </TouchableOpacity>
          </View>

          <View className="px-4 pt-3 pb-56">
            {dishes &&
              dishes.map(
                dish =>
                  dish && (
                    <DishRow
                      key={dish._id}
                      id={dish._id}
                      name={dish.name}
                      price={dish.price}
                      description={dish.short_description}
                      imgUrl={dish.image}
                    />
                  ),
              )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ResturantScreen;

const styles = StyleSheet.create({});
