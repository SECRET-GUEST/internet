import APIKeyProvider from './components/APIKeyProvider';
import MediaPlayer from './components/MediaPlayer';

const Internet = () => {
  return (
    <APIKeyProvider>
      {(apiKey: string) => <MediaPlayer apiKey={apiKey} />}
    </APIKeyProvider>
  );
};

export default Internet;
