import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import type { BaseTodoProps } from '../interfaces/TodoProps'

type Filter = 'all' | 'active' | 'completed'

const filterButtons: { key: Filter, label: string, ariaLabel: string }[] = [
  { key: 'all', label: 'Все', ariaLabel: 'Показать все задачи' },
  { key: 'active', label: 'Активные', ariaLabel: 'Показать активные задачи' },
  { key: 'completed', label: 'Завершенные', ariaLabel: 'Показать завершенные задачи' },
]

const getTasksText = (count: number): string => {
  if (count === 0) return 'Нет активных задач'
  if (count === 1) return `Осталась ${count} задача`
  if (count >= 2 && count <= 4) return `Осталось ${count} задачи`
  return `Осталось ${count} задач`
}

const TodoList = ({ todos, setTodos }: BaseTodoProps) => {
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [filter, setFilter] = useState<Filter>('all')
  const [activeTodosCount, setActiveTodosCount] = useState(0)

  const buttonsClasses = (buttonFilter: Filter) => {
    return filter === buttonFilter
      ? 'button button-active'
      : 'button button-inactive'
  }

  useEffect(() => {
    const activeTodosCount = todos.filter(task => !task.completed).length
    setActiveTodosCount(activeTodosCount)

    switch (filter) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed))
        return
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed))
        return
      default:
        setFilteredTodos(todos)
        return
    }
  }, [todos, filter])

  return (
    <div className="todo-list">
      <div className="todo-list__container">
        <div className="todo-list__filters">
          {filterButtons.map(({ key, label, ariaLabel }) => (
            <button
              key={key}
              type="button"
              className={buttonsClasses(key)}
              onClick={() => setFilter(key)}
              disabled={filter === key}
              aria-label={ariaLabel}
            >
              {label}
            </button>
          ))}
        </div>
        <ul className="todo-list__list">
          {filteredTodos.map((task) => {
            return (
              <TodoItem
                key={task.id}
                currentTask={task}
                todos={todos}
                setTodos={setTodos}
              />
            )
          })}
        </ul>
      </div>
      {filter === 'all' && <p>{getTasksText(activeTodosCount)}</p>}
    </div>
  )
}

export default TodoList
