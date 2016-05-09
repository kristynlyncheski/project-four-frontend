const UserPrefs = {
  ajaxFxns: function(){
    let artistString;
    let trackString;

    //artists ajax call

    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?limit=3",
      headers: {
       'Authorization': 'Bearer ' + localStorage.accessToken
       },
    }).done(function(response){
      // console.log("response",response);
      console.log("artist response 1",response.items[0].id);
      let artistID1 = response.items[0].id;
      console.log("artist response 2",response.items[1].id);
      let artistID2 = response.items[1].id;
      console.log("artist response 3",response.items[2].id);
      let artistID3 = response.items[2].id;
      artistString = artistID1 + "," + artistID2;

      let userTopArtists = {
        artists: [],
      };
      for (var i = 0; i < response.items.length; i++){
        userTopArtists.artists[i] = {
          artistName: response.items[i].name,
          artistID: response.items[i].id,
        };
      };

      console.log("userTopArtists",userTopArtists);

      Test.testerFunction();

    }).fail(function(response){
      console.log("it failed");
      console.log(response);
    });

    //tracks ajax call
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?limit=3",
      headers: {
       'Authorization': 'Bearer ' + localStorage.accessToken
       },
    }).done(function(response){
      console.log("response",response);
      console.log("track response 1",response.items[0].id);
      let trackID1 = response.items[0].id;
      console.log("track response 2",response.items[1].id);
      let trackID2 = response.items[1].id;
      trackString = trackID1 + "," + trackID2;

      let userTopSongs = {
        songs: [],
      };
      for (var i = 0; i < response.items.length; i++){
        userTopSongs.songs[i] = {
          songName: response.items[i].name,
          songID: response.items[i].id,
          artistName: [],
        };
        for (var j = 0; j < response.items[i].artists.length; j++){
          userTopSongs.songs[i].artistName.push(response.items[i].artists[j].name);
        }
      };
      console.log("userTopSongs",userTopSongs);

      Test.testerFunction();

    }).fail(function(response){
      console.log("it failed");
      console.log(response);
    });

    // console.log("trackString",trackString);
    // console.log("artistString",artistString);

    // if (trackString && artistString){
    //   RecommendFxns.ajaxFxns(trackString,artistString);
    // } else {
    //   console.log("they is empty");
    // };

    RecommendFxns.ajaxFxns(trackString,artistString);
    //this will need to be changed later
    // if length of array is less than 10(?), run this function and push to array and set state

  },
};


export default UserPrefs;
