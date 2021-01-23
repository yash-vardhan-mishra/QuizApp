import React from 'react';
import {View} from 'react-native';
import {AnswerObject} from '../screens/Quiz';
import Button from './Button';

interface AnswerProps {
  answers: string[];
  setAnswer: any;
  checkAnswer: () => void;
  userAnswer: AnswerObject | undefined;
}

const Answers = ({
  answers,
  setAnswer,
  checkAnswer,
  userAnswer,
}: AnswerProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 14,
        paddingHorizontal: 24.5,
        marginTop: 30,
      }}>
      {answers.map((answer, key) => (
        <Button
          {...{answer}}
          correct={userAnswer?.correctAnswer === answer}
          disabled={userAnswer}
          onPress={() => {
            setAnswer.current = answer;
            checkAnswer();
          }}
        />
      ))}
    </View>
  );
};

export default Answers;
