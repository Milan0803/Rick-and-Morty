import { useState, useEffect, useRef } from "react"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component"

type Character = {
  id: number
  name: string
  image: string
  status: string
}

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const isFirstLoad = useRef(true)

  const fetchCharacters = async () => {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    )
    const newChars: Character[] = res.data.results

    setCharacters((prev) => [...prev, ...newChars])
    setPage((prev) => prev + 1)

    if (!res.data.info.next) {
      setHasMore(false)
    }
  }

  useEffect(() => {
    if (isFirstLoad.current) {
      fetchCharacters()
      isFirstLoad.current = false
    }
  }, [])

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Rick and Morty Characters</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchCharacters}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="row"
      >
        {characters
          .filter((char) =>
            char.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((char) => (
            <div key={char.id} className="col-md-3 mb-4">
              <div className="card">
                <img src={char.image} className="card-img-top" alt={char.name} />
                <div className="card-body">
                  <h5 className="card-title">{char.name}</h5>
                  <p className="card-text">{char.status}</p>
                </div>
              </div>
            </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default App
