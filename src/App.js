import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions").then((response) =>
      response
        .json()
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((error) => dispatch({ type: "dataFailed" }))
    );
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}

export default App;
