/**
 * @jsx React.DOM
 */

/* 1. Table
*  requires:
*   - data
*  	- columns: function that returns an array of objects discribing each column.
* 		Can specify:
* 		- property 	: (string) name in data entry to use.
* 		- header		: (string) column header name
* 		- sortable 	: (boolean) can user sort on column?
* 		- editable 	: (boolean) should the content be editable?
* 		- classes 	: (string) custom CSS classes for the column
* 		- fun 			: (function) any function. can e.g. be a function to format the
* 									values or a call to the ReactTable's _onDeleteRow function.
* 									The argument passed to the column-function can be used to
* 									access ReactTable methods.
*
* NOTE: data need to contian unique id's if the content should be editable.
*/

var TestTable1 = React.createClass({
	render: function() {
		return (
			<ReactTable
				columns			= {getColumns}
				data				= {_testdata.slice(0,10)} />
		);
	}
});


function getColumns(that) {
	return ([
		{
			property: 'Name',
			header: 'Name',
			classes: 'name-column',
			sortable: true,
			editable: true
		},{
			property: 'Surname',
			header: 'Surname',
			sortable: true,
			editable: true
		},{
			property: 'Date',
			header: 'Date',
			sortable: true
		},{
			property: 'Account',
			header:	'Account',
			sortable: true,
			fun: function(val) {
				// Some formatting
				return [val.slice(0,2), val.slice(2,10), val.slice(10), val.slice(val.length-4)].join('-');
			}
		},{
			fun: function(val) {
				// E.g. useless function
				var handler = function() { alert('row id: '+ val.id) };
				return <a onClick={handler} style={{cursor: 'pointer'}}>ID</a>;
			}
		},{
			fun: function(val) {
				// call to ReactTable's delete row function
				var handler = that._onDeleteRow;
				return <span onClick={handler} style={{cursor: 'pointer', fontSize: 16}}>{'\u232B'}</span>;
			}
		}
	]);
}

/* 2: Table with search bar
*  SearchBar reguire a handler that updates the state
*  ReactTable requires a handler that updates the state
*/

var TestTable2 = React.createClass({

	getInitialState: function() {
		return {
			search: ''
	  };
	},

	render: function() {
		return (
			<div>
				<SearchBar handler = {this._onSearch} style={{margin: '30px 0'}} />
				<ReactTable
					columns			= {getColumns}
					data				= {_testdata.slice(0,10)}
					searchTerm	= {this.state.search} />
			</div>
		);
	},

	_onSearch: function(value) {
		this.setState({ search: value });
	}

});


/* 3. Table with search bar and paginator
* Paginator requires properties:
* 	- page			:	(int) current page selected
* 	- onPage		: (function) handler for updating page
* 	- per_page	: (int) number of rows shown on each page
* 	- onPerPage	: (function) handler for updating per_page
* 	- data			: table data
* ReactTable requires additional properties:
* 	- page
* 	- per_page
*/

var TestTable3 = React.createClass({

	getInitialState: function() {
		return {
			search: '',
			per_page: 10,
			page: 1
	 };
	},

	render: function() {
		return (
			<div>
				<div style={{maxWidth: 700,  margin: '30px 0px'}} >
					<SearchBar handler = {this._onSearch} />
					<Paginator
						data 				= {_testdata}
						per_page		= {this.state.per_page}
						page 				= {this.state.page}
						onPage			= {this._onPage}
						onPerPage		= {this._onPerPage} />
				</div>
				<ReactTable
					columns			= {getColumns}
					data				= {_testdata}
					searchTerm	= {this.state.search}
					per_page		= {this.state.per_page}
					page				= {this.state.page} />
			</div>
		);
	},

	_onSearch: function(value) {
		this.setState({ search: value });
	},

	_onPage: function(value) {
		this.setState({ page: value });
	},

	_onPerPage: function(value) {
		this.setState({ per_page: value });
	}

});


var _testdata = [
	{
		"Name": "Orla",
		"Surname": "Head",
		"Date": "10-09-2015",
		"Account": "DO26994128881699383789826958",
		"id": 1
	},
	{
		"Name": "Hilary",
		"Surname": "Foster",
		"Date": "21-06-2016",
		"Account": "NO9847954049296",
		"id": 2
	},
	{
		"Name": "Cole",
		"Surname": "Hines",
		"Date": "27-12-2015",
		"Account": "ME88388025177211475073",
		"id": 3
	},
	{
		"Name": "Igor",
		"Surname": "Soto",
		"Date": "08-06-2015",
		"Account": "MT26DYHX15214031759322754118736",
		"id": 4
	},
	{
		"Name": "Jameson",
		"Surname": "Avery",
		"Date": "07-10-2015",
		"Account": "AE667107054472910215903",
		"id": 5
	},
	{
		"Name": "Drew",
		"Surname": "Maxwell",
		"Date": "10-10-2016",
		"Account": "MT20LIDP28234748201691399835409",
		"id": 6
	},
	{
		"Name": "Price",
		"Surname": "Webb",
		"Date": "31-05-2016",
		"Account": "BA933208561540916595",
		"id": 7
	},
	{
		"Name": "Alice",
		"Surname": "Austin",
		"Date": "20-01-2016",
		"Account": "DK6428545118064229",
		"id": 8
	},
	{
		"Name": "Erin",
		"Surname": "Cabrera",
		"Date": "25-03-2015",
		"Account": "MD3986014461949667628525",
		"id": 9
	},
	{
		"Name": "Myles",
		"Surname": "Ellis",
		"Date": "02-10-2015",
		"Account": "FI3226575257378561",
		"id": 10
	},
	{
		"Name": "Keely",
		"Surname": "Herrera",
		"Date": "09-11-2015",
		"Account": "BA569845902297427894",
		"id": 11
	},
	{
		"Name": "Desirae",
		"Surname": "Patel",
		"Date": "23-10-2015",
		"Account": "BG13FQOJ79192408906178",
		"id": 12
	},
	{
		"Name": "Elvis",
		"Surname": "Figueroa",
		"Date": "07-11-2014",
		"Account": "IS873465213608406555262788",
		"id": 13
	},
	{
		"Name": "Nola",
		"Surname": "Kirk",
		"Date": "04-02-2016",
		"Account": "IE05IYDT36334772673858",
		"id": 14
	},
	{
		"Name": "Julian",
		"Surname": "Flynn",
		"Date": "28-07-2016",
		"Account": "TR037437105275648346091822",
		"id": 15
	},
	{
		"Name": "Astra",
		"Surname": "Velazquez",
		"Date": "27-04-2015",
		"Account": "SK0596138837256548605721",
		"id": 16
	},
	{
		"Name": "Brendan",
		"Surname": "Burnett",
		"Date": "09-01-2016",
		"Account": "KZ059822956687664563",
		"id": 17
	},
	{
		"Name": "Scarlett",
		"Surname": "Rich",
		"Date": "10-10-2015",
		"Account": "LB22183499426555733666519224",
		"id": 18
	},
	{
		"Name": "Jack",
		"Surname": "Talley",
		"Date": "31-12-2015",
		"Account": "CY70682278128217141929828315",
		"id": 19
	},
	{
		"Name": "Lee",
		"Surname": "Sanchez",
		"Date": "15-06-2016",
		"Account": "GE29140495253660884232",
		"id": 20
	},
	{
		"Name": "Matthew",
		"Surname": "Madden",
		"Date": "16-10-2015",
		"Account": "BA714863421911748377",
		"id": 21
	},
	{
		"Name": "Carlos",
		"Surname": "Downs",
		"Date": "11-08-2016",
		"Account": "DO14046287440989270801415789",
		"id": 22
	},
	{
		"Name": "Paul",
		"Surname": "Bowen",
		"Date": "04-02-2015",
		"Account": "SI35104115275386782",
		"id": 23
	},
	{
		"Name": "Jorden",
		"Surname": "Ellison",
		"Date": "12-05-2015",
		"Account": "LB80719093574270126400007742",
		"id": 24
	},
	{
		"Name": "Nolan",
		"Surname": "Barrera",
		"Date": "26-09-2015",
		"Account": "LV63ALOW6313890206180",
		"id": 25
	},
	{
		"Name": "Naomi",
		"Surname": "Spears",
		"Date": "10-10-2016",
		"Account": "AT767413507854164966",
		"id": 26
	},
	{
		"Name": "Zenaida",
		"Surname": "Fox",
		"Date": "30-01-2016",
		"Account": "AE698078335627103373667",
		"id": 27
	},
	{
		"Name": "Brynne",
		"Surname": "Barnes",
		"Date": "25-05-2016",
		"Account": "LT985542136069060839",
		"id": 28
	},
	{
		"Name": "Ronan",
		"Surname": "Duran",
		"Date": "04-09-2016",
		"Account": "DO79728222096485666811477558",
		"id": 29
	},
	{
		"Name": "Curran",
		"Surname": "Ware",
		"Date": "18-11-2014",
		"Account": "KZ254739931273378160",
		"id": 30
	},
	{
		"Name": "Carissa",
		"Surname": "Kaufman",
		"Date": "08-03-2016",
		"Account": "MC3406441165418939645210489",
		"id": 31
	},
	{
		"Name": "Uta",
		"Surname": "Aguirre",
		"Date": "07-03-2015",
		"Account": "SA5913276009550341839108",
		"id": 32
	},
	{
		"Name": "Anne",
		"Surname": "Landry",
		"Date": "24-04-2016",
		"Account": "AT859191093978699769",
		"id": 33
	},
	{
		"Name": "Vance",
		"Surname": "Bailey",
		"Date": "27-11-2015",
		"Account": "BE71290484202291",
		"id": 34
	},
	{
		"Name": "Duncan",
		"Surname": "Barr",
		"Date": "03-03-2015",
		"Account": "PL42061290893342508026309132",
		"id": 35
	},
	{
		"Name": "Alexandra",
		"Surname": "Ferrell",
		"Date": "25-09-2016",
		"Account": "MR2996955353529863388822500",
		"id": 36
	},
	{
		"Name": "Chandler",
		"Surname": "Mcmillan",
		"Date": "07-06-2015",
		"Account": "BA803649696621655784",
		"id": 37
	},
	{
		"Name": "Dacey",
		"Surname": "Rush",
		"Date": "27-03-2016",
		"Account": "KZ543655026881042381",
		"id": 38
	},
	{
		"Name": "Charde",
		"Surname": "Branch",
		"Date": "15-10-2015",
		"Account": "PL53645678808193182678993072",
		"id": 39
	},
	{
		"Name": "Stella",
		"Surname": "Berger",
		"Date": "03-11-2014",
		"Account": "GB23WKAX55017739668738",
		"id": 40
	},
	{
		"Name": "Nolan",
		"Surname": "Snyder",
		"Date": "23-05-2015",
		"Account": "PK8957629015887758419433",
		"id": 41
	},
	{
		"Name": "Ray",
		"Surname": "Vazquez",
		"Date": "03-01-2016",
		"Account": "IT153HSFSI98095207533038393",
		"id": 42
	},
	{
		"Name": "Karly",
		"Surname": "Orr",
		"Date": "29-09-2015",
		"Account": "IL891821949781638419293",
		"id": 43
	},
	{
		"Name": "Whitney",
		"Surname": "Byers",
		"Date": "21-09-2016",
		"Account": "KW7956310790715273976549836609",
		"id": 44
	},
	{
		"Name": "Gage",
		"Surname": "Curry",
		"Date": "06-12-2015",
		"Account": "GE10334079500791767533",
		"id": 45
	},
	{
		"Name": "Farrah",
		"Surname": "Berry",
		"Date": "13-11-2014",
		"Account": "IS520533231594879922325508",
		"id": 46
	},
	{
		"Name": "Selma",
		"Surname": "Branch",
		"Date": "05-08-2016",
		"Account": "SM2977246142182054413269080",
		"id": 47
	},
	{
		"Name": "Fuller",
		"Surname": "Snider",
		"Date": "02-05-2015",
		"Account": "LI4185144974952256898",
		"id": 48
	},
	{
		"Name": "Kane",
		"Surname": "Burke",
		"Date": "26-03-2016",
		"Account": "PS877319718260659199337397013",
		"id": 49
	},
	{
		"Name": "Adria",
		"Surname": "Blankenship",
		"Date": "19-11-2014",
		"Account": "SA6524148415349002249417",
		"id": 50
	},
	{
		"Name": "Adrian",
		"Surname": "Barr",
		"Date": "13-01-2016",
		"Account": "KW5659158491845175374578967593",
		"id": 51
	},
	{
		"Name": "Tanisha",
		"Surname": "Donovan",
		"Date": "21-10-2015",
		"Account": "RS61711602524004582412",
		"id": 52
	},
	{
		"Name": "Arthur",
		"Surname": "Daugherty",
		"Date": "11-08-2016",
		"Account": "FO4383458705110991",
		"id": 53
	},
	{
		"Name": "Dana",
		"Surname": "Cameron",
		"Date": "10-11-2014",
		"Account": "HR7965142590663944528",
		"id": 54
	},
	{
		"Name": "Jasper",
		"Surname": "Moon",
		"Date": "08-10-2016",
		"Account": "SI20895461211779010",
		"id": 55
	},
	{
		"Name": "Mason",
		"Surname": "Chaney",
		"Date": "27-09-2015",
		"Account": "TN1082991463504021109799",
		"id": 56
	},
	{
		"Name": "Dara",
		"Surname": "Barrett",
		"Date": "02-11-2014",
		"Account": "SA9520537222345274694338",
		"id": 57
	},
	{
		"Name": "Zane",
		"Surname": "Harmon",
		"Date": "03-10-2015",
		"Account": "PT73625311219483551384940",
		"id": 58
	},
	{
		"Name": "Zoe",
		"Surname": "Dixon",
		"Date": "23-08-2015",
		"Account": "GE49116408970167267620",
		"id": 59
	},
	{
		"Name": "Lunea",
		"Surname": "Dorsey",
		"Date": "18-01-2016",
		"Account": "MU8538494634399152010321476642",
		"id": 60
	},
	{
		"Name": "Oren",
		"Surname": "Hayes",
		"Date": "17-01-2016",
		"Account": "HU47450812255942940222452660",
		"id": 61
	},
	{
		"Name": "Holly",
		"Surname": "Contreras",
		"Date": "28-06-2015",
		"Account": "MD7450150255926609483300",
		"id": 62
	},
	{
		"Name": "Megan",
		"Surname": "Hurst",
		"Date": "06-09-2015",
		"Account": "EE565782222183085889",
		"id": 63
	},
	{
		"Name": "Quail",
		"Surname": "Fisher",
		"Date": "18-10-2015",
		"Account": "MT92VQEP52892833065258743551471",
		"id": 64
	},
	{
		"Name": "Kevin",
		"Surname": "Stephens",
		"Date": "14-04-2016",
		"Account": "EE451476558270992998",
		"id": 65
	},
	{
		"Name": "Stone",
		"Surname": "Taylor",
		"Date": "25-07-2015",
		"Account": "LV59KVIS2137728437653",
		"id": 66
	},
	{
		"Name": "Wanda",
		"Surname": "Alston",
		"Date": "26-06-2015",
		"Account": "BA951043523526599194",
		"id": 67
	},
	{
		"Name": "Nero",
		"Surname": "Barnes",
		"Date": "03-12-2015",
		"Account": "SE5752723628358921721231",
		"id": 68
	},
	{
		"Name": "Dana",
		"Surname": "Duffy",
		"Date": "30-04-2016",
		"Account": "KZ272432279531844587",
		"id": 69
	},
	{
		"Name": "Phoebe",
		"Surname": "Williams",
		"Date": "24-02-2016",
		"Account": "GE72751433414671731557",
		"id": 70
	},
	{
		"Name": "Delilah",
		"Surname": "Kent",
		"Date": "18-12-2014",
		"Account": "SE8699647927842496640360",
		"id": 71
	},
	{
		"Name": "Igor",
		"Surname": "Brock",
		"Date": "26-09-2015",
		"Account": "MK31131709616738466",
		"id": 72
	},
	{
		"Name": "Kimberley",
		"Surname": "Chase",
		"Date": "07-07-2016",
		"Account": "GI13RBLW726941456103193",
		"id": 73
	},
	{
		"Name": "Driscoll",
		"Surname": "Guzman",
		"Date": "23-05-2016",
		"Account": "FO4273391065649629",
		"id": 74
	},
	{
		"Name": "Scarlett",
		"Surname": "Herman",
		"Date": "02-04-2015",
		"Account": "NL80NIKB9625947468",
		"id": 75
	},
	{
		"Name": "Madeson",
		"Surname": "Leon",
		"Date": "21-12-2014",
		"Account": "GE78272096549044264795",
		"id": 76
	},
	{
		"Name": "Kenyon",
		"Surname": "Arnold",
		"Date": "07-10-2016",
		"Account": "FR7893476511984334860330892",
		"id": 77
	},
	{
		"Name": "Elliott",
		"Surname": "Pate",
		"Date": "15-07-2015",
		"Account": "BE27000015350154",
		"id": 78
	},
	{
		"Name": "Regina",
		"Surname": "Blackwell",
		"Date": "03-04-2015",
		"Account": "GE96870717348985483012",
		"id": 79
	},
	{
		"Name": "Kenyon",
		"Surname": "Franco",
		"Date": "20-09-2015",
		"Account": "LT931527478902351526",
		"id": 80
	},
	{
		"Name": "Aaron",
		"Surname": "Rocha",
		"Date": "20-10-2016",
		"Account": "MR9849646527100765330070685",
		"id": 81
	},
	{
		"Name": "Imogene",
		"Surname": "Callahan",
		"Date": "10-02-2016",
		"Account": "LI4711683559384214504",
		"id": 82
	},
	{
		"Name": "Yuri",
		"Surname": "Mcknight",
		"Date": "19-06-2015",
		"Account": "TN3095021525640677304006",
		"id": 83
	},
	{
		"Name": "Jameson",
		"Surname": "Ayala",
		"Date": "20-03-2015",
		"Account": "BG43GJNU14769583074721",
		"id": 84
	},
	{
		"Name": "Libby",
		"Surname": "Watkins",
		"Date": "24-02-2016",
		"Account": "LB39391478756786326078119188",
		"id": 85
	},
	{
		"Name": "Quentin",
		"Surname": "Faulkner",
		"Date": "15-08-2015",
		"Account": "CZ5655282994995308956819",
		"id": 86
	},
	{
		"Name": "Ivor",
		"Surname": "Dixon",
		"Date": "17-03-2015",
		"Account": "RO59NOAE3288080872941876",
		"id": 87
	},
	{
		"Name": "Kay",
		"Surname": "Wilkerson",
		"Date": "09-03-2015",
		"Account": "PK6132367749098985002013",
		"id": 88
	},
	{
		"Name": "Zena",
		"Surname": "Graham",
		"Date": "22-06-2015",
		"Account": "SK2349375662696922700268",
		"id": 89
	},
	{
		"Name": "Noel",
		"Surname": "Zimmerman",
		"Date": "12-02-2016",
		"Account": "GR6245021234307011060428511",
		"id": 90
	},
	{
		"Name": "Signe",
		"Surname": "Alford",
		"Date": "08-11-2014",
		"Account": "FI0631763122897989",
		"id": 91
	},
	{
		"Name": "Carlos",
		"Surname": "Poole",
		"Date": "25-07-2016",
		"Account": "TN7277300350686786301487",
		"id": 92
	},
	{
		"Name": "Jared",
		"Surname": "Velazquez",
		"Date": "11-12-2015",
		"Account": "IS937154351872011681714363",
		"id": 93
	},
	{
		"Name": "Macey",
		"Surname": "Garza",
		"Date": "17-11-2015",
		"Account": "IL986884776003629701650",
		"id": 94
	},
	{
		"Name": "Iliana",
		"Surname": "Tucker",
		"Date": "25-12-2015",
		"Account": "LT778616373873198045",
		"id": 95
	},
	{
		"Name": "Bernard",
		"Surname": "Preston",
		"Date": "21-06-2015",
		"Account": "LT539828134389136858",
		"id": 96
	},
	{
		"Name": "Branden",
		"Surname": "Conner",
		"Date": "21-02-2016",
		"Account": "IS206183287083743153940882",
		"id": 97
	},
	{
		"Name": "Blaine",
		"Surname": "Dean",
		"Date": "06-02-2016",
		"Account": "ME49535101994118540779",
		"id": 98
	},
	{
		"Name": "Ignatius",
		"Surname": "Hendricks",
		"Date": "08-02-2016",
		"Account": "ME40684074103581417288",
		"id": 99
	},
	{
		"Name": "Jorden",
		"Surname": "Potter",
		"Date": "16-11-2014",
		"Account": "AD4778725001767045970556",
		"id": 100
	}
];
