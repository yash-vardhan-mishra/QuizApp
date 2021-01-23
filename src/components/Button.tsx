import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {Text, StyleSheet} from 'react-native';
import {elevate} from './Elevation';

interface ButtonProps {
  answer: string;
  onPress: () => void;
  correct: boolean;
  disabled: boolean;
}

const Button = ({answer, onPress, correct, disabled}: ButtonProps) => {
  console.log(correct);
  return (
    <RectButton
      {...{onPress, disabled}}
      style={[
        styles.container,
        elevate(5),
        {backgroundColor: disabled ? '#ccc' : '#fff'},
      ]}>
      <Text style={{...styles.label, color: correct ? 'red' : '#006996'}}>
        {answer}
      </Text>
    </RectButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 43,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
    paddingHorizontal: 13,
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    textTransform: 'capitalize',
  },
});
