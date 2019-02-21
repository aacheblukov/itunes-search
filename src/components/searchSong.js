import React, { Component } from 'react';

class SearchSong extends Component {
    state = { song: '' }
    render() {
        return (
            <div >
                <input
                    style={{ marginRight: 10 }}
                    placeholder="Find song..."
                    ref={input => this.song = input}
                    onChange={async () => {
                        await this.setState({ song: this.song.value });
                        this.props.setSong(this.state.song)
                    }}
                />
                <button
                    onClick={() => this.props.setSong(this.state.song)}>Find!</button>
            </div>);
    }
}

export default SearchSong;