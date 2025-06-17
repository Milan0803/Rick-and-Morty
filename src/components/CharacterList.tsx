import { useState, useEffect, useRef } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CharacterItem from "./CharacterItem";
import type { ICharacter } from "../types/character";

const App = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [page, setPage] = useState(1);
  const hasMore = useRef(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, [searchTerm, page, status]);

  const fetchCharacters = async () => {
    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${searchTerm}&status=${status}`
      );

      const newChars: ICharacter[] = res.data.results || [];
      setCharacters((prev) => (page === 1 ? newChars : [...prev, ...newChars]));
      hasMore.current = !!res.data.info.next;
    } catch (error) {
      setCharacters([]);
      hasMore.current = false;
    }
  };

  return (
    <div className="container mt-4 mx-auto">
      <h2 className="text-center mb-4">Rick and Morty Characters</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />
      <div className="d-flex mb-3">
        <h5 className="me-3">Character status:</h5>
        <div className="d-flex">
          <div className="me-3">
            <label className="me-1" htmlFor="any">
              Any
            </label>
            <input
              type="radio"
              value=""
              id="any"
              name="status"
              defaultChecked
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="me-3">
            <label className="me-1" htmlFor="alive">
              Alive
            </label>
            <input
              type="radio"
              value="Alive"
              id="alive"
              name="status"
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="me-3">
            <label className="me-1" htmlFor="dead">
              Dead
            </label>
            <input
              type="radio"
              value="Dead"
              id="dead"
              name="status"
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div>
            <label className="me-1" htmlFor="unknown">
              Unknown
            </label>
            <input
              type="radio"
              value="Unknown"
              id="unknown"
              name="status"
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>
      {characters.length > 0 && (
        <InfiniteScroll
          dataLength={characters.length}
          next={() => {
            setPage((prev) => prev + 1);
          }}
          hasMore={hasMore.current}
          loader={<h4>Loading...</h4>}
          className="row"
        >
          {characters.map((char) => (
            <CharacterItem
              key={char.id}
              image={char.image}
              name={char.name}
              status={char.status}
            />
          ))}
        </InfiniteScroll>
      )}
      {characters.length === 0 && (
        <div className="text-center">
          <h4>No characters found</h4>
        </div>
      )}
    </div>
  );
};

export default App;
