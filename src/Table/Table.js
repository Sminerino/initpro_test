import React from 'react';
import { ControlsHeader } from './ControlsHeader/ControlsHeader';
import { TilesContainer } from './TilesContainer/TilesContainer';
import { apiStore } from './../apiStore/apiStore';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTabIndex: NaN,
            currentFilter: '',
            currentTableItems: [],
            dataLoading: true,
        }
    }

    componentDidMount() {
        this.changeTabIndex(0);
    }

    changeTabIndex = (index) => {
        apiStore.getDataByIndex(index)
        .then((response) =>
            this.setState({
                currentTabIndex: index,
                currentTableItems: response,
                dataLoading: false,
            })
        );
    };

    changeSearchQuery = (_query) => {
        this.setState({
            currentFilter: _query
        });
    };

    render() {
        if(this.state.dataLoading)
            return(
                <div className="table-container">
                    <ControlsHeader
                        buttons={['Table1', 'Table2']}
                        selectedButtonIndex={this.state.currentTabIndex}
                        onButtonClick={this.changeTabIndex}
                        onSearchQueryChange={this.changeSearchQuery}
                    />
                    <div className='table-container__loading'>
                        Loading...
                    </div>
                </div>
            );
        return(
            <div className="table-container">
                <ControlsHeader
                    buttons={['Table1', 'Table2']}
                    selectedButtonIndex={this.state.currentTabIndex}
                    onButtonClick={this.changeTabIndex}
                    onSearchQueryChange={this.changeSearchQuery}
                />
                <TilesContainer
                    tiles={this.state.currentTableItems}
                    filter={this.state.currentFilter}
                />
            </div>
        );
    }
}

export { Table };