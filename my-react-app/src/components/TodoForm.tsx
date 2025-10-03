import { useEffect, useState, useRef } from 'react'

import type { FormEvent } from 'react'
import type { Todo } from '../interfaces/Todo'
import type { BaseTodoProps } from '../interfaces/TodoProps'

const getUniqueId = (prefix: string = 'task'): string => {
  const counter = Date.now().toString()
  const id = `${prefix}_${counter}`
  return id
}

const TodoForm = ({ todos, setTodos }: BaseTodoProps) => {
  const [currentTask, setTask] = useState<string>('')
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputEl.current?.focus()
  }, [])

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedTask = currentTask.trim()

    if (!trimmedTask) return

    const newTask: Todo = {
      id: getUniqueId(),
      text: trimmedTask,
      completed: false,
    }

    const updatedTodos = [newTask, ...todos]

    setTodos(updatedTodos)
    setTask('')
    inputEl.current?.focus()
  }

  return (
    <div className="todo-form">
      <form
        className="todo-form__form"
        onSubmit={handleSubmitForm}
        aria-label="Добавление задачи"
      >
        <input
          type="text"
          onChange={e => setTask(e.target.value)}
          value={currentTask}
          className="todo-form__input"
          placeholder="Новая задача"
          id="taskInput"
          ref={inputEl}
          required
        />
        <button
          type="submit"
          className="button button-primary"
          disabled={!currentTask.trim()}
          aria-label="Добавить новую задачу"
        >
          Добавить
        </button>
      </form>
    </div>
  )
}

export default TodoForm
