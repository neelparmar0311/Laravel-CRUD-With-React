import React, { Component } from 'react';
import { getList, addItem, deleteItem, updateItem } from './ListFunctions';

class List extends Component {
	constructor() {
		super()
		this.state = {
			id: '',
			title: '',
			editDisabled: false,
			items: []
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount() {
		this.getAll()
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	getAll = () => {
		getList().then(data => {
			this.setState({
				title: '',
				items: [...data]
			},
			() => {
				console.log(this.state.items)
			})
		})
	}

	onSubmit = e => {
		e.preventDefault()
		addItem(this.state.title).then(() => {
			this.getAll()
		})
		this.setState({
			title: ''
		})
	}

	onUpdate = e => {
		e.preventDefault()
		updateItem(this.state.title, this.state.id).then(() => {
			this.getAll()
		})
		this.setState({
			title: '',
			editDisabled: ''
		})
		this.getAll()
	}

	onEdit = (itemId, e) => {
		e.preventDefault()
		var data = [...this.state.items]
		data.forEach((item, index) => {
		
			if(item.id === itemId) {
				this.setState({
					id: item.id,
					title: item.title,
					editDisabled: true,
				})
			}
		})
	}

	onDelete = (val, e) => {
		e.preventDefault()
		deleteItem(val)
		this.getAll()
	}

	render() {
		return (
			<div className="col-md-12">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="title"> Title </label>
						<div className="row">
							<input type="text" className="form-control" id="title" name="title" value={this.state.title || ''} onChange={this.onChange.bind(this)} />
                    	</div>
					</div>

					{!this.state.editDisabled ? (
						<button type="submit"
						className="btn btn-success btn-block"
						onClick={this.onSubmit.bind(this)}>
							Submit
						</button>
					) : (
						''
					)}

					{this.state.editDisabled ? (
						<button type="submit"
						className="btn btn-success btn-block"
						onClick={this.onUpdate.bind(this)}>
							Update
						</button>
					) : (
						''
					)}
				</form>
				<table className="table">
		            <tbody>
		                {this.state.items.map((item, index) => (
		                    <tr key={index}>
		                        <td className="text-left">{item.title}</td>
		                        <td className="text-right">
		                            <button href="" className="btn btn-info mr-1" disabled={this.state.editDisabled} onClick={this.onEdit.bind(
		                            	this,
		                            	item.id
		                            )}>
		                            Edit
		                            </button>

		                            <button href="" className="btn btn-danger" disabled={this.state.editDisabled} onClick={this.onDelete.bind(
		                            	this,
		                            	item.id
		                            )}>
		                            Delete
		                            </button>
		                        </td>
		                    </tr>
		                ))}
		            </tbody>
		        </table>
            </div>
		);
	}
}

export default List;