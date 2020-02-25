import React, {Component} from 'react';

class TasksCounter extends Component {
    render(){
        return(
            <span className="badge badge-pill badge-primary tasks-counter">{this.props.label} { this.props.counter }</span>
        )
    }
}

export default TasksCounter;
