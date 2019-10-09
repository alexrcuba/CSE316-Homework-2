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
                            listItem={todoItem} />
                    ))
                }
            </div>
            </div>
        )
    }
}

export default ListItemsTable
