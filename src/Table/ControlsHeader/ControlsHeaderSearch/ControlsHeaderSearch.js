import React from 'react';
import PropTypes from 'prop-types';

class ControlsHeaderSearch extends React.Component {
    static propTypes = {
        onSearchQueryChange: PropTypes.func,
    };
    render() {
        return(
            <input
                className='controls-header__search'
                type='text'
                placeholder='Search'
                onChange={this._handleInputChange}
            />
        );
    }

    _handleInputChange = (event) => {
        this.props.onSearchQueryChange(event.target.value)
    };
}


export { ControlsHeaderSearch };