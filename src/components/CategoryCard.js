import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const CategoryCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity className="mr-3 ">
      <Image
        source={{uri: imgUrl}}
        className="w-20 h-20 relative bg-gray-300 p-4 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
