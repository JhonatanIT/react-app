import './App.css';
import Button from './Button';

const styleLi = (bg = "#456") => ({
  backgroundColor: bg,
  color: "#fff"
})

const Li = ({ children }) => {
  <li style={styleLi("#582")} className="class-li">{children}</li>
}

const arr = [
  "First element",
  "Second element",
  "Third element"
]

function App() {
  return (
    <div>
      {arr.map(el => <p key={el}>{el}</p>)}
      <Button onClick={(e) => console.log('clicked', e)}>Soy un boton</Button>
    </div>
  );
}

export default App;
