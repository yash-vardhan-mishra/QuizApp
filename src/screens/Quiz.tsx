import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Answers from '../components/Answers';
import Button from '../components/Button';
import Question from '../components/Question';
import {
  Difficulty,
  getQuizQuestions,
  isArrayValid,
  QuestionState,
} from '../utils';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Quiz = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [number, setNumber] = useState(0);
  const TOTAL_QUESTIONS = 10;
  const setAnswer = useRef(null);

  const startQuiz = async () => {
    setLoading(false);
    setGameOver(false);
    const newQuestions = await getQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
  };

  const checkAnswer = () => {
    if (!gameOver) {
      const answer = setAnswer.current;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((val) => val + 1);
      const answerObject = {
        quesion: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((ans) => [...ans, answerObject]);
      setTimeout(() => {
        nextQuestion();
      }, 800);
    }
  };

  useEffect(() => {
    startQuiz();
  }, []);

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: 'white',
      }}>
      {!loading ? (
        <>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 70,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Question</Text>
              <Text style={{fontSize: 16, color: '#006996'}}>
                {number + 1}/{questions.length}
              </Text>
            </View>
            <View style={{marginVertical: 20}}>
              <Text style={{fontSize: 16, color: '#00696'}}>
                Score: {score}
              </Text>
            </View>
            {isArrayValid(questions) ? (
              <>
                <Question
                  question={questions[number].question}
                  questionNumber={number + 1}
                />
                <Answers
                  answers={questions[number].answers}
                  {...{setAnswer, checkAnswer}}
                  userAnswer={
                    isArrayValid(userAnswers) ? userAnswers[number] : undefined
                  }
                />
              </>
            ) : null}
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="'#00696'" />
        </View>
      )}

      <TouchableOpacity style={styles.floatingButton}>
        {!gameOver && !loading && number != TOTAL_QUESTIONS - 1 ? (
          <Ionicons
            name="ios-arrow-forward"
            color="white"
            size={28}
            onPress={() => nextQuestion()}
          />
        ) : (
          <Ionicons
            name="play"
            color="white"
            size={28}
            onPress={() => startQuiz()}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  floatingButton: {
    // padding: 20,
    backgroundColor: '#006996',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 300,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
