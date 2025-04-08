import React from "react";

const PeopleList = ({ people, setSelectedPerson }) => {
  return (
    <div className="people-list">
      <h1 className="pt-2 font-bold text-center">People</h1> <br /> 
      <ul>
        {people.map((person) => (
          <li
            key={person.id}
            onClick={() => setSelectedPerson(person)}
            className="person-item"
          >
            <img src={person.avatar} alt={person.name} />
            <span>{person.name}</span>
          </li>
        ))}
      </ul>

      <br />
     
    </div>
  );
};

export default PeopleList;
