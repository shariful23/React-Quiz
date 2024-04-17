import { useCallback, useState } from "react";
import questions from "../questions.js";
import Question from "./Question.jsx";
import Result from "./Result.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const completeQuiz = activeQuestionIndex === questions.length;

  const handleAnswer = useCallback(
    function handleAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevAns) => {
        return [...prevAns, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === questions[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const skipAnswer = useCallback(() => {
    handleAnswer(null), [handleAnswer];
  });

  if (completeQuiz) {
    return <Result userAnswers ={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={questions[activeQuestionIndex].text}
        answers={questions[activeQuestionIndex].answers}
        onSelectAnswer={handleAnswer}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={skipAnswer}
      />
    </div>
  );
}
