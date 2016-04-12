/**
 * @jsx React.DOM
 */


var TestComponent = React.createClass({
  render: function() {
    return (
      <div style={{marginLeft: 30}}>
        <h3>10 rows - editable names</h3>
        <TestTable1 />
        <h3>10 rows - search</h3>
        <TestTable2 />
        <h3>100 rows - search and pagination</h3>
        <TestTable3 />
      </div>
    );
  }
});

React.renderComponent(
  <TestComponent />,
  document.getElementById('testdiv')
);
