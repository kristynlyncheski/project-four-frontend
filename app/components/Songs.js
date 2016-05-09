import React from 'react';
import {Collection, CollectionItem, Dropdown, Button, NavItem, Icon} from 'react-materialize';
import {DropdownButton, MenuItem} from 'react-bootstrap';
var ScrollArea = require('react-scrollbar');

const DropdownComp = React.createClass({
  render: function(){
    let playlists = this.props.playlists.map((playlist,index) => {
      return(
        <MenuItem key={index} eventKey={[playlist.playlist_id,this.props.songId,playlist.playlist_name]}>{playlist.playlist_name}</MenuItem>
      )
    });
    return(
      <DropdownButton
        pullRight
        noCaret
        title={<Icon>arrow_drop_down</Icon>}
        key={this.props.index}
        id={`dropdown-basic-${this.props.index}`}
        onSelect={this.props.onSelect}
      >
        {playlists}
      </DropdownButton>
    )
  },
});

const Songs = React.createClass({
  render: function(){
    // console.log("saved",this.props.savedSongs);
    let savedSongs = this.props.savedSongs.map((song,index) => {
      return (
        <div className="songs-collection" key={index}>
          <div className="saved-details">
            <h4 className="saved-song-title">{song.song_title}</h4>
            <p className="saved-artist-name">{song.artist_name}</p>
          </div>
          <div className="playlist-dropdown">
            <DropdownComp
              playlists={this.props.playlists}
              songId={song.song_id}
              index={index}
              onSelect={this.props.handlePlaylistAdd}
            />
          </div>
        </div>
      );
    });
    let savedSongsReverse = savedSongs.reverse();

    return(
      <div className="saved-songs-container">
        <ScrollArea style={{ maxHeight: '70vh'}} contentClassName="scrollbar-inside-content">
          {savedSongsReverse}
        </ScrollArea>
      </div>
    )
  }
});

export default Songs;
