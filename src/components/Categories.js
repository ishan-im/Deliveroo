import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';

import CategoryCard from './CategoryCard';
import client, {urlFor} from '../../sanity';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try{

      const result = client.fetch(`*[_type == 'category']`).then(data => setCategories(data));

    }catch(err){
      console.log(err);
    }


  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 6,
        paddingTop: 10,
      }}>
      {categories?.map(category => (
        <CategoryCard
          key={category._id}
          id={category._id}
          imgUrl={urlFor(category.image).url()}
          title={category.name}
          resturants={category.resturant}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({});
