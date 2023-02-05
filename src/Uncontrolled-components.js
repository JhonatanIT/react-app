// controlled vs uncontrolled...
// controlled puedes evaluar sus valores y aplicar
// validaciones en tiempo real,
// uncontrolled es un poco más "hacky" hacer lo mismo.
// Ya que debes llamar a
// onChange, de ahí obtener el valor por la referencia
// usando un ref, luego debes
// actualizar un estado y ahí puedes hacer la validación
// , pero para eso mejor setear el valor
// directamente con controlled components
// y nos olvidamos de ese problema.
// Controlled components también están sincronizados con la UI
// por lo que no tenemos que solicitar la data cada vez que ocurra
// un cambio
// Podemos entonces olvidarnos de los controlled components?
// la respuesta es NO, porque los input con el tipo de archivos
// son de solo lectura, por lo que no podemos
// controlarlos con react.
const App = () => {
  const submit = (e) => {
    e.preventDefault()
    const data = Array.from(new FormData(e.target))
    console.log(Object.fromEntries(data))
    //for(let [key, value] of data) {
      //console.log(key, value)
    //}
  }

  return (
    <form onSubmit={submit}>
      <div>
        <span>lala</span>
        <input name='campo'/>
      </div>
      <input name='lele'/>
      <input type='submit' value='Enviar' />
    </form>
  )
}

export default App
