import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() { 

  const [repositories,setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response =>{
        setRepositories(response.data)
        console.log(response.data);
    })
  },[])

  async function handleAddRepository() {
      const response = await api.post('repositories',{
        title:"Desafio Node.js3",
        url: "http://github.com/...",
        techs : ["Node.js", "ReactJs","ReactNative"]
      });

      const repositorie = response.data;

      setRepositories([...repositories,repositorie]);
  }

  async function handleRemoveRepository(id) {
      console.log(id);

        await api.delete('repositories/'+id);

      setRepositories(repositories.filter(
        repositorie => repositorie.id !== id
      ));

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositorie => <li key={repositorie.id}> {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
