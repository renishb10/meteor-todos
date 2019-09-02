import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

class App extends Component {
    renderTasks() {
        return this.props.tasks.map(task => (
            <Task key={task._id} task={task} />
        ));
    }

    handleSubmit(e) {
        e.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
        });

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input 
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        )
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    }
})(App);
