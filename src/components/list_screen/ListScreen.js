import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return owner;
        }
    }
    setListName = (e) => {
        this.setState({name: e.target.value})
        this.props.setListName(e.target.value);
    }
    setListOwner = (e) => {
        this.setState({owner: e.target.value})
        this.props.setListOwner(e.target.value);
    }
    sortTasks(){
        this.props.sortTasks();
    }
    sortDates(){
        this.props.sortDates();
    }
    sortComplete(){
        this.props.sortComplete();
    }
    moveListItemUp = (index) => {
        this.props.moveListItemUp(index);
    }
    moveListItemDown = (index) => {
        this.props.moveListItemDown(index);
    }
    removeListItem = (index) => {
        this.props.removeListItem(index);
    }
    goItemScreen = (index) => {
        this.props.goItemScreen(index);
    }
    createNewItem = (index) => {
        this.props.createNewItem(index);
    }
    deleteList = (index) => {
        this.props.deleteList(index);
    }
    transactions = (e) => {
        if (e.nativeEvent.keyCode === 90) { 
            if(e.nativeEvent.ctrlKey){
                this.props.undoTransaction();
            }
         } else if (e.nativeEvent.keyCode === 89) { 
            if(e.nativeEvent.ctrlKey){
                this.props.redoTransaction();
            }
        }
    }

    render() {
        return (
            <div id="todo_list"
                onKeyDown = {this.transactions}
                tabIndex = "0">
                <div id="top_of_todolist">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash todoList={this.props.todoList}
                deleteList={this.deleteList.bind(this)}/>
                </div>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.getListName()}
                            onChange = {this.setListName}
                            type="text" 
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.getListOwner()}
                            onChange = {this.setListOwner}
                            type="text" 
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} 
                sortTasks={this.sortTasks.bind(this)}
                sortDates={this.sortDates.bind(this)}
                sortComplete={this.sortComplete.bind(this)}
                moveListItemUp={this.moveListItemUp.bind(this)}
                moveListItemDown={this.moveListItemDown.bind(this)}
                removeListItem={this.removeListItem.bind(this)}
                goItemScreen={this.goItemScreen.bind(this)}
                createNewItem={this.createNewItem.bind(this)} />
            </div>
        )
    }
}


ListScreen.propTypes = {
    todoList: PropTypes.shape({
        key: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired
    })
}

export default ListScreen
