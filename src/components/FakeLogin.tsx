const [ usernameToQuery, setUsernameToQuery ] = useState("");

const FakeLogin = ({ setLoggedInUsername }) => {
  
  <h1>Trove</h1>
  <label htmlFor="discogs-collection-search">Collection Search</label>
  <input type="search" id="discogs-collection-search" onChange={event => setUsernameToQuery(event.target.value)}/>
}

export default FakeLogin