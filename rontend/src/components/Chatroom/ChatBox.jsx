import React, { useState } from "react";
import PeopleList from "./PeopleList";
import ChatWindow from "./ChatWindow";

const ChatBox = () => {
  const people = [
    { id: 1, name: "Alice", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "Bob", avatar: "https://via.placeholder.com/40" },
    { id: 3, name: "Charlie", avatar: "https://via.placeholder.com/40" },
    { id: 4, name: "Support", avatar: "https://via.placeholder.com/40" },
  ];

  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <div className="chatbox">
      <PeopleList people={people} setSelectedPerson={setSelectedPerson} />
      <ChatWindow selectedPerson={selectedPerson} />
    </div>
  );
};

export default ChatBox;
