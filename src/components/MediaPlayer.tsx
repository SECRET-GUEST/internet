import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

interface MediaPlayerProps {
  apiKey: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ apiKey }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');

  const fetchRandomVideo = async () => {
    try {
      const skipCount = Math.floor(Math.random() * 99999); // Nombre aléatoire de vidéos à sauter
      const response = await axios.get(`https://archive.org/services/search/v1/scrape?fields=identifier&q=your_search_query&cursor=${skipCount}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      if (response.data && response.data.items.length > 0) {
        const identifier = response.data.items[0].identifier;
        const videoFileUrl = `https://archive.org/download/${identifier}/${identifier}.mp4`; // Construire l'URL de la vidéo
        setVideoUrl(videoFileUrl);
      } else {
        console.error('Aucune vidéo trouvée.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la vidéo', error);
    }
  };

  useEffect(() => {
    fetchRandomVideo();
  }, [apiKey]);

  return (
    <div className="media-player-wrapper">
      <ReactPlayer
        url={videoUrl}
        playing
        controls
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload'
            }
          }
        }}
        progressInterval={1000}
        onSeek={(e) => console.log('onSeek', e)}
        onStart={() => console.log('onStart')}
        onPlay={() => console.log('onPlay')}
        onPause={() => console.log('onPause')}
        onBuffer={() => console.log('onBuffer')}
        onEnded={() => console.log('onEnded')}
      />
    </div>
  );
};

export default MediaPlayer;
