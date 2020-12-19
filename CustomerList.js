import React from 'react';
import {View, Text} from 'react-native';

const CustomerList = ({data,index}) => {
  return (
    <View
      style={{
        backgroundColor: index % 2 !== 0 ? 'gray' : 'cyan',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 8,
        flexDirection: 'row',
      }}>
      <Text style={{color: 'black'}}>{data.firstName}</Text>
      <Text style={{color: 'black'}}>{data.title}</Text>
    </View>
  );
};

export default CustomerList;
