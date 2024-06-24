import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [pokemonName, setPokemonName] = useState("N/A");
  const [pokemonID, setPokemonID] = useState("N/A");
  const [pokemonHeight, setPokemonHeight] = useState("N/A");
  const [pokemonWeight, setPokemonWeight] = useState("N/A");
  const [pokemontype, setPokemonType] = useState("N/A");
  const [pokemonImg, setPokemonImg] = useState("N/A");

  async function getPokemon(search) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const pokemonObj = await response.json();
    return pokemonObj;
  }

  useEffect(() => {
    // const poke = getPokemon().then((response) => {
    //   console.log(response);
    //   setPokemon(response);
    // });
  }, []);

  const handlePokemonClick = () => {
    getPokemon(document.getElementById("poke").value)
      .then((response) => {
        console.log(response);
        setPokemonImg(response.sprites.front_default);
        setPokemonName(response.name);
        setPokemonID(response.id);
        setPokemonHeight(response.height);
        setPokemonWeight(response.weight);
        setPokemonType(
          response.types.length == 2
            ? `${response.types[0].type.name} & ${response.types[1].type.name}`
            : response.types[0].type.name,
        );
      })
      .catch((err) => alert("Pokemon not found"));
  };

  const moveRight = () => {
    // if the input is empty than start at 1, otherwise increment and add to the textfield id ++

    // there is no pokemon there currently
    if (pokemonID == "N/A") {
      // change the value in the input to 1
      document.getElementById("poke").value = "1";
      // there is a pokemon already displayed
    } else {
      // if this is the last pokemon
      if (parseInt(pokemonID) == 1025) {
        document.getElementById("poke").value = "1";
      } else {
        // move one pokemon up
        document.getElementById("poke").value = parseInt(pokemonID) + 1;
      }
    }
    // call the handlle pokemon click to get the pokemon
    handlePokemonClick();
  };

  const moveLeft = () => {
    // there is no pokemon there currently
    if (pokemonID == "N/A") {
      // change the value in the input to 1025
      document.getElementById("poke").value = "1025";
      // there is a pokemon already displayed
    } else {
      // if this is the first pokemon
      if (parseInt(pokemonID) == 1) {
        document.getElementById("poke").value = "1025";
      } else {
        // move one pokemon down
        document.getElementById("poke").value = parseInt(pokemonID) - 1;
      }
    }
    // call the handlle pokemon click to get the pokemon
    handlePokemonClick();
  };

  //name .name
  //id .id
  //height .height
  //weight .weight
  //type length 1 or 2, .types[0].type.name or .types[1].type.name
  return (
    <>
      <div className="flex h-screen flex-col content-center items-center justify-around">
        <h1 className="text-center text-4xl">POKEMON ENCYCLOPEDIA</h1>
        <img
          src={pokemonImg}
          alt="pokemon image"
          className="h-[128px] w-[128px]"
        />
        <ol className="text-2xl">
          <li>Name: {pokemonName}</li>
          <li>ID: {pokemonID}</li>
          <li>Height: {pokemonHeight}</li>
          <li>Weight: {pokemonWeight} lbs</li>
          <li>Type: {pokemontype}</li>
        </ol>
        <input
          id="poke"
          className="w-fit rounded-md border-2 border-black p-2"
          type="text"
          placeholder="Pokemon name or id"
        />
        <div className="flex h-fit w-fit">
          <button
            onClick={moveLeft}
            className="mr-2 h-10 w-10 justify-center self-center rounded-md border-2 border-black bg-blue-500 p-2 text-center text-green-200 hover:bg-blue-600">
            &#8592;
          </button>
          <button
            onClick={handlePokemonClick}
            className="justify-self-center rounded-md border-4 border-black bg-red-400 px-10 py-5 hover:bg-red-500">
            Search
          </button>
          <button
            onClick={moveRight}
            className="ml-2 h-10 w-10 justify-center self-center rounded-md border-2 border-black bg-blue-500 p-2 text-center text-green-200 hover:bg-blue-600">
            &#8594;
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
