let Grid = ReactBootstrap.Grid;
let Row = ReactBootstrap.Row;
let Col = ReactBootstrap.Col;
let Input = ReactBootstrap.Input;
let Button = ReactBootstrap.Button;
let Well = ReactBootstrap.Well;
let options = []
let newrows = []

let optionList = [
{
	style:'contains',
	value:'Visited Page Path'
},
{
	style:'contains',
	value:'Visited Page Host'
},
{
	style:'',
	value:''
},
{
	style:'contains',
	value:'User First Name'
},
{
	style:'contains',
	value:'User Last Name'
},
{
	style:'contains',
	value:'User Login'
},
{
	style:'contains',
	value:'User Email'
},
{
	style:'contains',
	value:'User Original Referral Domain'
},
{
	style:'between',
	value:'Screen Height'
},
{
	style:'between-ms',
	value:'Page Response Time'
},
{
	style:'equals',
	value:'Session Landing Path'
}
]

for (let n of optionList){
	if (n.style === ''){
		options.push(<hr />);
	}
	else{
	options.push(<option class='{n.style}' value={n.value}>{n.value}</option>)
	}
}

let containsTemplate = function(value){
let placeholderarray = value.split(' ')
if (value.indexOf('Name') > -1){
	var placeholder = "Enter " + placeholderarray[1].toLowerCase() + ' ' + placeholderarray[2].toLowerCase() + '...'
}
else if (placeholderarray.length > 2){
	var placeholder = "Enter " + placeholderarray[2].toLowerCase() + '...'
}
else{
	var placeholder = "Enter " + placeholderarray[1].toLowerCase() + '...'
}
return (
	<div>
	<Col xs={12} sm={6}>
  	<Col xs={4}>
  		<Input name='comparator' type="select">
  			<option value='LIKE'>contains</option>
  			<option value='NOT LIKE'>does not contain</option>
  		</Input>
  	</Col>
  	<Col xs={8}>
  		<Input name='value1' type='text' placeholder={placeholder}>
  		</Input>
  		<input type='hidden' name='value2' value='' />
  	</Col>
	</Col>
	</div>
)};

let equalsTemplate = (
	<div>
	<Col xs={12} sm={6}>
  	<Col xs={4}>
  		<Input name="comparator" type="select">
  			<option value='='>equals</option>
  			<option value='!='>does not equal</option>
  		</Input>
  	</Col>
  	<Col xs={8}>
  		<Input name='value1' type='text' placeholder="">
  		</Input>
  		<input type='hidden' name='value2' value='' />
  	</Col>
	</Col>
	</div>
)

let betweenTemplate = (
	<div>
	<Col xs={12} sm={6} className='between'>
  	<Col xs={2}>
  		<Well className='text-center'>
  		is
  		</Well>
  	</Col>
  	<Col xs={3}>
  		<Input name="comparator" type="select">
  			<option value='BETWEEN'>in between</option>
  			<option value='NOT BETWEEN'>not in between</option>
  		</Input>
  	</Col>
  	<Col xs={2}>
  		<Input name='value1' type='text' placeholder="">
  		</Input>
  	</Col>
  	<Col xs={2}>
  		<Well className='text-center'>
  		and
  		</Well>
  	</Col>
  	<Col xs={3}>
  		<Input name='value2' type='text' placeholder="">
  		</Input>
  	</Col>
	</Col>
	</div>
)

let betweenTemplateMs = (
	<div>
	<Col xs={12} sm={6} className='between'>
  	<Col xs={2}>
  		<Well className='text-center'>
  		is
  		</Well>
  	</Col>
  	<Col xs={3}>
  		<Input name="comparator" type="select">
  			<option value='IN BETWEEN'>in between</option>
  			<option value='NOT IN BETWEEN'>not in between</option>
  		</Input>
  	</Col>
  	<Col xs={2}>
  		<Input name='value1' type='text' placeholder="">
  		</Input>
  	</Col>
  	<Col xs={2}>
  		<Well className='text-center'>
  		and
  		</Well>
  	</Col>
  	<Col xs={2}>
  		<Input name='value2' type='text' placeholder="">
  		</Input>
  	</Col>
  	<Col xs={1}>
  		<Well className='text-center ms'>
  		ms
  		</Well>
  	</Col>
	</Col>
	</div>
)

let remove = function(){
  newrows.pop()
  let newInstance = gridInstance();
  ReactDOM.render(
  	newInstance,
    document.getElementById('main')
  );
}

let minus = (
	<Col xs={0} onClick={remove} className='minus'>-</Col>
)



let createRow = function(){
  newrows.push(<GridRow />)
  let newInstance = gridInstance();
  ReactDOM.render(
  	newInstance,
    document.getElementById('main')
  );
}

let GridRow = React.createClass({
	getInitialState: function() {
	return {template: 'contains'};
},
handleChange: function(event) {
  	this.setState({template: event.target.value});
},
templateSelect: (input) => {
	for (let n of optionList){
		if (input === n.style || input === n.value){
			if (n.style === 'contains'){
				return containsTemplate(n.value);
			}
			else if (n.style === 'equals'){
				return equalsTemplate;
			}
			else if (n.style === 'between'){
				return betweenTemplate;
			}
			else if (n.style === 'between-ms'){
				return betweenTemplateMs;
			}
		}
	}
	},
	render: function(){
		let template = this.state.template;
		let templated = this.templateSelect(this.state.template);
		return(
		<Row>
		<Col xs={12} sm={6}>
		<Input name='type' className='typebox' type="select" onChange={this.handleChange.bind(this)} addonBefore={minus}>
			{options}
		</Input>
		</Col>

		
		{templated}
	</Row>
	)
	}
	}
)

let gridInstance = function(){ return (
	  
  <div class='container'>
	  <form>
		  <Grid>
	  	  <Row><Col><h2 className='searchdates'>Search Dates: <Button>Today</Button></h2></Col></Row>

	  		<div id='rows'>
	  			<GridRow />
	  			<div id='newrows'>
	  			{newrows}
	  			</div>
	  		<Row>
	  			<Col xs={12}>
	  			<Button className='btn-primary' onClick={createRow}> Add </Button>
	  			<Button className='btn-primary' onClick={search}> Search </Button>
	  			</Col>
	  		</Row>
	  		</div>
		  </Grid>
      </form>
  </div>
)}

let search = function(){
	let formdata = $('form').serialize();
	$.post('http://localhost:3010/search', formdata, function(data){
	$('#queryresponse').html(data);
	$('#queryresponse').removeClass('hidden');
	})
}

ReactDOM.render(
	gridInstance(),
document.getElementById('main')
);