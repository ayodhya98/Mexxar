import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addTodo = (todo,priority) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false, priority },
  ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id, priority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, priority, isEditing: !todo.isEditing } : todo
      )
    );
  };

      
      const filteredTodos = todos.filter((todo) => {
        if (filter === "completed") {
          return todo.completed;
        } else if (filter === "incomplete") {
          return !todo.completed;
        } else {
          return true;
        }
      }).filter((todo) => {
        
        const searchLower = searchQuery.toLowerCase();
        return todo.task.toLowerCase().includes(searchLower);
      });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === "asc") {
      return a.task.localeCompare(b.task);
    } else if (sort === "desc") {
      return b.task.localeCompare(a.task);
    } else {
      return 0;
    }
  });


  return (
    <div className="TodoWrapper">
      <h1><b>Task - Manager</b></h1>

      <div className="filter-sort">
      <label>
          Search:
          <input type="text" value={searchQuery} onChange={handleSearchChange} />
        </label>

        <label>
          Filter:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>

        <label>
          Sort:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
      </div>

      <TodoForm addTodo={addTodo} />
    
    

      {
      todos.length === 0 ? ( 
      <p>No tasks</p>
    ) : 
      
    sortedTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id}/>
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
