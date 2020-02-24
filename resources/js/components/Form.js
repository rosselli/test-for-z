import React, {Component} from 'react';

class Form extends Component {
    render(){
        // console.log(this.props)
        return(
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <input type="text"
                        id='title'
                        name='title'
                        onChange={this.props.handleChange}
                        value={this.props.title}
                        className="form-control"
                        placeholder="Create a new task"
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="date"
                        id='estimated_at'
                        name='estimated_at'
                        onChange={this.props.handleChange}
                        value={this.props.estimated_at}
                        className="form-control"
                        placeholder="Date"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{ this.props.button }</button>
            </form>
        )
    }
}

export default Form;
