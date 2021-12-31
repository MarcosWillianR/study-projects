/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [num, setNum] = useState(0);

  return (
    <SafeAreaView>
      <StatusBar />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />

        <Text>{num}</Text>

        <TouchableOpacity onPress={() => setNum(state => state + 1)}>
          <Text>Change num</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
