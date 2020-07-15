import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

class Reservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isGoing: true,
      numberOfGuests: 2
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('提交的表单数据', this.state)
  }

  handleInpChange(e) {
    const target = e.target
    const targetName = target.name
    const value = targetName === 'isGoing' ? target.checked : target.value

    this.updateState({ [targetName]: value })
  }

  updateState(data) {
    this.setState(data)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form">
        <div className="form__form-item">
          <label>参与:</label>
          <input name="isGoing" type="checkbox" value={this.state.isGoing} onChange={this.handleInpChange.bind(this)} />
        </div>
        <div className="form__form-item">
          <label>来宾人数:</label>
          <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleInpChange.bind(this)} />
        </div>
        <input type="submit" value="提交" className="form__submit-button" />
      </form>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Reservation />, rootElement);
