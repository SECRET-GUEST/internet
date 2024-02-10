import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

interface MediaPlayerProps {
  apiKey: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ apiKey }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRandomVideo = async () => {
    try {
      setIsLoading(true);
      const randomYear = 1970 + Math.floor(Math.random() * (2023 - 1970 + 1));
  
      const response = await axios.get('/api/services/search/v1/scrape', {
        params: {
          fields: 'identifier',
          q: `year:${randomYear}`,
          sorts: 'downloads desc', 
          count: 100 
        },
        headers: { 'Authorization': `LOW ${apiKey}` }
      });
  
      if (response.data && response.data.items.length > 0) {
        const identifier = response.data.items[0].identifier;
        const videoFileUrl = `https://archive.org/download/${identifier}/${identifier}.mp4`;
        setVideoUrl(videoFileUrl);
      } else {
        console.error('Aucune vidéo trouvée.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la vidéo', error);
      setTimeout(fetchRandomVideo, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRandomVideo();
  }, [apiKey]);

  return (
    <div className="media-player-wrapper">
      {isLoading ? <p>Chargement...</p> : null}
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
      />
    </div>
  );
};

export default MediaPlayer;
