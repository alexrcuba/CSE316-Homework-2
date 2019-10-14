import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    sortTasks = (e) => {
        e.preventDefault();
        this.props.sortTasks();
    }

    sortDates = (e) => {
        e.preventDefault();
        this.props.sortDates();
    }

    sortComplete = (e) => {
        e.preventDefault();
        this.props.sortComplete();
    }
    getLength(){
        return this.props.todoList.items.length;
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
    createNewItem = (e) => {
        this.props.createNewItem(this.props.todoList.items.length);
    }
    render() {
        return (
            <div id="list_items_and_header_container">
            <div id="list_items_header_card" className = "list_item_header_card">
                <div className="list_item_header_card"></div>
                <div className="list_item_task_header" onClick={this.sortTasks}>Task</div>
                <div className="list_item_due_date_header" onClick={this.sortDates}>Due Date</div>
                <div className="list_item_status_header" onClick={this.sortComplete}>Status</div>
            </div>
            <div id="list_item_container">
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem}
                            getLength={this.getLength.bind(this)}
                            moveListItemUp={this.moveListItemUp.bind(this)}
                            moveListItemDown={this.moveListItemDown.bind(this)}
                            removeListItem={this.removeListItem.bind(this)}
                            goItemScreen={this.goItemScreen.bind(this)} />
                    ))
                }
            </div>
            <div className="list_item_add_card"
              onClick={this.createNewItem}>+</div>
            </div>
        )
    }
}

export default ListItemsTable
