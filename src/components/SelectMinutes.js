import React from 'react';
import { View, Text, Picker } from 'react-native';

export default function SelectMinutesTemplate(locals) {

  var containerStyle = {
    flexDirection: 'row',
    flex: 1,
  };
  var labelStyle = {
    ...locals.stylesheet.pickerLabel,
    flex:1,
  };

  var pickerStyle = {
    ...locals.stylesheet.picker,
    flex:1,
  };
  let minuteRows = [];
  let numrows = 12;
  for (let i = 1; i < numrows+1; i++) {
    minuteRows.push({key: i, label: i*5 + "min", val:(i*5).toString()});
  }
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{locals.label}</Text>
      <Picker style={pickerStyle}
        selectedValue={locals.value}
        onValueChange={(value) => locals.onChange(value)}
        >
      {minuteRows.map(function(item){
        return <Picker.Item key={item.key} label={item.label} value={item.val}/>;
      })}
      </Picker>
    </View>
  );
}
