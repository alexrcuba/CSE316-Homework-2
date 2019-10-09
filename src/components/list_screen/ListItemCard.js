import React, { Component } from 'react'

export class ListItemCard extends Component {
    isCompleted(){
        return this.props.listItem.completed ? "Completed" : "Pending";
    }
    getStyle(){
        return {
            color: this.props.listItem.completed ? "green" : "red"
        };
    }
    render() {
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className='list_item_card_completed' style={this.getStyle()}>
                    {this.isCompleted()}
                </div>
            </div>
        )
    }
}

export default ListItemCard
