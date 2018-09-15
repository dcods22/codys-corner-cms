import React from "react";
import ReactDataGrid from "react-data-grid";
import PropTypes from "prop-types";
import _ from "lodash";

class DataTable extends React.Component {
  static defaultProps = {
    height: 400,
    data: [],
    columns: [],
    sortFunc: () => {}
  };

  constructor(props) {
    super(props);
    this.rowGetter = this.rowGetter.bind(this);
  }

  rowGetter(index) {
    return this.props.data[index];
  }

  checkForSortedColumn(columns, sortColumn, sortDirection) {
    let newColumns = _.cloneDeep(columns);
    if (!!sortColumn) {
      newColumns.forEach(column => {
        if (column.key.toLowerCase() === sortColumn.toLowerCase() && sortDirection.toUpperCase() !== "NONE") {
          column.cellClass += " sorted-col";
        }
      });
    }
    return newColumns;
  }

  render() {
    const sortFunc = !!this.props.sortFunc ? this.props.sortFunc : () => {};
    const columns = this.checkForSortedColumn(this.props.columns, this.props.sortColumn, this.props.sortDirection);
    return (
      <ReactDataGrid
        columns={columns}
        onGridSort={sortFunc}
        rowGetter={this.rowGetter}
        rowsCount={this.props.data.length}
        minHeight={this.props.height}
        sortColumn={this.props.sortColumn}
        sortDirection={this.props.sortDirection}
      />
    );
  }
}

DataTable.propTypes = {
  sortFunc: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array,
  height: PropTypes.number
};

export default DataTable;
