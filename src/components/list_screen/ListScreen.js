import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
//import PropTypes from 'prop-types';

export class ListScreen extends Component {
    state = {
        name: this.getListName(),
        owner: this.getListOwner()
    }
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
    render() {
        return (
            <div id="todo_list">
                <div id="top_of_todolist">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                </div>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.state.name}
                            onChange = {this.setListName}
                            type="text" 
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.state.owner}
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
                removeListItem={this.removeListItem.bind(this)} />
            </div>
        )
    }
}

export default ListScreen
