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
import {Picker} from '@react-native-picker/picker';
import defaultValues from './defaultValues';

const requiredError = 'This field is required.';

export default () => {
  const [customers, setCustomers] = React.useState([]);
  const {handleSubmit, control, reset, errors} = useForm();

  const [successMsg, setSuccessMsg] = React.useState('');

  const nameInputRef = React.useRef();
  const titleInputRef = React.useRef();
  const corporationInputRef = React.useRef();
  const address1InputRef = React.useRef();
  const address2InputRef = React.useRef();
  const cityInputRef = React.useRef();
  const stateInputRef = React.useRef();
  const zipInputRef = React.useRef();
  const cellTelInputRef = React.useRef();
  const emailInputRef = React.useRef();
  const urlInputRef = React.useRef();

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify([...customers, value]);
      await AsyncStorage.setItem('customer_info', jsonValue);
      setCustomers([...customers, value]);
      setSuccessMsg(
        `Following Data saved to local storage, Find customer list at bottom. DATA::${JSON.stringify(
          value,
        )}`,
      );
      reset(defaultValues);
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
    console.log(data);
    (async () => {
      await storeData(data);
    })();
  };

  React.useEffect(() => {
    (async () => {
      let storedData = await getData();
      if (storedData) setCustomers(storedData);
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
        </View>
        {/* NAME FIELD */}
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          onFocus={() => {
            nameInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={nameInputRef}
            />
          )}
          name="name"
          rules={{required: requiredError}}
        />
        {errors.name ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.name.message}
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
        {errors.title ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.title.message}
          </Text>
        ) : null}

        {/* CORPORATION FIELD */}
        <Text style={styles.label}>Corporation</Text>
        <Controller
          control={control}
          onFocus={() => {
            corporationInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={corporationInputRef}
            />
          )}
          name="corporation"
          rules={{required: requiredError}}
        />
        {errors.corporation ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.corporation.message}
          </Text>
        ) : null}

        {/* ADDRESS1 FIELD */}
        <Text style={styles.label}>Address1</Text>
        <Controller
          control={control}
          onFocus={() => {
            address1InputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={address1InputRef}
            />
          )}
          name="address1"
          rules={{required: requiredError}}
        />
        {errors.address1 ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.address1.message}
          </Text>
        ) : null}

        {/* ADDRESS2 FIELD */}
        <Text style={styles.label}>Address2</Text>
        <Controller
          control={control}
          onFocus={() => {
            address2InputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={address2InputRef}
            />
          )}
          name="address2"
          rules={{required: requiredError}}
        />
        {errors.address2 ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.address2.message}
          </Text>
        ) : null}

        {/* CITY FIELD */}
        <Text style={styles.label}>City</Text>
        <Controller
          control={control}
          onFocus={() => {
            cityInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={cityInputRef}
            />
          )}
          name="city"
          rules={{required: requiredError}}
        />
        {errors.city ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.city.message}
          </Text>
        ) : null}

        {/* STATE FIELD */}
        <Text style={styles.label}>State</Text>
        <Controller
          control={control}
          onFocus={() => {
            stateInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={stateInputRef}
            />
          )}
          name="state"
          rules={{required: requiredError}}
        />
        {errors.state ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.state.message}
          </Text>
        ) : null}

        {/* ZIP FIELD */}
        <Text style={styles.label}>ZIP</Text>
        <Controller
          control={control}
          onFocus={() => {
            zipInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={zipInputRef}
              keyboardType="number-pad"
            />
          )}
          name="zip"
          rules={{
            required: requiredError,
            pattern: /^[1-9][0-9]{5}$/,
          }}
        />
        {errors.zip?.type === 'required' ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.zip.message}
          </Text>
        ) : null}
        {errors.zip?.type === 'pattern' ? (
          <Text style={{...styles.label, ...styles.error}}>
            Please enter valid zip code
          </Text>
        ) : null}

        {/* CELL TEL FIELD */}
        <Text style={styles.label}>Cell Tele</Text>
        <Controller
          control={control}
          onFocus={() => {
            cellTelInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={cellTelInputRef}
              keyboardType="phone-pad"
            />
          )}
          name="cellTel"
          rules={{
            required: requiredError,
            pattern: /^[6-9]\d{9}$/,
          }}
        />
        {errors.cellTel?.type === 'required' ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.cellTel.message}
          </Text>
        ) : null}
        {errors.cellTel?.type === 'pattern' ? (
          <Text style={{...styles.label, ...styles.error}}>
            Please enter valid 10 digit mobile number
          </Text>
        ) : null}

        {/* EMAIL FIELD */}
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          onFocus={() => {
            emailInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={emailInputRef}
              keyboardType="email-address"
            />
          )}
          name="email"
          rules={{
            required: requiredError,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
          }}
        />
        {errors.email?.type === 'required' ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.email.message}
          </Text>
        ) : null}
        {errors.email?.type === 'pattern' ? (
          <Text style={{...styles.label, ...styles.error}}>
            Please enter valid email address
          </Text>
        ) : null}

        {/* URL FIELD */}
        <Text style={styles.label}>URL</Text>
        <Controller
          control={control}
          onFocus={() => {
            urlInputRef.current.focus();
          }}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={urlInputRef}
              keyboardType="url"
            />
          )}
          name="url"
          rules={{
            required: requiredError,
            pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
          }}
        />
        {errors.url?.type === 'required' ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.url.message}
          </Text>
        ) : null}
        {errors.url?.type === 'pattern' ? (
          <Text style={{...styles.label, ...styles.error}}>
            Please enter valid URL
          </Text>
        ) : null}

        {/* CUSTOMER TYPE FIELD */}
        <Text style={styles.label}>Customer Type</Text>
        <Controller
          control={control}
          defaultValue="customerA"
          render={({onChange, value}) => (
            <Picker
              selectedValue={value}
              style={{
                height: 50,
                width: 100,
                backgroundColor: 'white',
                width: '100%',
              }}
              onValueChange={(value, itemIndex) => {
                onChange(value);
              }}>
              <Picker.Item label="Type A" value="customerA" />
              <Picker.Item label="Type B" value="customerB" />
            </Picker>
          )}
          name="customerType"
          rules={{
            required: requiredError,
          }}
        />
        {errors.customerType?.type === 'required' ? (
          <Text style={{...styles.label, ...styles.error}}>
            {errors.customerType.message}
          </Text>
        ) : null}

        {/* BUTTONS */}
        <View style={styles.button}>
          <Button
            color
            title="Enter Customer Contact Information"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        {successMsg ? (
          <View>
            <Text style={{...styles.label, color: 'green'}}>{successMsg}</Text>
          </View>
        ) : null}

        <View style={styles.button}>
          <Button
            color
            title="Close"
            onPress={() => {
              reset(defaultValues);
              setSuccessMsg('');
            }}
          />
        </View>
      </View>

      {/* CUSTOMER LIST */}
      <View>
        {customers.length ? (
          <Text
            style={{...styles.heading, color: 'black', textAlign: 'center'}}>
            Added Customers
          </Text>
        ) : null}
        {customers.map((cust, i) => (
          <CustomerList data={cust} key={i} index={i} />
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
