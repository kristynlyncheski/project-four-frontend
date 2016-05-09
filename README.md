# musicbox

musicbox is an app to give users music recommendations based on his/her Spotify listening history. Similar to the functionality of popular dating apps, users can 'swipe' yes or no song recommendations after reviewing details and listening to a preview. Users are then able to review songs they've saved and send them to existing playlists in their Spotify account.

# technologies

#### frontend - React
- Packages:
  * React-bootstrap for dropdowns
  * React-materialize for buttons
  * React-scrollbar
  * FontAwesome and Material Icons font packages for the icons
  * File-loader for images
- external stylesheet used for CSS
  * needed style loader and css loader

#### external apis
- Spotify
  * Used OAuth to access a user's Spotify account

### backend
- Ruby, using the Ruby on Rails framework

### database (PSQL)
- Three tables:
  * Users
  * Songs
  * Songs_Users (join table for the many-to-many relationship for the previous two)


### MVP Features
- Recommendations
  * Users are given recommended songs based on an algorithm of top three artists and top three songs in their listening history
  * Songs are shown one at a time
    * Song title, artist name, album cover
  * Extra details for the song are available, including album title and a play button for previewing the song
  * A user can then choose to save or skip the song
  * By saving the song, it goes to his/her "Saved Songs" page
- Saved Songs
  * Users can see a list of songs that they have saved
  * From the dropdown on each song, the user can select an existing playlist on his/her Spotify account to add the song to
  * Once a song is added to a playlist, it is removed from this list and added to "History" under the user's profile
- User Profile
  * A user can see his/her Spotify account information, including name and display image
  * User can see the top three artists and top three songs they have listened to
  * History is available to see songs that have already been added to a Spotify playlist
    * Song title, artist name, playlist added to and date it was added



### Features to Come
- Recommended Songs
  * A combination of songs based on user listening history as well as new music featured on Spotify
  * Don't repeat songs that a user has already said yes or no to
- Saved Songs
  * Ability to:
    * remove a song from your profile
    * add a song to a brand new playlist that you create in the app
    * search through songs/events in your saved pages (search bar on top)
- Events
  * Use the Ticketmaster or SongKick API to get upcoming concerts for that artist in your area
  * Ability to:
    * Save a show and its info to your account
    * Save a show's info to your Google or iPhone calendar
- Profile
  * Ability to log out
- Other
  * Remove hash history
  * Add a loading icon where necessary
  * An 'About' page
- **Build app in React Native!!**
