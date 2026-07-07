"use client";
import {useState, useEffect} from 'react';

const Todos = () =>{

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let mounted = true;
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:5000/todos');
                if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
                const items = await response.json();
                if (mounted) setTodos(items);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTodos();
        return () => { mounted = false; };
    }, []);

    return(
        <div>
            <h1>Todos</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <h2>{todo.title}</h2>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default Todos;
