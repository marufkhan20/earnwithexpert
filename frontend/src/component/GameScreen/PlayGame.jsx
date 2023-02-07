/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { usePlayGameMutation } from "../../features/user/userApi";
import classes from "./game.module.css";

const PlayGame = ({ user, amount, setActiveTab, setAmount }) => {
  const [winGame, setWinGame] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        // eslint-disable-next-line no-self-assign
        array[currentIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function spin() {
    // wheel.play()
    const box = document.getElementById("box");
    const element = document.getElementById("mainbox");
    let selectedItem = "";

    let AC = shuffle([1890, 2250, 2610]);
    let Camera = shuffle([1850, 2210, 2570]);
    let Zonk = shuffle([1770, 2130, 2490]);
    let PS = shuffle([1810, 2170, 2530]);
    let Headset = shuffle([1750, 2110, 2470]);
    let Drone = shuffle([1630, 1990, 2350]);
    let ROG = shuffle([1570, 1930, 2290]);

    let results = shuffle([
      AC[0],
      Camera[0],
      Zonk[0],
      PS[0],
      Headset[0],
      Drone[0],
      ROG[0],
    ]);

    if (AC.includes(results[0])) selectedItem = 1;
    if (Camera.includes(results[0])) selectedItem = 2;
    if (Zonk.includes(results[0])) selectedItem = 3;
    if (PS.includes(results[0])) selectedItem = 4;
    if (Headset.includes(results[0])) selectedItem = 5;
    if (Drone.includes(results[0])) selectedItem = 6;
    if (ROG.includes(results[0])) selectedItem = 7;

    box.style.setProperty("transition", "all ease 5s");
    box.style.transform = "rotate(" + results[0] + "deg)";
    element.classList.remove("animate");

    setTimeout(() => {
      element.classList.add("animate");
    }, 5000);

    setTimeout(() => {
      // alert
      setWinGame(selectedItem === 4);
      setGameEnd(true);
    }, 5500);

    setTimeout(() => {
      box.style.setProperty("transition", "initial");
      box.style.transform = "rotate(90deg)";
    }, 6000);
  }

  // update user balance
  const [playGame] = usePlayGameMutation();

  useEffect(() => {
    if (gameEnd) {
      playGame({
        id: user?._id,
        data: { status: winGame ? "win" : "lost", amount },
      });
    }
  }, [gameEnd]);
  return (
    <>
      <div className={classes.main}>
        <div className={classes.mainbox} id="mainbox">
          <div className={classes.box} id="box">
            <div className={classes.box1}>
              <span
                className={`${classes.font} ${classes.span1} ${classes.span}`}
              >
                <h5>$500</h5>
              </span>
              <span
                className={`${classes.font} ${classes.span2} ${classes.span}`}
              >
                {/* <h5>Asus ROG</h5> */}
                <h5>$220</h5>
              </span>
              <span
                className={`${classes.font} ${classes.span3} ${classes.span}`}
              >
                {/* <h5>Air Conditionar</h5> */}
                <h5>$100</h5>
              </span>
              <span
                className={`${classes.font} ${classes.span4} ${classes.span}`}
              >
                {/* <h5>Speaker Portable</h5> */}
                <h5>$50</h5>
              </span>
              <span
                className={`${classes.font} ${classes.span5} ${classes.span}`}
              >
                {/* <h5>Playstation 4 Slim</h5> */}
                <h5>$600</h5>
              </span>
            </div>
            <div className={classes.box2}>
              <span
                className={`${classes.font} ${classes.span1} ${classes.span}`}
              >
                {/* <h5>Zonk</h5> */}
                <h5>$130</h5>
              </span>
              <span
                className={`${classes.font} ${classes.span2} ${classes.span}`}
              >
                {/* <h5>Headset Gaming</h5> */}
                <h5>$20</h5>
              </span>
              <span
                className={`${classes.font} ${classes.span3} ${classes.span}`}
              >
                {/* <h5>Ipad Mini 5</h5> */}
                <h5>$400</h5>
              </span>
              <span
                className={`${classes.font} ${classes.span4} ${classes.span}`}
              >
                {/* <h5>Camera Sport Action</h5> */}
                <h5>$15</h5>
              </span>
              <span
                className={`${classes.font} ${classes.span5} ${classes.span}`}
              >
                {/* <h5>Drone Mini T67</h5> */}
                <h5>$50</h5>
              </span>
            </div>
          </div>
          <button className={classes.spin} onClick={spin}>
            SPIN
          </button>
        </div>
      </div>

      {/* game end alert */}
      <div
        className={`transition-all duration-300 ${
          gameEnd ? "scale-100" : "scale-0"
        } fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg z-50 w-[500px] h-[300px] shadow-lg flex items-center justify-center flex-col gap-3`}
      >
        <h2 className="text-xl text-primary">
          {winGame ? "Congratulations You're Win" : "You're Lost in this game"}
        </h2>
        <button
          className="py-2 px-6 bg-primary text-white rounded-lg"
          onClick={() => {
            setActiveTab(1);
            setAmount(0);
          }}
        >
          Play Again
        </button>
      </div>
    </>
  );
};

export default PlayGame;
