import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  useEffect(
    function () {
      const timerId = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return function () {
        clearInterval(timerId);
      };
    },
    [dispatch]
  );

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="timer">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
