import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomerList from './CustomerList';

const requiredError = 'This field is required.';

export default () => {
  const [customers, setCustomers] = React.useState([]);
  const {handleSubmit, control, reset, errors} = useForm();

  const [successMsg, setSuccessMsg] = React.useState('');

  const firstNameInputRef = React.useRef();
  const titleInputRef = React.useRef();

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify([...customers, value]);
      await AsyncStorage.setItem('customer_info', jsonValue);
      setCustomers([...customers, value]);
      setSuccessMsg(
        'Data saved to local storage, Find customer list at bottom',
      );
      reset();
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('customer_info');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const onSubmit = (data) => {
    (async () => {
      await storeData(data);
    })();
  };

  React.useEffect(() => {
    (async () => {
      let storedData = await getData();
      if (storedData) setCustomers(storedData);
      console.log(storedData);
    })();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{padding: 8, alignItems: 'center'}}>
          <Text style={styles.heading}>
            Grounding / Bonding Evaluation Tool (GBET)
          </Text>
          <Text style={styles.heading}>
            Customer Primary Contact Information
          </Text>
          <Text style={{...styles.label, color: 'green'}}>{successMsg}</Text>
        </View>
        {/* NAME FIELD */}
        <Text style={styles.label}>First name</Text>
        <Controller
          control={control}
          onFocus={() => {
            firstNameInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={firstNameInputRef}
            />
          )}
          name="firstName"
          rules={{required: requiredError}}
        />
        {errors.firstName ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.firstName.message}
          </Text>
        ) : null}
        {/* TITLE FIELD */}
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          onFocus={() => {
            titleInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={titleInputRef}
            />
          )}
          name="title"
          rules={{required: requiredError}}
        />
        {errors.firstName ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.title.message}
          </Text>
        ) : null}
        <View style={styles.button}>
          <Button
            color
            title="Enter Customer Contact Information"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View style={styles.button}>
          <Button
            color
            title="Close"
            onPress={() => {
              reset();
              setSuccessMsg('');
            }}
          />
        </View>
      </View>
      <View>
        {customers.length ? (
          <Text
            style={{...styles.heading, color: 'black', textAlign: 'center'}}>
            Added Customers
          </Text>
        ) : null}
        {customers.map((cust, i) => (
          <CustomerList data={cust} key={i} index={i}/>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    color: 'white',
  },
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  error: {
    color: 'red',
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: 'green',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 8,
    backgroundColor: '#0e101c',
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
