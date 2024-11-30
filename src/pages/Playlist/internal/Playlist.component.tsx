import { usePlaylist } from './Playlist.hooks';

export const Playlist = () => {
  const { playlistDetail } = usePlaylist();
  return (
    <>
      <h1>Playlist</h1>
      {playlistDetail.map(playlist => (
        <div key={playlist.track.uri}>
          {playlist.track.name} - {playlist.track.album.name}
        </div>
      ))}
    </>
  );
};
