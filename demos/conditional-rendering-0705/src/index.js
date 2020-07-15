import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

function WarningBanner(props) {
  if (!props.warn) return null

  return (
    <div className="warning">
      Warning!
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showWarning: true
    }
  }

  handleToggleClick() {
    this.setState({
      showWarning: !this.state.showWarning
    })
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick.bind(this)}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Page />, rootElement);
