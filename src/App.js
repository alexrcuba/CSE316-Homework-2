import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import todoList_Transaction from './jsTPS/todoList_Transaction.js'
import jsTPS from './jsTPS/jsTPS.js'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  constructor(){
    super();
    this.jsTPS = new jsTPS();
    this.newItem = 0;
  }
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    reverseTaskSort: true,
    reverseDateSort: true,
    reverseCompletedSort: true,
  }

  setListName = (name) => {
    let updatedList = this.state.currentList;
    this.createTransaction(updatedList);
    if(name === ""){
      updatedList.name = "null";
    } else {
      updatedList.name = name;
    }
    this.setState({currentList: updatedList});
  }

  setListOwner = (owner) => {
    let updatedList = this.state.currentList;
    this.createTransaction(updatedList);
    if(owner === ""){
      updatedList.owner = "null";
    } else {
      updatedList.owner = owner;
    }
    this.setState({currentList: updatedList});
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    this.jsTPS.clearAllTransactions();
  }

  goItemScreen = (index) => {
    this.newDescription = JSON.parse(JSON.stringify(this.state.currentList.items[index].description));
    this.newAssignedTo = JSON.parse(JSON.stringify(this.state.currentList.items[index].assigned_to));
    this.newDueDate = JSON.parse(JSON.stringify(this.state.currentList.items[index].due_date));
    this.newCompleted = JSON.parse(JSON.stringify(this.state.currentList.items[index].completed));
    this.setState({currentScreen: AppScreen.ITEM_SCREEN,
      currentItem: index});
  }

  sortTasks = () =>{
    let updatedList = this.state.currentList;
    this.createTransaction(updatedList);
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
    this.createTransaction(updatedList);
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
    this.createTransaction(updatedList);
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

  readjustKeysList(updateList){
    let i = 0;
    for(i; i < updateList.length; i++){
      updateList[i].key = i;
    }
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }
  newDescription = null;
  newAssignedTo = null;
  newDueDate = null;
  newCompleted = null;
  moveListItemUp = (index) => {
    let updateList = this.state.currentList;
    this.createTransaction(updateList);
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
    this.createTransaction(updateList);
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
    this.createTransaction(updateList);
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
  setDescription = (description) => {
    this.newDescription = description;
  }
  setAssignedTo = (assigned_to) => {
    this.newAssignedTo = assigned_to;
  }
  setDueDate = (due_date) => {
    this.newDueDate = due_date;
  }
  setCompleted = (completed) => {
    this.newCompleted = completed;
  }
  submitChanges = () => {
    let updateList = JSON.parse(JSON.stringify(this.state.currentList));
    console.log(this.state.currentList);
    this.createTransaction(this.state.currentList);
    this.readjustKeys(updateList);
    updateList.items[this.state.currentItem].description = this.newDescription;
    updateList.items[this.state.currentItem].assigned_to = this.newAssignedTo;
    updateList.items[this.state.currentItem].due_date = this.newDueDate;
    updateList.items[this.state.currentItem].completed = this.newCompleted;
    this.setState({currentScreen: AppScreen.LIST_SCREEN,
      currentList: updateList,
      currentItem: null})
  }
  cancelChanges = () => {
    let updateList = this.state.currentList;
    if(this.newItem === 1){
    updateList.items.splice((updateList.items.length-1), 1);
    }
    this.newItem = 0;
    this.setState({currentScreen: AppScreen.LIST_SCREEN,
      currentItem: null,
      currentList: updateList
    });
  }
  createNewItem = (index) => {
    this.newItem = 1;
    let updateList = this.state.currentList;
    let newItem = {
      key: null,
      description: "Unknown",
      due_date: "",
      assigned_to: "Unknown",
      completed: false
    };
    newItem.key = index;
    updateList.items.push(newItem);
    this.setState({currentList: updateList,
    currentScreen: AppScreen.ITEM_SCREEN,
    currentItem: index});
    this.newDescription = this.state.currentList.items[index].description;
    this.newAssignedTo = this.state.currentList.items[index].assigned_to;
    this.newDueDate = this.state.currentList.items[index].due_date;
    this.newCompleted = this.state.currentList.items[index].completed;
  }
  deleteList = (index) => {
    let updateList = this.state.todoLists;
    updateList.splice(index, 1);
    this.readjustKeysList(updateList);
    this.setState({currentList: null,
    todoLists: updateList,
    currentScreen: AppScreen.HOME_SCREEN});
  }
  createNewList = () => {
    let updateList = this.state.todoLists;
    let newList = {
      key: updateList.length,
      name: "Unknown",
      owner: "Unknown",
      items: []
    };
    updateList.push(newList);
    this.setState({currentList: newList,
      currentScreen: AppScreen.LIST_SCREEN});
  }
  undoTransaction = () => {
    let list = this.jsTPS.undoTransaction();
    this.jsTPS.transactions[this.jsTPS.mostRecentTransaction+1] = new todoList_Transaction(this.state.currentList);
    if(list !== undefined){
        this.setState({currentList: list});
    }
  }
  redoTransaction = () => {
    let list = this.jsTPS.doTransaction();
    this.jsTPS.transactions[this.jsTPS.mostRecentTransaction] = new todoList_Transaction(this.state.currentList);
    if(list !== undefined){
    this.setState({currentList: list})
    }
  }
  createTransaction(list){
    let newList = {
      key: null,
      name: "Unknown",
      owner: "Unknown",
      items: []
    };
    newList.key = JSON.parse(JSON.stringify(list.key));
    newList.name = JSON.parse(JSON.stringify(list.name));
    newList.owner = JSON.parse(JSON.stringify(list.owner));
    newList.items = JSON.parse(JSON.stringify(list.items));
    this.jsTPS.addTransaction(new todoList_Transaction(newList));
  }
  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists}
        createNewList={this.createNewList} />;
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
          removeListItem={this.removeListItem.bind(this)}
          goItemScreen={this.goItemScreen.bind(this)}
          createNewItem={this.createNewItem.bind(this)}
          deleteList={this.deleteList.bind(this)}
          undoTransaction={this.undoTransaction.bind(this)}
          redoTransaction={this.redoTransaction.bind(this)} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen
          todoItem={this.state.currentList.items[this.state.currentItem]}
          setDescription={this.setDescription.bind(this)}
          setAssignedTo={this.setAssignedTo.bind(this)}
          setDueDate={this.setDueDate.bind(this)}
          setCompleted={this.setCompleted.bind(this)}
          submitChanges={this.submitChanges.bind(this)}
          cancelChanges={this.cancelChanges.bind(this)} />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;