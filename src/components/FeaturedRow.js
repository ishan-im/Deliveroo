import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';

import {ArrowRightIcon} from 'react-native-heroicons/outline';

import ResturantCards from './ResturantCards';

import client, {urlFor} from '../../sanity';

const FeaturedRow = ({title, description, id}) => {
  const [resturants, setResturants] = useState([]);
  const [isLoading, setLoading] = useState(true);

  console.log(id);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await client.fetch(
        `*[_type == 'featured' && _id == $id]{
          ...,
                   resturants[]->{
                     ...,
                     dishes[]->,
                       type->{
                         name
                       
                     }
                 
               },
                     } [0]
                     `,
        {id},
      );
      console.log('data: ', data);
      setResturants(data.resturants);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  console.log('resturants: ', resturants);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg text-black">{title}</Text>
        <ArrowRightIcon size={30} color="#00ccbb" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      {isLoading ? (
        <Text className='p-5'>Loading...</Text>
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={{paddingHorizontal: 15}}
          showsHorizontalScrollIndicator={false}
          className="pt-4">
          {resturants?.map((resturant, idx) => resturant && (
            <ResturantCards
              key={resturant._id ? resturant._id : idx}
              id={resturant._id ? resturant._id : idx}
              imgUrl={resturant.image ? urlFor(resturant.image).url() : null}
              short_description={resturant.short_description}
              rating={resturant.rating}
              address={resturant.address}
              title={resturant.name}
              genre={resturant.type?.name}
              long={resturant.long}
              lat={resturant.lat}
              dishes={resturant.dishes}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FeaturedRow;

const styles = StyleSheet.create({});
