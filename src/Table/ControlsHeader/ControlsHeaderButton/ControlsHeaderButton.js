import React from 'react';
import PropTypes from 'prop-types';

class ControlsHeaderButton extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        index: PropTypes.number,
        selected: PropTypes.bool,
        onButtonClick: PropTypes.func
    };
    render() {
        if(this.props.selected)
            return (
                <div
                    className=
                        'controls-header__button controls-header__button_selected '
                >
                    {this.props.title}
                </div>
            );
        else
            return (
                <div
                    className='controls-header__button'
                    onClick={this._handleButtonClick}
                >
                    {this.props.title}
                </div>
            );
    }

    _handleButtonClick = () => {
        this.props.onButtonClick(this.props.index);
    };
}


export { ControlsHeaderButton };