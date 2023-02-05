import { useRef } from 'react'

const App = () => {
  const input = useRef()
  const tarea = useRef()
  const file = useRef()
  const submit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    form.append('archivo', file.current.files[0])
    console.log(Array.from(form))
  }

  return (
    <form onSubmit={submit}>
      <div>
        <span>lala</span>
        <input defaultValue='defecto' type='text' name='campo' ref={input} />
        <input type='file' ref={file} />
        <textarea name='textarea' ref={tarea} />
      </div>
      <input type='submit' value='Enviar' />
    </form>
  )
}

export default App
