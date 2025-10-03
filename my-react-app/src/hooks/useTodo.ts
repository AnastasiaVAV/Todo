import { useState, useEffect } from 'react'
import type { Todo } from '../interfaces/Todo'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => JSON.parse(localStorage.getItem('todos') || '[]'))

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return [todos, setTodos] as const
}
