// react-speech-kit.d.ts

declare module 'react-speech-kit' {
    // Declaring types for SpeechRecognition, SpeechSynthesis, and useSpeechSynthesis
    export const SpeechRecognition: any;
    export const SpeechSynthesis: any;
    
    export function useSpeechSynthesis(): any;
  
    // You can also specify more specific types if you are familiar with the API
    // For example, if `useSpeechSynthesis` has a certain type signature, you can replace `any` with the appropriate type.
  }
  