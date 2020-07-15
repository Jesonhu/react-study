import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '' }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('提交的名字', this.state.username)
  }

  handleUserNameChange(e) {
    const nowValue = e.target.value
    this.setState({ username: nowValue })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form">
        <label className="form__form-item">
          名字:
          <input type="text" value={this.state.username} onChange={this.handleUserNameChange.bind(this)} />
        </label>
        <input type="submit" value="提交" className="form__submit-button" />
      </form>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NameForm />, rootElement);
