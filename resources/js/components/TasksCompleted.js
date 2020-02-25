import React, {Component} from 'react';

class TasksCompleted extends Component {
    constructor(props) {
        super();
    }

    render(){
        return (
            this.props.tasks.map((task) => {
                return (
                    <div key={task.id} id={task.id} className="media">
                        <div className="media-body">
                            <div>
                                <s>{task.title}{' '}</s>
                                <div className="btn-group float-right">
                                    <button onClick={() => this.props.handleDelete(task)} className="btn btn-sm btn-warning">Delete</button>
                                    <button onClick={() => this.props.handleUncomplete(task)} className="btn btn-sm btn-primary">Uncomplete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
}

export default TasksCompleted;
