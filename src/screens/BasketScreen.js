import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {selectResturant} from '../../features/resturantSlice';
import {selectBasketItems, removeFromBasket} from '../../features/basketSlice';
import {useSelector, useDispatch} from 'react-redux';
import {XCircleIcon} from 'react-native-heroicons/solid';

import {urlFor} from '../../sanity';

const BasketScreen = () => {
  const navigation = useNavigation();

  const [groupedItems, setGroupedItems] = useState([]);

  const resturant = useSelector(selectResturant);

  const items = useSelector(selectBasketItems);

  const dispatch = useDispatch();

  console.log('items basket: ', items);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);

      return results;
    }, {});

    setGroupedItems(groupedItems);
  }, [items]);

  console.log('resturant: ', groupedItems);

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-[#00ccbb] border-b bg-white shadow-xs">
          <View>
            <Text className="text-lg  font-bold text-center text-black">
              Basket
            </Text>
            <Text className="text-center">{resturant.title}</Text>
          </View>

          <TouchableOpacity
            className="rounded-full absolute top-3 right-5 bg-gray-100"
            onPress={() => navigation.goBack()}>
            <XCircleIcon size={50} color="#00ccbb" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />

          <Text className="flex-1">Delivery in 15 minutes</Text>

          <TouchableOpacity>
            <Text className="text-[#00ccbb] font-bold">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#00ccbb]">{items.length} X</Text>

              <Image
                source={{
                  uri: urlFor(items[0].imgUrl).url(),
                }}
                className="w-20 h-20 bg-gray-300 p-4 rounded-full"
              />
              <Text className="flex-1 text-black">{items[0].name} </Text>

              <Text>{formatter.format(items[0].price * items.length)}</Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] font-bold"
                  onPress={() => dispatch(removeFromBasket({id: key}))}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 space-y-4 mt-5 bg-white">

          <View className="flex-row  justify-between  bg-white">
            <Text className="text-gray-400">Sub Total</Text>
            <Text className="text-gray-400">
              {formatter.format(
                items.reduce((total, item) => total + item.price, 0),
              )}
            </Text>
          </View>

          <View className="flex-row  justify-between  bg-white">
            <Text className="text-gray-500">Delivery Fee</Text>
            <Text className="text-gray-500">{formatter.format(70)}</Text>
          </View>


          <View className="flex-row  justify-between  bg-white">
            <Text className="font-extrabold text-black">Order Total</Text>
            <Text className="text-black">
              {formatter.format(
                items.reduce((total, item) => total + item.price, 0),
              )}
            </Text>
          </View>

          <TouchableOpacity className="rounded-lg bg-[#00ccbb] p-4" onPress={()=> navigation.navigate('PreparingOrderScreen')}>
            
              <Text className="text-white text-center text-lg font-bold">Place Order</Text>
            
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({});
