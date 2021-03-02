import React, {useState, useEffect} from 'react';
import "./index.css";
import TodoList from "./Todo/TodoList";
import Context from "./context"
import Loader from './Loader';
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => import('./Todo/AddToDo'));

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTodos(todos)
                setLoading(false)
            })
    }, []);

    const toggleToDo = (id) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        )
    };

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    };

    const addTodo = (title) => {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
        }]))
    };

    return (
        <Context.Provider value={{removeTodo}}>
            <div className='wrapper'>
                <h1 style={{textAlign: 'center', marginBottom: '3rem', color: 'orange', position: 'relative'}}>СПИСОК ДЕЛ</h1>

                <React.Suspense fallback={<p>Loading</p>}>
                    <AddTodo onCreate={addTodo}/>
                </React.Suspense>
                {loading && <Loader/>}
                {todos.length ? <TodoList todos={todos} onToggle={toggleToDo}/> :
                    loading ? null : <p>Нет записей.</p>
                }

                <Modal/>

            </div>
        </Context.Provider>

    );
}

export default App;
