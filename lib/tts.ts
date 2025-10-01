export let utterance: SpeechSynthesisUtterance | null = null;
export const tts = (text: string) => {
  utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

export const stopTTS = () => {
  speechSynthesis.cancel();
  utterance = null;
};
