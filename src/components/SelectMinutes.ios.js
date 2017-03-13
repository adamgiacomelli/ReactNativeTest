import React from 'react';
import { View, Text, Picker } from 'react-native';

export default function SelectMinutesTemplate(locals) {

  var containerStyle = {
    height: 100,
  };
  var itemStyle = {
    ...locals.stylesheet.selectMinutesIosItem,
  };

  var pickerStyle = {
    ...locals.stylesheet.selectMinutesIos,
  };
  let minuteRows = [];
  let numrows = 12;
  for (let i = 1; i < numrows+1; i++) {
    minuteRows.push({key: i, label: i*5 + "min", val:(i*5).toString()});
  }
  return (
      <View style={containerStyle}>
        <Text style={itemStyle}>{locals.label}</Text>
        <Picker
          style={pickerStyle}
          selectedValue={locals.value}
          onValueChange={(value) => locals.onChange(value)}
          itemStyle={itemStyle}
          >
        {minuteRows.map(function(item){
          return <Picker.Item key={item.key} label={item.label} value={item.val}/>;
        })}
        </Picker>
      </View>
  );
}
