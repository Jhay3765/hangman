import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//@ Add in Hangman Body
//@ Setup a game over
//@ Get a random word for the intial word

//@ Make it so only letters can be selected on keyboard

const MAX_ATTEMPTS = 0;

function App() {
  const [solution, setSolution] = useState([]);
  const [wrongAttemptsCount, setWrongAttemptsCount] = useState(0);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [letterAttempt, setletterAttempt] = useState([]);
  const [initialWord, setInitialWord] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    const word = "hello";
    setInitialWord(word.split(""));

    setSolution(Array(word.length).fill(null));

    const handleKey = (event) => {
      const key = event.key;
      setletterAttempt(key);
    };
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const findLetter = (letter) => {
    console.log("Looking for..." + letter + " in " + initialWord);
    const isLetterInWord = initialWord.includes(letter);
    console.log("isLetterInWord boolean is..." + isLetterInWord);
    if (!isLetterInWord) {
      setWrongLetters((prevWrongLetters) => {
        console.log("Setting wrong Letters...");
        const newWrongLetters = [...prevWrongLetters];
        newWrongLetters.push(letter);

        setWrongAttemptsCount((prevCount) => {
          if (prevCount + 1 >= MAX_ATTEMPTS) {
            setIsGameOver(true);
            return;
          }
          return prevCount + 1;
        });

        return newWrongLetters;
      });
      console.log("Letter Not Found In Word :(");
      return;
    }
    const indices = [];
    for (let index = 0; index < initialWord.length; index++) {
      if (initialWord[index] === letter) {
        indices.push(index);
        console.log(indices);
      }
    }
    // const index = initialWord.findIndex((intialWordLetter) => {
    //   return intialWordLetter === letter;
    // });
    setSolution((prevSolution) => {
      console.log("Setting The new solution Array, our index is..." + indices);
      const newSolution = [...prevSolution];
      for (let index of indices) {
        newSolution[index] = letter;
        console.log(newSolution);
      }

      if (!newSolution.includes(null)) {
        setIsGameWon(true);
      }
      return newSolution;
    });
  };

  return (
    <main className="bg-gradient-to-br from-amber-300 to-amber-500 min-h-screen text-amber-950">
      <NavBar />
      <ul className="">
        {wrongLetters
          ? wrongLetters.map((letter, index) => {
              return (
                <div className="" key={index}>
                  {letter}
                </div>
              );
            })
          : "Wrong Letters will Be Here"}
      </ul>
      <div className="">
        {solution.map((letter, index) => {
          return <Tile key={index} letter={letter ?? ""} />;
        })}
      </div>
      <section className=" ">
        <div className="">{letterAttempt}</div>
        <button className="" onClick={() => findLetter(letterAttempt)}>
          Submit
        </button>

        <div className="status">
          {isGameWon && "You Win"}
          {isGameOver && "You Lose"}
        </div>
      </section>
    </main>
  );
}

const Tile = (props) => {
  return <div className="tile">{props.letter}</div>;
};

export default App;

const NavBar = () => {
  return (
    <nav className="flex justify-around">
      <section className="flex justify-between">
        <Button buttonName={"Quit"} />
        <Button buttonName={"Reset"} />
      </section>
      <h2></h2>
      <aside></aside>
    </nav>
  );
};

const Button = (props) => {
  return (
    <button className="underline font-semibold">{props.buttonName}</button>
  );
};
