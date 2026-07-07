"use client";
import {useState, useEffect} from 'react';

async function postData(newTodo) {
    const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    });
    return response.json();
}

async function getData() {
    const response = await fetch('http://localhost:5000/todos',{
        method: 'GET',
    });
    return response.json();
}


const Todos = () =>{

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let mounted = true;
        const fetchTodos = async () => {
            // try {
            //     const response = await fetch('http://localhost:5000/todos');
            //     if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
            //     const items = await response.json();
            //     if (mounted) setTodos(items);
            // } catch (err) {
            //     console.error(err);
            // }
            const items = await getData();
            if (mounted) setTodos(items);
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
                        <a href={`/Todos/${todo.id}`} className="text-blue-500 hover:underline">
                            Details
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default Todos;
