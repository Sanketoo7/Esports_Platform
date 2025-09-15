import React, { useState } from "react";
import axios from "axios";

const CreateTournament = ({ token }) => {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [date, setDate] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(16);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/tournaments",
        { name, game, date, maxPlayers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Tournament created ✅");
    } catch (error) {
      alert("Failed ❌ Not admin or token issue");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Tournament</h2>
      <input
        type="text"
        placeholder="Tournament Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Game"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Players"
        value={maxPlayers}
        onChange={(e) => setMaxPlayers(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTournament;