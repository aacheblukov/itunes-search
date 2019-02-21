import React, { Component } from 'react';
import Select from 'react-select';
class SelectAlbum extends Component {
    state = {
        selectedOption: ''
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
        this.props.setAlbum(selectedOption.value)
    }
    render() {
        return (
            <div style={{ minWidth: 400 }}>
                <Select
                    value={this.state.selectedOption}
                    options={this.props.options}
                    onChange={this.handleChange}
                />
            </div>

        );
    }
}

export default SelectAlbum;