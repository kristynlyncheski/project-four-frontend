import axios from 'axios';

const helpers = {
  addUser: function(user){
    return axios.post('http://localhost:3000/users.json', user);
  },

  updateUser: function(user){
    return axios.put('http://localhost:3000/users/' + user.user_id + '.json', user);
  },

  getUserInfo: function(user){
    return axios.get('http://localhost:3000/users/' + user.user_id + '.json', user);
  },

  addSong: function(user){
    return axios.post('http://localhost:3000/songs.json', user);
  },

  addUserSong: function(selectionInfo){
    return axios.post('http://localhost:3000/songs_users.json', selectionInfo);
  },

  updateUserSong: function(data){
    return axios.put('http://localhost:3000/songs_users/added/' + data.user_id + '/' + data.song_id + ".json", data);
  },

  getSavedSongs: function(user){
    return axios.get('http://localhost:3000/songs/saved/' + user.user_id + '.json');
  },

  getHistory: function(user){
    return axios.get('http://localhost:3000/songs_users/history/' + user.user_id + '.json');
  },


}

export default helpers;
