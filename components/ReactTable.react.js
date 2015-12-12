/**
 * @jsx React.DOM
 */



/* SearchBar
* -------------
*  Properties:
*  - handler 		: function to pass any entered search term to
*/


var SearchBar = React.createClass({

	render: function() {
		return (
			<div className='search-container' style={this.props.style} >
				<label>Search:</label>
				<input
					onChange	= {this._onSearch}
					type			= 'text' />
			</div>
		);
	},

	_onSearch: function(event) {
		this.props.handler(event.target.value);
	}

});


/* ReactTable
* ---------------
*  Properties:
*  - data 			: table data (json)
*  - columns  	:  function that returns a discription for each data column
*  - searchTerm : if a search bar is added, term to filter on (optional)
* 								will search in all columns.
*  Column options:
*  - property 	: name of the data property (optional)
*  - header 		: table header name (optional)
*  - sortable 	: true (optional)
*  - editable 	: true (optional)
*  - fun 				: function to transform data (optional)
*  - classes 		: string, additional column css-classes (optional)
*/

var ReactTable = React.createClass({

	getInitialState: function() {
		return {
			data: this.props.data,
			columns: this.props.columns(this),
			sortBy: '',
			sortOrder: -1
		};
	},

	getDefaultProps: function() {
		return { search: '' };
	},

	render: function() {
		var data 			= this.state.data,
				sortOrder = this.state.sortOrder,
				sortBy 		= this.state.sortBy,
				columns		= this.state.columns,
				search		= this.props.searchTerm,
				page			= this.props.page,
				per_page	= this.props.per_page;
		var sorter 		= this._onSort,
				editor 		= this._onEdit;

		if (search) {
			data = _.filter(data, function(d) {
				return contains(_.values(d), search.toLowerCase());
			});
		}

		if (sortBy) {
			data.sort(compare(sortBy, sortOrder));
		}

		if (page) {
			data = data.slice((page-1)*per_page, page*per_page);
		}

		return (
				<table className={this.props.className} style={this.props.style}>
					<thead>
					{columns.map(function(c, i) {
						var handler = c.sortable ? sorter : null;
						var cl = c.property === sortBy
							? (sortOrder === 1 ? 'asc' : 'dsc')
							: null;
						return (
							<th id 			= {c.property}
								className = {cl}
								onClick		= {handler}
								key				= {'header-'+ i}
							>{c.header}</th>
						);
					})}
					</thead>
					<tbody>
						{data.map(function(val, i) {
							var id = val.id ? val.id : (val.ID ? val.ID : i);				// use id column if provided
							return (
								<tr id = {i} key	= {'row-'+ i}>
									{columns.map(function(c, j) {
										var value = c.fun
											? (c.property ? c.fun(val[c.property]) : c.fun(val) )
											: val[c.property];
										var value = c.editable
											? (<Editor
													value 	= {value}
													handler = {editor}
													id 			= {id +'_'+c.property} /> )
											: value;
										return (
											<td
												className 	= {c.classes}
												key					= {'col-'+ j}
												id  				= {id +'_'+c.property}
											>{value}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
		);
	},

	_onDeleteRow: function(event) {
		var newData = this.state.data,
				id 			= event.target.parentNode.id.split('_')[0],
				col  		= event.target.id.split('_')[1],
				index 	= getIndex(newData, 'id', parseInt(id, 10));

		var res = window.confirm('Remove entry: ' + (newData[index].name || id) + '?');
		if (!res) return;
		newData.splice(index,1);
		this.setState({ data: newData });
	},

	_onEdit: function(event) {
		var newData = this.state.data,
				id 			= event.target.id.split('_')[0],
				col  		= event.target.id.split('_')[1],
				index 	= getIndex(newData, 'id', parseInt(id, 10));
		newData[index][col] = event.target.value;
		this.setState({ data: newData });
	},

	_onSort: function(event) {
		var newOrder = this.state.sortOrder * -1;
		this.setState({
			sortBy: event.target.id,
			sortOrder: newOrder
		});
	}

});


/* Paginator
* ------------
* Contains items per page selector (input text field) and page selector (button group).
* Properties:
*  - page				: current page shown
*  - per_page		: current nr of items per page
*  - onPage			: parent method to update value: current page shown
*  - onPerPage 	: parent method to update value: items per page
*  - className	: additional div classes (optional)
* State: N/A
*/

var Paginator = React.createClass({

	render: function() {
		var onPage 		= this._onPage;
		var page 			= parseInt(this.props.page, 10),
				nrp 			= Math.ceil(this.props.data.length/this.props.per_page);

		var pages = getPages(page, nrp);

		return (
			<div className={'paginator '+ this.props.className}>
				<div >
					<label forHtml='pp'>Per page:</label>
					<input
						id						= 'pp'
						type					= 'text'
						onChange			= {this._onPerPage}
						defaultValue	= {this.props.per_page} />
				</div>
				<div className = {'btn-group'} >
					{pages.map(function(p, i) {
						var bgCol = page === p ? '#CCC' : '#FFF';
						return(
							<button
								disabled	= {p === '...' ? true : false}
								key				= {i}
								id				= {p}
								onClick		= {onPage}
								className = 'btn btn-default'
								style 		= {{backgroundColor: bgCol}}
							>{p}</button>);
					})}
				</div>
			</div>
		);
	},

	_onPerPage: function(event) {
		var pp = parseInt(event.target.value, 10)
		if ( pp > 9) {																// avoid update if < 10 per page.
			this.props.onPage(1); 											// reset to 1 to avoid current page > nr.of pages
			this.props.onPerPage(event.target.value);
		}
	},

	_onPage: function(event) {
		this.props.onPage(event.target.id);
	}

});


function getPages(page, nrp) {
	var pages = [];
	if (nrp > 6) {
		if (page < 4) {
			var a = new Array(page+1).fill(0).map(function(p, i) { return i+1; });
			pages = a;
			pages.push('...', nrp-1, nrp);
		} else if (page > 3 && page < nrp-2) {
			pages.push(1,'...',page-1, page, page+1,'...', nrp);
		} else {
			pages.push(1,2, '...');
			var a = new Array(nrp-page+2).fill(0).map(function(p, i) { return page+i-1; });
			pages = pages.concat(a);
		}
	} else {
		pages = new Array(nrp).fill(0).map(function(p, i) { return i+1; });
	}
	return pages;
}


/* Editor
* --------------
* Show/hide edit text field in cell.
* Saves edited value on blur or enter key press.
*  Properties:
*  - value 			: value to display in table cell
*  - id					: component id (from parent), pass on to parent to save edited values
*  - handler  	: parent function to handle save events
* State:
*  - edit				: boolean, is component in edit mode? show/hide edit text field
*  - edit_value : string, current value in edit text field
*/

var Editor = React.createClass({

	getInitialState() {
		return {
			edit: false,
			edit_value: this.props.value
		};
	},

	componentWillReceiveProps(newProps) {
		if (newProps.value != this.props.value) {						// e.g. changed sort order.
			this.setState({ edit_value: newProps.value });
		}
	},

	render: function() {
		var type 				= this.state.edit ? 'text' : 'hidden';

		return (
			<div className='editor'>
				{this.state.edit ? null :
					<span
						onClick			=	{this._onEdit}
						>{this.props.value}</span>}
				<input
					type 				= {type}
					value				= {this.state.edit_value}
					onChange 		= {this._onInput}
					onBlur			= {this._onSave}
					onKeyDown		= {this._onKeyDown}
					id  				= {this.props.id}
					autoFocus />
			</div>
		);
	},

	_onKeyDown: function(event) {
		if (event.keyCode === 13) {
			this._onSave(event);
		}
		event.stopPropagation();
	},

	_onSave: function(event) {
		this.setState({ edit: false });
		this.props.handler(event);
	},

	_onInput: function(event) {
		this.setState({ edit_value: event.target.value });
	},

	_onEdit: function(event) {
		this.setState({ edit: true });
	}

});



/*-------------- Help functions ------------------------ */

/* for sorting. compare in asc./desc. order */
function compare(col, order) {
	return function(a, b) {
		if (a[col].toLowerCase() < b[col].toLowerCase()) return -1 * order;
		if (a[col].toLowerCase() > b[col].toLowerCase()) return  1 * order;
		return 0;
	}
}

/* look for substring in strings in data row (objects searched recursively)*/
function contains(array, substr) {
	for (a in array) {
		if (typeof array[a] === 'string') {
			if (array[a].toLowerCase().indexOf(substr) > -1) return true;
		} else if (typeof array[a] === 'object') {
			if (contains(array[a], substr)) return true;
		}
	}
	return false;
}

/* get data row index by specified column value */
function getIndex(data, col, val) {
	// return data.indexOf(_.matches(data, {id: id}));
	var index = -1;
	data.forEach(function(d, i) {
		if (d[col] === val) {
			index = i;
			return true;
		}
	});
	return index;
}
