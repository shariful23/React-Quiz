import quizcomplete from "../assets/quiz-complete.png";
import Question from "../questions.js";
export default function Result({ userAnswers }) {
  const skippedAnswer = userAnswers.filter((answer) => answer === null);
  const totalSkip = skippedAnswer.length;
  const skipParcent = ((totalSkip / userAnswers.length) * 100);

  const correctAns = userAnswers.filter(
    (answer, index) => answer === Question[index].answers[0]
  );
  const totalCorrect = correctAns.length;
  const correctRatio = (
    (totalCorrect / userAnswers.length) * 100
  ).toFixed(1);

  const wrongAns = userAnswers.length - (totalCorrect + totalSkip);
  const wrongRatio = (100 - skipParcent - correctRatio).toFixed(1);

  return (
    <div id="summary">
      <img src={quizcomplete} alt="quizcompletelogo"></img>
      <h2>Quiz completed</h2>

      <div id="summary-stats">
        <p>
          <span className="skippedans"> {skipParcent}% </span>
          <span className="text">{totalSkip} Skipped</span>
        </p>
        <p>
          <span className="correctans"> {correctRatio}% </span>
          <span className="text">{totalCorrect} Correct Answer</span>
        </p>
        <p>
          <span className="wrongans"> {wrongRatio}% </span>
          <span className="text">{wrongAns} Wrong Answer</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass = "skipped";
          } else if (answer === Question[index].answers[0]) {
            cssClass = "correct";
          } else {
            cssClass = "wrong";
          }
          return (
            <li key={answer}>
              <h3>{index + 1}</h3>
              <p className="question">{Question[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
