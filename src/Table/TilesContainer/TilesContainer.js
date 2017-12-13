import React from 'react';
import PropTypes from 'prop-types';
import { Tile } from './Tile/Tile';
import { ColumnsHeader } from './ColumnsHeader/ColumnsHeader';

class TilesContainer extends React.Component {
    static propTypes = {
        tiles: PropTypes.arrayOf(PropTypes.object),
        filter: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            sortColumn: '',
            sortDirection: ''
        }
    }
    render() {
        //composing column headers based on the first object in the data array
        let columns = this.props.tiles && this.props.tiles.length > 0
            ?
            Object.keys(this.props.tiles[0])
            :
            [];
        const filteredArray = TilesContainer._getFilteredArray(
            this.props.tiles,
            columns,
            this.props.filter
        );
        const sortedArray = TilesContainer._getSortedArray(
            filteredArray,
            this.state.sortColumn,
            this.state.sortDirection
        );
        return(
            <div className='tiles-container'>
                <ColumnsHeader
                    columns={columns}
                    sortColumn={this.state.sortColumn}
                    sortDirection={this.state.sortDirection}
                    onSortSelectionChange={this.handleSortChange}
                />
                {TilesContainer._renderTiles(sortedArray)}
            </div>
        );
    }

    componentWillReceiveProps(newProps) {
        if(newProps !== this.props)
            this.setState({
                sortColumn: '',
                sortDirection: ''
            })
    }


    handleSortChange = (_column, _order) => {
        this.setState({
            sortColumn: _column,
            sortDirection: _order
        });
    };

    static _renderTiles(_dataArray) {
        return _dataArray.map((val, ind) =>
            <Tile
                data={val}
                index={ind}
                key={ind}
            />
        )
    }

    static _getSortedArray(_data, _column, _order) {
        if(_column && _order) {
            //determining type of data in column based on first data element
            const columnType = TilesContainer._getColumnType(_data[0][_column]);
            const sortFunc = TilesContainer._getSortFunction(_column, _order, columnType);
            _data.sort(sortFunc);
        }
        return _data;
    }

    static _getFilteredArray(_data, _columns, query) {
        return _data.filter((item) => {
            let instances = 0;
            _columns.forEach(column => {
                if(item[column].toString().includes(query))
                    instances++;
            });
            return !!instances;
        })
    }

    static _getColumnType(example) {
        if(example - 0) {
            return 'number';
        } else {
            let dateSplit = example.split('.');
            if(
                dateSplit.length === 3
                &&
                !isNaN(new Date(dateSplit[2], dateSplit[1], dateSplit[0]))
            )
                return 'date';
        }
        return 'string';
    }

    static _getSortFunction(_column, order, dataType) {
        switch (dataType) {
            case 'number':
                if (order === 'asc')
                    return (a, b) => {
                        let aParsed = isNaN(a[_column]) ? 0 : a[_column];
                        let bParsed = isNaN(b[_column]) ? 0 : b[_column];
                        return aParsed-bParsed;
                    };
                return (a, b) => {
                    let aParsed = isNaN(a[_column]) ? 0 : a[_column];
                    let bParsed = isNaN(b[_column]) ? 0 : b[_column];
                    return bParsed-aParsed;
                };

            case 'date':
                if(order === 'asc')
                    return (a,b) => {
                        let aSplit = a[_column].split('.');
                        let bSplit = b[_column].split('.');
                        let aDate = new Date(aSplit[2],aSplit[1]-1,aSplit[0]);
                        let bDate = new Date(bSplit[2],bSplit[1]-1,bSplit[0]);

                        aDate = aDate ? aDate : 0;
                        bDate = bDate ? bDate : 0;

                        return aDate-bDate;
                    };
                return (a,b) => {
                    let aSplit = a[_column].split('.');
                    let bSplit = b[_column].split('.');
                    let aDate = new Date(aSplit[2],aSplit[1]-1,aSplit[0]);
                    let bDate = new Date(bSplit[2],bSplit[1]-1,bSplit[0]);

                    aDate = aDate ? aDate : 0;
                    bDate = bDate ? bDate : 0;

                    return bDate-aDate;
                };

            default:

            case 'string':
                if (order === 'asc')
                    return (a, b) => {
                        if (a[_column] < b[_column]) return -1;
                        if (a[_column] > b[_column]) return 1;
                        return 0;
                    };
                return (a, b) => {
                    if (a[_column] < b[_column]) return 1;
                    if (a[_column] > b[_column]) return -1;
                    return 0;
                };
        }
    }
}

export { TilesContainer };