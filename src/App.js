import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    reverseTaskSort: true,
    reverseDateSort: true,
    reverseCompletedSort: true
  }

  setListName = (name) => {
    let updatedList = this.state.currentList;
    updatedList.name = name;
    this.setState({currentList: updatedList});
  }

  setListOwner = (owner) => {
    let updatedList = this.state.currentList;
    updatedList.owner = owner;
    this.setState({currentList: updatedList});
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  sortTasks = () =>{
    let updatedList = this.state.currentList;
    if(this.state.reverseTaskSort){
      updatedList.items.sort((a,b) => a.description > b.description);
    } else {
      updatedList.items.sort((a,b) => a.description < b.description);
    }
    
    if(this.findFirstDate() === 0){
      this.setState({
        reverseDateSort: true
      })
    } else{
      this.setState({
        reverseDateSort: false
      })
    }
    if(this.findFirstCompleted() === 0){
      this.setState({
        reverseCompletedSort: true
      })
    } else{
      this.setState({
        reverseCompletedSort: false
      })
    }
    this.readjustKeys(updatedList);
    this.setState({
      currentList: updatedList,
      reverseTaskSort: !this.state.reverseTaskSort
    })
  }

  sortDates = () =>{
    let updatedList = this.state.currentList;
    if(this.state.reverseDateSort){
      updatedList.items.sort((a,b) => a.due_date > b.due_date);
    } else {
      updatedList.items.sort((a,b) => a.due_date < b.due_date);
    }
    if(this.findFirstTask() === 0){
      this.setState({
        reverseTaskSort: true
      })
    } else{
      this.setState({
        reverseTaskSort: false
      })
    }
    if(this.findFirstCompleted() === 0){
      this.setState({
        reverseCompletedSort: true
      })
    } else{
      this.setState({
        reverseCompletedSort: false
      })
    }
    this.readjustKeys(updatedList);
    this.setState({
      currentList: updatedList,
      reverseDateSort: !this.state.reverseDateSort
    })
  }

  sortComplete = () =>{
    let updatedList = this.state.currentList;
    if(this.state.reverseCompletedSort){
      updatedList.items.sort((a,b) => a.completed > b.completed);
    } else {
      updatedList.items.sort((a,b) => a.completed < b.completed);
    }
    if(this.findFirstTask() === 0){
      this.setState({
        reverseTaskSort: false
      })
    } else{
      this.setState({
        reverseTaskSort: true
      })
    }
    if(this.findFirstDate() === 0){
      this.setState({
        reverseDateSort: false
      })
    } else{
      this.setState({
        reverseDateSort: true
      })
    }
    this.readjustKeys(updatedList);
    this.setState({
      currentList: updatedList,
      reverseCompletedSort: !this.state.reverseCompletedSort
    })
  }

  findFirstTask(){
    let updatedList = this.state.currentList;
    for(let i = 0; i < updatedList.items.length-1; i++){
      if(updatedList.items[i].description <= updatedList.items[i+1].description){
        return i;
      } else{
        return i+1;
      }
    }
    return -1;
  }

  findFirstDate(){
    let updatedList = this.state.currentList;
    for(let i = 0; i < updatedList.items.length-1; i++){
      if(updatedList.items[i].due_date <= updatedList.items[i+1].due_date){
        return i;
      } else{
        return i+1;
      }
    }
    return -1;
  }

  findFirstCompleted(){
    let updatedList = this.state.currentList;
    for(let i = 0; i < updatedList.items.length; i++){
      if(updatedList.items[i].completed === true){
        return i;
      }
    }
    return -1;
  }

  readjustKeys(updateList){
    let i = 0;
    for(i; i < updateList.items.length; i++){
      updateList.items[i].key = i;
    }
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  moveListItemUp = (index) => {
    let updateList = this.state.currentList;
    if(index > 0){
      let temp = updateList.items[index-1];
      updateList.items[index-1] = updateList.items[index];
      updateList.items[index-1].key -= 1;
      updateList.items[index] = temp;
      updateList.items[index].key +=1;
      }
      if(this.findFirstTask() === 0){
        this.setState({
          reverseTaskSort: true
        })
      } else{
        this.setState({
          reverseTaskSort: false
        })
      }
      if(this.findFirstCompleted() === 0){
        this.setState({
          reverseCompletedSort: true
        })
      } else{
        this.setState({
          reverseCompletedSort: false
        })
      }
    if(this.findFirstCompleted() === 0){
      this.setState({
        reverseCompletedSort: true
      })
    }
    this.setState({currentList: updateList});
  }

  moveListItemDown = (index) => {
    let updateList = this.state.currentList;
    if(index < updateList.items.length-1){
      let temp = updateList.items[index+1];
      updateList.items[index+1] = updateList.items[index];
      updateList.items[index+1].key += 1;
      updateList.items[index] = temp;
      updateList.items[index].key -=1;
      }
      if(this.findFirstTask() === 0){
        this.setState({
          reverseTaskSort: true
        })
      } else{
        this.setState({
          reverseTaskSort: false
        })
      }
      if(this.findFirstCompleted() === 0){
        this.setState({
          reverseCompletedSort: true
        })
      } else{
        this.setState({
          reverseCompletedSort: false
        })
      }
    if(this.findFirstCompleted() === 0){
      this.setState({
        reverseCompletedSort: true
      })
    }
    this.setState({currentList: updateList});
  }
  removeListItem  = (index) => {
    let updateList = this.state.currentList;
    updateList.items.splice(index, 1);
    this.readjustKeys(updateList);
    if(this.findFirstTask() === 0){
        this.setState({
          reverseTaskSort: true
        })
      } else{
        this.setState({
          reverseTaskSort: false
        })
      }
      if(this.findFirstCompleted() === 0){
        this.setState({
          reverseCompletedSort: true
        })
      } else{
        this.setState({
          reverseCompletedSort: false
        })
      }
    if(this.findFirstCompleted() === 0){
      this.setState({
        reverseCompletedSort: true
      })
    }
    this.setState({currentList: updateList});
  }
  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          setListName={this.setListName.bind(this)}
          setListOwner={this.setListOwner.bind(this)}
          sortTasks={this.sortTasks.bind(this)}
          sortDates={this.sortDates.bind(this)}
          sortComplete={this.sortComplete.bind(this)}
          moveListItemUp={this.moveListItemUp.bind(this)}
          moveListItemDown={this.moveListItemDown.bind(this)}
          removeListItem={this.removeListItem.bind(this)} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;