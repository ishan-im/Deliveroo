import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Icons from 'react-native-vector-icons/Feather';

import User from 'react-native-vector-icons/FontAwesome5';

import client from '../../sanity';

import {
  SparklesIcon as SparklesIconOutline,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';

import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

const HomeScreen = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const data = await client.fetch(`*[_type == 'featured']{
        ...,
        resturant[]=>{
          ...,
          dishes[]=>{
            ...
          }
        }
      }`);

      setFeatured(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log('featured', featured)

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 mx-4 items-center space-x-2">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="w-7 h-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-500 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <Icons name="chevron-down" size={20} color="#00ccbb" />
          </Text>
        </View>

        <UserIcon size={35} color="#00ccbb" />
      </View>

      <View className="flex-row space-x-2 items-center pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 p-3 bg-gray-200 ">
          <MagnifyingGlassIcon size={30} color="#00ccbb" />

          <TextInput
            placeholder="Search for food"
            keyboardType="default"
            className="flex-1 text-sm h-9 text-gray-500"
          />
        </View>
        <AdjustmentsVerticalIcon size={30} color="#00ccbb" />
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Categories />

        {featured?.map(item => (
          <FeaturedRow
            key={item?._id}
            title={item?.name}
            description={item?.short_description}
            id={item?._id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
