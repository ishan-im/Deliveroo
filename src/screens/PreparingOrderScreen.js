import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import React from 'react';

import * as Animatable from 'react-native-animatable';

import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OrderScreen');
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#00ccbb] items-center justify-center">
      <Animatable.Image
        source={require('../../assets/order.gif')}
        className="h-96 w-96"
        animation="slideInUp"
        iterationCount={1}
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg text-bold text-white my-4 text-center">
        Waiting for Resturants to accept your order
      </Animatable.Text>

      <Progress.Circle
        size={60}
        indeterminate={true}
        color="white"
        fill="#00000000"
      />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

const styles = StyleSheet.create({});
