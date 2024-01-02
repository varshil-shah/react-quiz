function FinishScreen({ points, totalPoints, highscore, dispatch }) {
  const percentage = (points / totalPoints) * 100;

  let emoji = "🤔";
  if (percentage === 100) emoji = "🏅";
  if (percentage >= 80 && percentage < 100) emoji = "👏";
  if (percentage >= 60 && percentage < 80) emoji = "👍";
  if (percentage >= 40 && percentage < 60) emoji = "😕";
  if (percentage >= 20 && percentage < 40) emoji = "😬";
  if (percentage < 20) emoji = "🤯";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {totalPoints} points
        ({Math.ceil(percentage)}%).
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
