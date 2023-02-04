import { Component } from "react";

class Input extends Component {

  render() {
    return (
      <input
        value={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
}


class App extends Component {

  state = {
    name: '',
    lastName: ''
  }

  updateValues = (prop, value) => {
    this.setState({ [prop]: value })
  }

  render() {
    return (
      <p>
        Full name: {this.state.name + ' ' + this.state.lastName}
        <Input
          value={this.state.name}
          onChange={e => this.updateValues('name', e.target.value)}
        />
        <Input
          value={this.state.lastName}
          onChange={e => this.updateValues('lastName', e.target.value)}
        />
      </p>
    )
  }
}

export default App;
