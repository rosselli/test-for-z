import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from "./Form";
import Tasks from "./Tasks";
import TasksCounter from "./TasksCounter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Actions from "./Actions";
import TasksCompleted from "./TasksCompleted";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            estimated_at: Actions.formattedDate(new Date()),
            completed: '',
            tasks: [],
            tasksCompleted: [],
            counter: 0,
            counterCompleted: 0,
            editing: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleUncomplete = this.handleUncomplete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleCreateSubmit(e) {
        e.preventDefault();
        axios.post('/tasks', {
                title: this.state.title,
                estimated_at: this.state.estimated_at
            }).then(response => {
                this.setState({
                    title: '',
                    estimated_at: Actions.formattedDate(new Date()),
                    tasks: Actions.sortByEstimated([response.data, ...this.state.tasks]),
                    counter: this.state.counter + 1,
                });
            });
        toast("The task was created.");
    }

    handleEditSubmit(e) {
        e.preventDefault();
        axios.put(`/tasks/${this.state.id}`, {
            title: this.state.title,
            estimated_at: this.state.estimated_at
        }).then(response => {
            this.setState({
                id: 0,
                title: '',
                estimated_at: Actions.formattedDate(new Date()),
                tasks: Actions.updateInList(this.state.tasks, response.data, ['title', 'estimated_at']),
                editing: false
            });
            toast("The task was edited.");
        });
    }

    handleComplete(task) {
        axios.put(`/tasks-complete/${task.id}`, {
            completed: 1
        }).then(response => {
                if (response.data.id === task.id) {
                    this.setState({
                        tasksCompleted: Actions.sortByEstimated([response.data, ...this.state.tasksCompleted]),
                        tasks: Actions.removeInList(response.data.id, this.state.tasks),
                        counter: this.state.counter - 1,
                        counterCompleted: this.state.counterCompleted + 1
                    });
                }
            });
        toast("The task was completed.");
    }

    handleUncomplete(task) {
        axios.put(`/tasks-complete/${task.id}`, {
            completed: 0
        }).then(response => {
            if (response.data.id === task.id) {
                this.setState({
                    tasks: Actions.sortByEstimated([response.data, ...this.state.tasks]),
                    tasksCompleted: Actions.removeInList(response.data.id, this.state.tasksCompleted),
                    counter: this.state.counter + 1,
                    counterCompleted: this.state.counterCompleted - 1
                });
            }
        });
        toast("The task was uncomplete.");
    }

    getTasks() {
        axios.get('/tasks')
            .then((response) => {
                let tasks = [];
                let tasksCompleted = [];
                response.data.tasks.map((task) =>
                    (task.completed == 1) ? tasksCompleted.push(task) : tasks.push(task));

                this.setState({
                    tasks: [...tasks],
                    tasksCompleted: [...tasksCompleted],
                    counter: tasks.length,
                    counterCompleted: tasksCompleted.length
                })
            });
        toast("All tasks were loaded from database.");
    }

    componentDidMount() {
        this.getTasks();
    }

    handleDelete(task) {
        axios.delete(`/tasks/${task.id}`);
        let tasks = this.state.tasks;
        let tasksCompleted = this.state.tasksCompleted;

        if (task.completed == 1) {
            this.setState({
                tasksCompleted: Actions.removeInList(task.id, this.state.tasksCompleted),
                counterCompleted: this.state.counterCompleted - 1,
            });
        } else {
            this.setState({
                tasks: Actions.removeInList(task.id, this.state.tasks),
                counter: this.state.counter - 1,
            });
        }

        this.setState({
            title: '',
            estimated_at: Actions.formattedDate(new Date()),
            editing: false
        });
        toast("The task was removed.");
    }

    handleEdit(task){
        this.setState({
            id: task.id,
            title: task.title,
            estimated_at: task.estimated_at,
            editing: true
        });
    }

    handleCancel(e){
        e.preventDefault();
        this.setState({
            title: '',
            estimated_at: Actions.formattedDate(new Date()),
            editing: false
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Create Task
                                <span className="text-right">
                                    <TasksCounter label="Actives" counter={this.state.counter}/>
                                    <TasksCounter label="Completed" counter={this.state.counterCompleted}/>
                                </span>
                            </div>

                            <div className="card-body">
                                <ToastContainer />
                                {
                                    this.state.editing ?
                                        (<Form handleSubmit={this.handleEditSubmit}
                                               handleChange={this.handleChange}
                                               handleClick={this.handleCancel}
                                               id={this.state.id}
                                               title={this.state.title}
                                               estimated_at={this.state.estimated_at}
                                               button='Edit Task'
                                        />)
                                        :
                                        (<Form handleSubmit={this.handleCreateSubmit}
                                               handleChange={this.handleChange}
                                               title={this.state.title}
                                               estimated_at={this.state.estimated_at}
                                               button='Create Task'
                                        />)
                                }
                                <br />
                                <Tasks tasks={this.state.tasks}
                                       handleEdit={this.handleEdit}
                                       handleDelete={this.handleDelete}
                                       handleComplete={this.handleComplete}/>

                                <br />
                                <h4>Completed Tasks</h4>
                                <TasksCompleted tasks={this.state.tasksCompleted}
                                       handleDelete={this.handleDelete}
                                       handleUncomplete={this.handleUncomplete}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
