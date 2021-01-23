import React from 'react';
import {View, Text} from 'react-native';

interface QuestionProps {
  questionNumber: number;
  question: string;
}

const Question = ({questionNumber, question}: QuestionProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 33,
        paddingRight: 10,
      }}>
      <Text style={{color: '#006996', fontSize: 16, marginRight: 10}}>
        {questionNumber}
      </Text>
      <Text style={{color: '#000', textAlign: 'left', fontSize: 16}}>
        {question}
      </Text>
    </View>
  );
};

export default Question;
