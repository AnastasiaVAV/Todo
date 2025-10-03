import type { Dispatch, SetStateAction } from 'react'
import type { Todo } from './Todo'

export interface BaseTodoProps {
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export interface TodoItemProps extends BaseTodoProps {
  currentTask: Todo
}
