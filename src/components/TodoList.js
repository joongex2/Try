import React, { Component } from 'react'
import axios from 'axios'
import Bin from "../bin.png"

export default class TodoList extends Component {
    state = {
        todo: [],
        inputField: ""
    }

    componentDidMount() {
        this.fetchTodoList();
    }

    fetchTodoList = async () => {
        const httpResponse = await axios.get("https://pure-hamlet-62268.herokuapp.com/todo-list");
        this.setState({ todo: httpResponse.data });
    }

    add = async () => {
        await axios.post("https://pure-hamlet-62268.herokuapp.com/todo-list", { task: this.state.inputField });
        this.fetchTodoList();
    }

    changeTask = async (id) => {
        const inputTask = prompt("Enter your new task:");
        if (!inputTask) return;
        await axios.put(`https://pure-hamlet-62268.herokuapp.com/todo-list/${id}`, { task: inputTask });
        this.fetchTodoList();
    }

    removeTask = async (id) => {
        await axios.delete(`https://pure-hamlet-62268.herokuapp.com/todo-list/${id}`);
        this.fetchTodoList();
    } 

    render() {
        return (
            <div style={{ width: "400px", height: "400px", margin: "0 auto", backgroundColor: "whitesmoke" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <h3 style={{ backgroundColor: "grey" }}>TodoList</h3>
                        <ul>
                            {this.state.todo.map((value) =>
                                <li style={{ color: 'black' }}>
                                    <span onClick={() => this.changeTask(value.id)}>{value.task}</span>
                                    <img onClick={()=> this.removeTask(value.id)} src={Bin} style={{width:"15px", left: "5px", position: "relative"}}></img>
                                </li>)}
                        </ul>
                    </div>
                    <div>
                        <input onChange={(e) => this.setState({ inputField: e.target.value })}
                            value={this.state.inputField}></input>
                        <button onClick={() => this.add()}>add</button>
                    </div>
                </div>
            </div>
        )
    }
}
