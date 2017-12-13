import React from 'react';
import PropTypes from 'prop-types';

class Tile extends React.PureComponent {
    static propTypes = {
        data: PropTypes.object,
        index: PropTypes.number
    };

    render() {

        return (
            <div className='tile'>
                {Object.keys(this.props.data).map(
                    (column, ind) =>
                        <div className='tile__cell' key={ind}>
                            {this.props.data[column]}
                        </div>
                )}
            </div>
        );
    }
}

export { Tile }