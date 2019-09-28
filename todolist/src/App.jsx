import React from 'react';
import classes from "./app.module.css";
import BlockItem from "./component/AddItem";

class App extends React.Component {
  state = {
    addItem: [],
    toRend:[],
  }
  inputValue;
  onload(storage){
    if(storage.length > 0){
      const keys = Object.keys(storage),
            toRend = [];
      for(let key of keys){
        if(key === "loglevel")continue;
        toRend.push([key, JSON.parse(storage.getItem(key))])
      }
      this.setState({
        toRend:toRend
      })

    }
  }
  inputListener(event){
    this.inputValue = event.target;
    this.setState({
      addItem: [ event.target.value, false,]
    })
  }
  addNewItem(){
    let toRend = this.state.toRend,
        addItem = this.state.addItem
    if(toRend.indexOf(addItem) === -1 && addItem[0].trim() !== ""){
      localStorage.setItem(addItem[0],addItem[1]);
      toRend.push(addItem);
      this.setState({
        toRend: toRend
      })
      this.inputValue.value = "";

    }
  }

  checkHandler(obj){
    const toRend = this.state.toRend;
    toRend[obj.index][1] = !toRend[obj.index][1];
    localStorage.clear();
    toRend.forEach(e => localStorage.setItem(e[0],e[1]))
    this.setState({
      toRend: toRend
    })
  }
  deleteHandler(obj){
    const toRend = this.state.toRend;
    toRend.splice(obj.index,1);
    localStorage.clear();
    toRend.forEach(e => localStorage.setItem(e[0],e[1]))
    this.setState({
      toRend: toRend
    })
  }
  clearAllHandler(){
    localStorage.clear();
    this.setState({
      toRend: []
    })
  }
  componentDidMount(){
    this.onload(localStorage)
  }
  render(){

    return (
      <main className={classes.main}>
        <div className={classes.toDoWrapper}>
          <div className={classes.head}>ToDo list
            <button className={classes.clearAll}
                    onClick={this.clearAllHandler.bind(this)}>
            </button>
          </div>
          <div className={classes.inputWrapper}>
            <input type="text"
                  className={classes.inputAdd}
                  onChange={event => this.inputListener(event)} autoFocus={true}/>
            <button className={classes.addToDoItem} onClick={this.addNewItem.bind(this)}>
            </button>
          </div>
          <div className={classes.toDoListExistingWrapper}>
            <div className={classes.line}></div>
            <ul className={classes.toDoListWrapper}>
              { this.state.toRend.length > 0 ?
                 this.state.toRend.map((e, index) =>
                   <BlockItem key={index}
                              index={index}
                              ifChecked={e[1]}
                              check={this.checkHandler.bind(this)}
                              delete={this.deleteHandler.bind(this)}
                              text={e[0]}/>
                  )
                 : null }
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
