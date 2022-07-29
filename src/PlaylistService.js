const { Pool } = require('pg');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const queryPlaylist = {
      text: 'SELECT playlists.id, playlists.name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const querySongs = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1',
      values: [playlistId],
    };

    const playlist = await this._pool.query(queryPlaylist);
    const songs = await this._pool.query(querySongs);

    const result = {
      playlist: {
        id: playlist.rows[0].id,
        name: playlist.rows[0].name,
        songs: songs.rows,
      },
    };
    return result;
  }
}

module.exports = PlaylistService;
