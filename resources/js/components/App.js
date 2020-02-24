import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from "./Form";
import Tasks from "./Tasks";
import TasksCounter from "./TasksCounter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        const initialEstimatedAt = this.formattedDate(new Date());
        this.state = {
            title: '',
            estimated_at: '',
            tasks: [],
            counter: 0,
            editing: false,
            id: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit   = this.handleEdit.bind(this);
    }

    formattedDate(date){
        let dd = date.getDate();
        let mm = date.getMonth()+1;
        let yyyy = date.getFullYear();
        if(dd < 10) { dd = '0' + dd; }
        if(mm < 10) { mm = '0' + mm; }
        return `${yyyy}-${mm}-${dd}`;
    }

    sortTasksByEstimated(){
        const tasks = this.state.tasks;
        this.setState({
            tasks: tasks.sort((a, b) => new Date(b.estimated_at) - new Date(a.estimated_at))
        });
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
                // console.log('from handle submit', response);
                this.setState({
                    tasks: [response.data, ...this.state.tasks],
                    counter: this.state.counter + 1,
                    title: '',
                    estimated_at: '',
                });
                this.sortTasksByEstimated();
            });
        toast("The task was created.");
    }

    handleEditSubmit(e) {
        e.preventDefault();
        axios.put(`/tasks/${this.state.id}`, {
            title: this.state.title,
            estimated_at: this.state.estimated_at
        }).then(response => {
            const updatedTasks = this.state.tasks;
            updatedTasks.map(task => {
                if (task.id === this.state.id) {
                    task.title = this.state.title;
                    task.estimated_at = this.state.estimated_at;
                }
            });

            this.setState({
                tasks: updatedTasks,
                title: '',
                estimated_at: '',
                id: 0,
                editing: false
            });
            this.sortTasksByEstimated();
            toast("The task was edited.");
        });

    }

    getTasks() {
        axios.get('/tasks')
            .then((response) => {
                this.setState({
                    tasks: [...response.data.tasks],
                    counter: response.data.tasks.length
                })
            });
        toast("All tasks were loaded from database.");
    }

    componentDidMount() {
        this.getTasks();
    }

    handleDelete(id) {
        const isNotId = task => task.id !== id;
        const updatedTasks = this.state.tasks.filter(isNotId);
        this.setState({
            tasks: updatedTasks,
            counter: this.state.counter - 1,
            title: ''
        });

        axios.delete(`/tasks/${id}`);
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

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Create Task
                                <TasksCounter counter={this.state.counter}/>
                            </div>
                            <div className="card-body">
                                <ToastContainer />
                                {
                                    this.state.editing ?
                                        (<Form handleSubmit={this.handleEditSubmit}
                                               handleChange={this.handleChange}
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
                                       handleDelete={this.handleDelete}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
