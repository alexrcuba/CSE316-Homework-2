import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state = {
        description: this.getDescription(),
        assigned_to: this.getAssignedTo(),
        due_date: this.getDueDate(),
        completed: this.getCompleted()
    }
    getDescription() {
        if (this.props.todoItem) {
            let description = this.props.todoItem.description;
            return description;
        }
        else
            return "";
    }
    getAssignedTo() {
        if (this.props.todoItem) {
            let assigned_to = this.props.todoItem.assigned_to;
            return assigned_to;
        } else {
            return "";
        }
    }
    getDueDate() {
        if (this.props.todoItem) {
            let due_date = this.props.todoItem.due_date;
            return due_date;
        } else {
            return "";
        }
    }
    getCompleted() {
        if (this.props.todoItem) {
            let completed = this.props.todoItem.completed;
            return completed;
        } else {
            return false;
        }
    }
    setDescription = (e) => {
        e.preventDefault();
        this.submitDisable();
        this.setState({description: e.target.value});
        this.props.setDescription(e.target.value);
    }
    setAssignedTo = (e) => {
        e.preventDefault();
        this.submitDisable();
        this.setState({assigned_to: e.target.value});
        this.props.setAssignedTo(e.target.value);
    }
    setDueDate = (e) => {
        e.preventDefault();
        this.submitDisable();
        this.setState({due_date: e.target.value});
        this.props.setDueDate(e.target.value);
    }
    setCompleted = (e) => {
        this.setState({completed: e.target.checked});
        this.props.setCompleted(e.target.checked);
    }
    submitChanges = (e) => {
        e.preventDefault();
        if(!(this.state.assigned_to === "" || this.state.description === "" || this.state.due_date === "")){
            this.props.submitChanges();
        }
    }
    submitDisable() {
        if(this.state.assigned_to === "" || this.state.description === "" || this.state.due_date === ""){
            return "item_button disabled";
        } else {
            return "item_button";
        }
    }
    cancelChanges = (e) => {
        e.preventDefault();
        this.props.cancelChanges();
    }
    render() {
        return (
            <div id="todo_item">
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div id="item_description_prompt" 
                      className="item_prompt">Description:</div>
                    <input id="item_description_textfield"
                      className="item_input" 
                      type="input"
                      value={this.state.description}
                      onChange={this.setDescription} />
                    <div id="item_assigned_to_prompt" 
                      className="item_prompt">Assigned To:</div>
                    <input id="item_assigned_to_textfield" 
                      className="item_input" 
                      type="input" 
                      value={this.state.assigned_to}
                      onChange={this.setAssignedTo} />
                    <div id="item_due_date_prompt" 
                      className="item_prompt">Due Date:</div>
                    <input id="item_due_date_picker" 
                      className="item_input" 
                      type="date" 
                      value={this.state.due_date}
                      onChange={this.setDueDate} />
                    <div id="item_completed_prompt" 
                      className="item_prompt">Completed:</div>
                    <input id="item_completed_checkbox" 
                      className="item_input" 
                      type="checkbox" 
                      checked={this.state.completed}
                      onChange={this.setCompleted}/>
                </div>
                <button id="item_form_submit_button" 
                  className={this.submitDisable()} 
                  onClick={this.submitChanges}>Submit</button>
                <button id="item_form_cancel_button" 
                  className="item_button"
                  onClick={this.cancelChanges}>Cancel</button>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
