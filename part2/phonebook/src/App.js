import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Search from "./Components/Search";
import AddContact from "./Components/AddContact";
import AllPersons from "./Components/AllPersons";
import apiService from "./services/ApiService";
import axios, { all } from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filterPersons, setFilterPersons] = useState([]);

  const formHandler = (e) => {
    e.preventDefault();
    let allPersons = [...persons];
    let isPresent = false;
    allPersons.forEach((p) => {
      if (p.name === newName) {
        isPresent = true;
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one ?`
          )
        ) {
          let payload = { ...p, number: number };
          apiService.updatePhone(payload).then((response) => {
            let allPerson = [...persons];
            allPerson.forEach((c) => {
              if (c.id === response.id) {
                c.number = response.number;
              }
            });
            setPersons(allPerson);
            setNewName("");
            setNumber("");
          });
        }
      }
    });

    if (isPresent) {
      return;
    }

    apiService.savePhone({ name: newName, number: number }).then((response) => {
      setPersons([...persons, response]);
      setNewName("");
      setNumber("");
    });
  };

  const searchHandler = (e) => {
    let currInput = e.target.value;
    setSearch(currInput);

    let allPersons = [...persons];

    let filterResult = allPersons.filter((p) => {
      return p.name.toLowerCase().includes(currInput.toLowerCase());
    });

    setFilterPersons(filterResult);
  };

  const findUserById = (id) => {
    let allPersons = [...persons];
    let filterResult = allPersons.filter((p) => p.id === id);
    return filterResult[0].name;
  };

  const deleteContact = (id) => {
    if (window.confirm(`Delete ${findUserById(id)} ?`)) {
      apiService.deletePhone(id).then((response) => {
        if (response.status === 200) {
          let allPersons = [...persons];
          let deletedPersons = allPersons.filter((person) => person.id !== id);
          setPersons(deletedPersons);
        }
      });
    }
  };

  useEffect(() => {
    apiService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <Header title="Phonebook" />
      <Search search={search} searchHandler={searchHandler} />
      <Header title="add a new" />
      <AddContact
        formHandler={formHandler}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
      />
      <Header title="Numbers" />
      {search && (
        <AllPersons deleteContact={deleteContact} persons={filterPersons} />
      )}
      {!search && (
        <AllPersons deleteContact={deleteContact} persons={persons} />
      )}
    </div>
  );
};

export default App;
