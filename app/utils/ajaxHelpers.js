import axios from 'axios';

const helpers = {
  addUser: function(user){
    return axios.post('https://agile-tundra-88608.herokuapp.com/users.json', user);
  },

  updateUser: function(user){
    return axios.put('https://agile-tundra-88608.herokuapp.com/users/' + user.user_id + '.json', user);
  },

  getUserInfo: function(user){
    return axios.get('https://agile-tundra-88608.herokuapp.com/users/' + user.user_id + '.json', user);
  },

  addSong: function(user){
    return axios.post('https://agile-tundra-88608.herokuapp.com/songs.json', user);
  },

  addUserSong: function(selectionInfo){
    return axios.post('https://agile-tundra-88608.herokuapp.com/songs_users.json', selectionInfo);
  },

  updateUserSong: function(data){
    return axios.put('https://agile-tundra-88608.herokuapp.com/songs_users/added/' + data.user_id + '/' + data.song_id + ".json", data);
  },

  getSavedSongs: function(user){
    return axios.get('https://agile-tundra-88608.herokuapp.com/songs/saved/' + user.user_id + '.json');
  },

  getHistory: function(user){
    return axios.get('https://agile-tundra-88608.herokuapp.com/songs_users/history/' + user.user_id + '.json');
  },


}

export default helpers;
