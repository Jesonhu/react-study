import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      username: '', 
      description: '',
      likeFruitName: 'mango',
      favorite: ['movie', 'game', 'coding']
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('提交的表单数据', this.state)
  }

  handleUserNameChange(e) {
    const nowValue = e.target.value
    this.updateState({ username: nowValue })
  }

  handleUserDescriptionChange(e) {
    const nowValue = e.target.value
    this.updateState({ description: nowValue })
  }

  handlelikeFruitNameChange(e) {
    const nowValue = e.target.value
    this.updateState({ likeFruitName: nowValue })
  }

  handleFavoriteChange(e) {
    const nowValue = e.target.value
    const oldFavorite = this.state.favorite.slice()
    const findIndex = oldFavorite.indexOf(nowValue)
    let newFavorite
    // 取消选中
    if ( findIndex >= 0) { 
      oldFavorite.splice(findIndex, 1)
      newFavorite = oldFavorite
    } else { // 新增选中
      console.log(oldFavorite, oldFavorite.concat)
      newFavorite = new Set( oldFavorite.concat(nowValue) )
    }
    // console.log('爱好', [ ...newFavorite ])
    this.updateState({ favorite: [ ...newFavorite ] })
  }

  updateState(data) {
    this.setState(data)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form">
        <div className="form__form-item">
          <label>名字:</label>
          <input type="text" value={this.state.username} onChange={this.handleUserNameChange.bind(this)} />
        </div>
        <div className="form__form-item">
          <label>描述:</label>
          <textarea value={this.state.description} onChange={this.handleUserDescriptionChange.bind(this)} />
        </div>
        <div className="form__form-item">
          <label>喜欢的水果(单选):</label>
          <select value={this.state.likeFruitName} onChange={this.handlelikeFruitNameChange.bind(this)}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </div>
        <div className="form__form-item">
          <label>爱好(多选):</label>
          <select multiple={true} value={this.state.favorite} onChange={this.handleFavoriteChange.bind(this)}>
            <option value="movie">看电影</option>
            <option value="read">看书</option>
            <option value="coding">编程</option>
            <option value="game">玩游戏</option>
            <option value="exercise">运动</option>
          </select>
        </div>
        <input type="submit" value="提交" className="form__submit-button" />
      </form>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NameForm />, rootElement);
