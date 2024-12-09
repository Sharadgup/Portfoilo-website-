// TextToSpeech.tsx

import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FaVolumeUp } from 'react-icons/fa';
import { VolumeX } from 'lucide-react'; // Assuming you are using lucide-react for volume icon

interface TextToSpeechProps {
  content: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ content }) => {
  const { speak, speaking, supported, cancel } = useSpeechSynthesis();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Toggle speech on button click
  const toggleSpeech = () => {
    if (isSpeaking) {
      cancel(); // Stop speech
      setIsSpeaking(false);
    } else {
      speak({ text: content }); // Start speech
      setIsSpeaking(true);
    }
  };

  // Reset speaking state when speech ends
  useEffect(() => {
    if (!speaking) {
      setIsSpeaking(false);
    }
  }, [speaking]);

  // If speech synthesis is not supported, return null
  if (!supported) {
    return null;
  }

  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-2 z-50">
      <button
        onClick={toggleSpeech}
        className="bg-blue-500 text-white p-2 rounded"
        aria-label={isSpeaking ? "Stop speech" : "Start speech"}
      >
        {isSpeaking ? <VolumeX size={24} /> : <FaVolumeUp size={24} />}
      </button>
    </div>
  );
};

export default TextToSpeech;
