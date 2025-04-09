import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//@ Add in Hangman Body
//@ Setup game over and game won UI
//@ Get a random word for the intial word
//@ Add in computer Keyboard functionality
//@ Make it so only letters can be selected on keyboard

const MAX_ATTEMPTS = 7;

function App() {
  const [solution, setSolution] = useState([]);
  const [wrongAttemptsCount, setWrongAttemptsCount] = useState(0);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [letterAttempt, setletterAttempt] = useState([]);
  const [initialWord, setInitialWord] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    const word = getNewWord();
    setInitialWord(word);
    setSolution(Array(word.length).fill(null));

    const handleKey = (event) => {
      const key = event.key;
      setletterAttempt(key);
    };
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const getNewWord = () => {
    const word = "Hello";
    const splitWord = word.toLowerCase().split("");
    return splitWord;
  };

  const reset = () => {
    setSolution(Array(word.length).fill(null));
    setWrongAttemptsCount(0);
    set;
    setIsGameOver(false);
    setIsGameWonfalse(false);
    setInitialWord(getNewWord());
  };

  const findLetter = (letter) => {
    if (isGameOver || isGameWon) {
      return;
    }
    console.log("Looking for..." + letter + " in " + initialWord);
    const isLetterInWord = initialWord.includes(letter);
    console.log("isLetterInWord boolean is..." + isLetterInWord);
    if (!isLetterInWord) {
      setWrongLetters((prevWrongLetters) => {
        console.log("Setting wrong Letters...");
        const newWrongLetters = [...prevWrongLetters];
        newWrongLetters.push(letter);
        return newWrongLetters;
      });

      setWrongAttemptsCount((prevCount) => {
        if (prevCount + 1 >= MAX_ATTEMPTS) {
          setIsGameOver(true);
          return;
        }
        return prevCount + 1;
      });
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
    <main className="bg-gradient-to-br from-amber-200 to-amber-300 min-h-screen text-amber-950">
      <NavBar />

      {/*  Board    */}

      <div className="max-w-lg flex justify-between mx-auto mt-24">
        {solution.map((letter, index) => {
          return <Tile key={index} letter={letter ?? ""} />;
        })}
      </div>

      <p className="text-center mt-4 leading-loose font-semibold">Category</p>

      <ul className="flex bg-amber-200 p-2 flex-wrap mt-8 max-w-xl mx-auto h-24 border gap-4 uppercase">
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
      <div className="status">
        {isGameWon && "You Win"}
        {isGameOver && "You Lose"}
      </div>
      <Keyboard findLetter={findLetter} />
    </main>
  );
}

const Tile = (props) => {
  return (
    <div className="border-b-4 uppercase text-2xl grid place-content-center h-18 w-18">
      {props.letter}
    </div>
  );
};

export default App;

const NavBar = () => {
  return (
    <nav className="flex justify-around pt-12 z-20">
      <section className="flex justify-between gap-8">
        <Button buttonName={"Quit"} />
        <Button buttonName={"Reset"} />
      </section>
      <h2 className="text-5xl font-bold uppercase">Hangman</h2>
      <aside>
        <Button buttonName={"Github"} />
      </aside>
    </nav>
  );
};

const Button = (props) => {
  return (
    <button className="underline font-semibold cursor-pointer">
      {props.buttonName}
    </button>
  );
};

const Keyboard = (props) => {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <ul className="flex flex-wrap max-w-3xl mx-auto gap-2 justify-center mt-8">
      {letters.map((letter) => {
        return (
          <li
            onClick={() => props.findLetter(letter)}
            className="uppercase cursor-pointer hover:bg-amber-950 grid place-content-center h-12 w-12 bg-black rounded-lg text-white "
          >
            {letter}
          </li>
        );
      })}
    </ul>
  );
};
