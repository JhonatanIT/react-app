import { useState } from 'react'

const App = () => {
  const [form, setForm] = useState({ normal: '', text: '', select: '', check: false })
  
  //const handleChange = () => {
    //setForm({ normal: e.target.value })
  //}
  const handleChange = ({ target }) => {
    setForm(state => ({
      ...state,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    }))
  }

  const submit = () => {
    console.log(form)
  }

  return (
    <div>
      <input onChange={handleChange} name='normal' value={form.normal}/>

      <textarea onChange={handleChange} name='text' value={form.text}/>

      <select value={form.select} name='select' onChange={handleChange}>
        <option value=''>-- Seleccione --</option>
        <option value='chanchofeliz'>Chancho feliz</option>
        <option value='chanchitofeliz'>Chanchito feliz</option>
        <option value='chanchitotriste'>Chanchito triste</option>
        <option value='felipe'>Felipe</option>
      </select>
      <input
        type="checkbox"
        onChange={handleChange}
        name='check'
        checked={form.check}
      />
      <div onChange={handleChange}>
        <label>Chancho</label>
        <input type='radio' value='feliz' name='estado' /> Feliz
        <input type='radio' value='triste' name='estado' /> Triste
        <input type='radio' value='emocionado' name='estado' /> Emocionado
      </div>
      <button onClick={submit}>Enviar</button>
    </div>
  )
}

export default App
