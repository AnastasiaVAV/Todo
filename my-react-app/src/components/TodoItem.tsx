import { useState, useRef, useEffect } from 'react'
import type { FormEvent } from 'react'
import type { TodoItemProps } from '../interfaces/TodoProps'

type ButtonKey = 'edit' | 'delete' | 'save' | 'cancel'

interface ButtonConfig {
  key: ButtonKey
  label: string
  onClick: () => void
  className: string
}

const TodoItem = ({ currentTask, todos, setTodos }: TodoItemProps) => {
  const { id, text, completed } = currentTask
  const editInputEl = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(text)

  useEffect(() => {
    if (isEditing) editInputEl.current?.focus()
  }, [isEditing])

  const handleChangeTaskCompleted = () => {
    const updatedTodos = todos.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    )
    setTodos(updatedTodos)
  }

  const handleEditingTask = () => {
    setIsEditing(true)
  }

  const saveEdit = () => {
    const trimmedTask = editedTask.trim()

    if (!trimmedTask) return

    const updatedTodos = todos.map(task =>
      task.id === id ? { ...task, text: trimmedTask } : task,
    )
    setTodos(updatedTodos)
    setIsEditing(false)
  }

  const handleSaveEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveEdit()
  }

  const handleCancelEdit = () => {
    setEditedTask(text)
    setIsEditing(false)
  }

  const handleRemoveTask = () => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const viewButtons: ButtonConfig[] = [
    {
      key: 'edit',
      label: 'Редактировать',
      onClick: handleEditingTask,
      className: 'button-primary',
    },
    {
      key: 'delete',
      label: 'Удалить',
      onClick: handleRemoveTask,
      className: 'button-reset',
    },
  ]

  const editButtons: ButtonConfig[] = [
    {
      key: 'save',
      label: 'Сохранить',
      onClick: saveEdit,
      className: 'button-primary',
    },
    {
      key: 'cancel',
      label: 'Отмена',
      onClick: handleCancelEdit,
      className: 'button-reset',
    },
  ]

  const currentButtons = isEditing ? editButtons : viewButtons

  return (
    <li className="todo-list__item">
      {isEditing
        ? (
            <form
              className="todo-list__edit-form"
              onSubmit={handleSaveEdit}
              aria-label="Редактирование задачи"
            >
              <input
                type="text"
                id={id}
                value={editedTask}
                onChange={e => setEditedTask(e.target.value)}
                className="todo-list__edit-input"
                ref={editInputEl}
              />
            </form>
          )
        : (
            <div className="todo-list__view">
              <input
                type="checkbox"
                id={id}
                onChange={handleChangeTaskCompleted}
                className="todo-list__view-input"
                checked={completed}
              />
              <label
                htmlFor={id}
                className={completed ? 'completed' : ''}
                onDoubleClick={() => setIsEditing(true)}
              >
                {text}
              </label>
            </div>
          )}

      <div className="todo-list__buttons">
        {currentButtons.map(({ key, label, onClick, className }) => (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className={`todo-list__item-button button ${className}`}
            aria-label={label}
          >
            {label}
          </button>
        ))}
      </div>
    </li>
  )
}

export default TodoItem
