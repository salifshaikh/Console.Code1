import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

interface VideoChatProps {
  roomUrl: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ roomUrl }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [callFrame, setCallFrame] = useState<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const frame = DailyIframe.createFrame(videoRef.current, {
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
        borderRadius: '5px',
      },
    });

    frame.join({ url: roomUrl });
    setCallFrame(frame);

    return () => {
      frame.destroy();
    };
  }, [roomUrl]);

  return <div ref={videoRef} style={{ width: '100%', height: '400px' }} />;
};

export default VideoChat;