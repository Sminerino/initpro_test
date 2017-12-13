import React from 'react';
import PropTypes from 'prop-types';
import { ColumnsHeaderCell } from './ColumnsHeaderCell/ColumnsHeaderCell';

class ColumnsHeader extends React.Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.string),
        sortColumn: PropTypes.string,
        sortDirection: PropTypes.string,
        onSortSelectionChange: PropTypes.func
    };

    render() {
        return(
            <div className="tiles-container__columns-header">
                {this.props.columns.map(
                    (val,ind) =>
                        <ColumnsHeaderCell
                            isCurrent={this.props.sortColumn === val}
                            direction={this.props.sortDirection}
                            title={val}
                            onChange={this.props.onSortSelectionChange}
                            key={ind}
                        />
                )}
            </div>
        );
    }
}

export { ColumnsHeader };