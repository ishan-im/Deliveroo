import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import {selectBasketItems, selectBasketTotal} from '../../features/basketSlice';

import {useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

const BasketIcons = () => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const items = useSelector(selectBasketItems);

  const navigation = useNavigation();

  const total = useSelector(selectBasketTotal);

  return (
    <View className="absolute bottom-4 z-50 w-full">
      <TouchableOpacity className="mx-5 bg-[#00ccbb] p-4 flex-row items-center rounded-lg space-x-1 " onPress={ ()=> navigation.navigate('BasketScreen')}>
        <Text className="text-white font-extrabold text-lg bg-[#01a296] py-1 px-1">
          {items.length}
        </Text>

        <Text className="text-white font-extrabold text-lg flex-1 text-center"> Basket</Text>

        <Text className=" text-white text-lg font-extrabold">
          {formatter.format(total)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcons;

const styles = StyleSheet.create({});
