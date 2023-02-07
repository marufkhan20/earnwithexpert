import React, { useState } from "react";
import Input from "../utilities/Input";

const EnterGame = ({ amount, setAmount, user, setActiveTab }) => {
  const [error, setError] = useState("");

  const handlePlayGame = (e) => {
    e.preventDefault();

    // check validation
    if (!amount) {
      setError("Please enter your amount for play this game!");
      return;
    }

    if (amount > user?.totalBalance) {
      setError("Your total balance is too low");
      return;
    }

    setActiveTab(2);
  };
  return (
    <div className="w-1/4 bg-white rounded-xl py-4 px-6">
      <form onSubmit={handlePlayGame}>
        <label className="mb-2 block" htmlFor="amount">
          Enter Amount
        </label>
        <Input
          type="text"
          id="amount"
          placeholder="Enter amount for play game"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && (
          <div className="mt-5">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <button className="py-2 px-6 rounded-full text-white bg-primary mt-4">
          Play Game
        </button>
      </form>
    </div>
  );
};

export default EnterGame;
