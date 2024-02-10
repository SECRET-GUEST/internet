import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

interface MediaPlayerProps {
  apiKey: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ apiKey }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [playTime, setPlayTime] = useState({ start: 0, duration: 5 });

  useEffect(() => {
    const fetchRandomVideo = async () => {
      try {
        const response = await axios.get('http://s3.us.archive.org/?check_limit=1', {
          headers: { 'Authorization': `LOW ${apiKey}:` }
        });

        if (response.data && response.data.url) {
          setVideoUrl(response.data.url);
          const startTime = Math.random() * (60 - 5);
          const durationTime = 5 + Math.random() * (28 - 5);
          setPlayTime({ start: startTime, duration: durationTime });
        } else {
          console.error('La réponse de l\'API ne contient pas d\'URL de vidéo.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la vidéo', error);
      }
    };

    fetchRandomVideo();

    const intervalId = setInterval(fetchRandomVideo, playTime.duration * 1000);

    return () => clearInterval(intervalId);
  }, [playTime.duration, apiKey]);

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
