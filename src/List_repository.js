import React, { useEffect, useState } from 'react';
import './index.css';

function List_repository() {
    const [result, setResult] = useState([]);
    const [user, setUser] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState();
    const getRepository = async (user) => {
        setResult([]);
        setIsError(null);
        setIsFetching(true);
        fetch(`https://api.github.com/users/${user}/repos`).then((response) => response.json()).then((data) => {
            setResult(data);
            setIsFetching(!isFetching);
        }).catch((err) => console.log(err));
    };
  
    useEffect(() => {
      user === "" && setResult([]);
    }, [user]);
  
    return (
        <div>
            <header className="App-header">
                <h1>
                    Aplikasi pencari repository 
                    <a href="//github.com">GitHub</a>
                </h1>
            </header>
            <div>
                <div>
                    <label for="username">Input Username : </label>
                    <input 
                        placeholder="input Username"
                        id="username"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        onKeyDown={(e) => e.code === "Enter" && getRepository(user)}
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value="Submit"
                        onClick={() => {getRepository(user);}}
                    />
                </div>
            </div>
            <div>
                <p>List repository for {user || "..."}</p>
                {
                    result.length > 0 ? (result?.map((item) => (
                        <li>{item.name} : <a href={item.html_url}>{item.html_url}</a></li>
                    ))
                    ) : isFetching ? (
                        <p>loading ...</p>
                    ) : isError ? (
                        <p>{isError}</p>
                    ) : result?.message ? (
                        <p>{result.message}</p>
                    ) : (
                        <>
                        
                        </>
                    )}
            </div>
      </div>
    );
  }
  
export default List_repository;