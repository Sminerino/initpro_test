import React from 'react';
import PropTypes from 'prop-types';
import { ControlsHeaderButton } from './ControlsHeaderButton/ControlsHeaderButton';
import { ControlsHeaderSearch } from './ControlsHeaderSearch/ControlsHeaderSearch';

class ControlsHeader extends React.Component {
    static propTypes = {
        buttons: PropTypes.arrayOf(PropTypes.string),
        selectedButtonIndex: PropTypes.number,
        onButtonClick: PropTypes.func,
        onSearchQueryChange: PropTypes.func
    };

    render() {
        return(
            <div className='controls-header'>
                {this._renderButtonsContainer(this.props.buttons)}
                <ControlsHeaderSearch
                    onSearchQueryChange={this.props.onSearchQueryChange}
                />
            </div>
        );
    }

    _renderButtonsContainer(_buttons) {
        return(
            <div className='controls-header__buttons-container'>
                {_buttons.map((_title, _index) =>
                    <ControlsHeaderButton
                        key={_index}
                        title={_title}
                        index={_index}
                        selected={this.props.selectedButtonIndex === _index}
                        onButtonClick={this.props.onButtonClick}
                    />
                )}
            </div>
        );
    }

}

export { ControlsHeader };