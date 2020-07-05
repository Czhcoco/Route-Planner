import React, { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const pokemon = [
      [
        { id: "北京", name: "北京" },
        { id: "纽约", name: "纽约" },
        { id: "多伦多", name: "多伦多" },
      ],
    ];
    // const promises = new Array(20)
    //   .fill()
    //   .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    // Promise.all(promises).then((pokemonArr) => {
    //   return pokemonArr.map((value) =>
    //     value
    //       .json()
    //       .then(({ name, sprites: { front_default: sprite } }) =>
    //         pokemon.push({ name, sprite })
    //       )
    //   );
    // });
    setOptions(pokemon);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = (poke) => {
    setSearch(poke);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {options
            // .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex(value.name)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.name}</span>
                  {/* <img src={value.sprite} alt="pokemon" /> */}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default App;
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
