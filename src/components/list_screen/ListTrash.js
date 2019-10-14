import React, { Component } from 'react'

export class ListTrash extends Component {
    state = {
        makeVisible: "modal"
    }
    makeVisible = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({makeVisible: "modal is_visible"});
    }
    makeInvisible = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({makeVisible: "modal"})
    }
    deleteList = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({makeVisible: "modal"});
        this.props.deleteList(this.props.todoList.key);
    }
    render() {
        return (
            <div id="list_trash" onClick={this.makeVisible}>&#128465;
              <div className={this.state.makeVisible} id="modal_yes_no_dialog" data-animation="slideInOutLeft">
                <div className="modal_dialog">
                  <header className="dialog_header">
                    Delete list?
                  </header>
                  <section className="dialog_content">
                    <p><strong>Are you sure you want to delete this list?</strong></p>
                  </section>
                  <button id="dialog_yes_button" onClick={this.deleteList}>Yes</button>
                  <button id="dialog_no_button" onClick={this.makeInvisible} >No</button>
                  <footer className="dialog_footer">
                    The list will not be retreivable.
                  </footer>
                </div>
              </div>
            </div>
        )
    }
}

export default ListTrash
