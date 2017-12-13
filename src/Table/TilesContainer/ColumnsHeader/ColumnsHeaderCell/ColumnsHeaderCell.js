import React from 'react';
import PropTypes from 'prop-types';

class ColumnsHeaderCell extends React.Component {
    static propTypes = {
        isCurrent: PropTypes.bool,
        direction: PropTypes.string,
        title: PropTypes.string,
        onChange: PropTypes.func
    };

    render() {
        if(!this.props.isCurrent)
            return(
                <div
                    className='header-cell'
                    onClick={this.handleCellClick}
                >
                    {this.props.title}
                </div>
            );
        if(this.props.direction === 'asc')
            return(
                <div
                    className='header-cell header-cell_current'
                    onClick={this.handleCellClick}
                >
                    {this.props.title} ↑
                </div>
            );
        return(
            <div
                className='header-cell header-cell_current'
                onClick={this.handleCellClick}
            >
                {this.props.title} ↓
            </div>
        )
    }

    handleCellClick = () => {
        if(this.props.isCurrent) {
            if(this.props.direction === 'asc')
                this.props.onChange(this.props.title, 'desc');
            else
                this.props.onChange(this.props.title, 'asc');
        }
        else this.props.onChange(this.props.title, 'asc');
    };
}

export { ColumnsHeaderCell };