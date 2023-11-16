import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState,useEffect} from 'react';

import {urlFor} from '../../sanity';
import {MinusCircleIcon, PlusCircleIcon} from 'react-native-heroicons/outline';

import {
  addToBasket,
  selectBasketItems,
  selectBasketItemsWithId,
  removeFromBasket,
} from '../../features/basketSlice';

import {useSelector, useDispatch} from 'react-redux';

const DishRow = ({id, name, price, description, imgUrl}) => {
  const [isPressed, setIsPressed] = useState(false);

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const dispatch = useDispatch();

  const  items = useSelector(state => selectBasketItemsWithId(state, id));

 

  const addItemsToBasket = () => {
    dispatch(addToBasket({id, name, price, description, imgUrl}));
  };

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({id}));
  };

console.log('items',items);

  return (
    <>
      <TouchableOpacity
        className={`bg-white p-4 mb-4 border border-gray-200 ${
          isPressed && 'border-b-0'
        }`}
        onPress={() => setIsPressed(!isPressed)}>
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1 text-black">{name}</Text>
            <Text className="text-gray-500 mb-1">{description}</Text>
            <Text className="text-gray-900 mt-1">
              {formatter.format(price)}
            </Text>
          </View>

          <View>
            <Image
              source={{uri: urlFor(imgUrl).url()}}
              className="w-20 h-20 p-4 rounded-full"
              style={{borderWidth: 1, borderColor: '#f3f3f4'}}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center spce-x-2 pb-3">
            <TouchableOpacity onPress={removeItemsFromBasket}
            disabled={!items.length > 0}
            >
              <MinusCircleIcon
              
                color={items.length > 0 ? '#00ccbb' : 'gray'}
                size={40}
              />
            </TouchableOpacity>

            <Text className="mx-2">{items.length}</Text>

            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon size={40} color="#00ccbb" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;

const styles = StyleSheet.create({});
