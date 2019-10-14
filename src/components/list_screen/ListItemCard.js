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
    setDisabledUp(){
        if(this.props.listItem.key === 0){
            return "list_item_card_button disabled";
        } else {
            return "list_item_card_button";
        }
    }
    setDisabledDown(){
        if(this.props.listItem.key === this.props.getLength()-1){
            return "list_item_card_button disabled";
        } else {
            return "list_item_card_button";
        }
    }
    moveListItemUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.moveListItemUp(this.props.listItem.key);
    }
    moveListItemDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.moveListItemDown(this.props.listItem.key);
    }
    removeListItem = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.removeListItem(this.props.listItem.key);
    }
    goItemScreen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.goItemScreen(this.props.listItem.key);
    }
    render() {
        return (
            <div className='list_item_card'
            onClick={this.goItemScreen}>
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
                <div className='list_item_card_toolbar'>
                    <div className={this.setDisabledUp()}
                    onClick={this.moveListItemUp}>&#x21e7;</div>
                    <div className={this.setDisabledDown()}
                    onClick={this.moveListItemDown}>&#x21e9;</div>
                    <div className='list_item_card_button'
                    onClick={this.removeListItem}>&#10005;</div>
                </div>
            </div>
        )
    }
}

export default ListItemCard
