import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  wheelSpinSound: HTMLAudioElement | null;
  isMuted: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  setWheelSpinSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  playHit: () => void;
  playSuccess: () => void;
  playWheelSpin: () => void;
  stopWheelSpin: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  wheelSpinSound: null,
  isMuted: true, // Start muted by default
  
  setBackgroundMusic: (music) => set({ backgroundMusic: music }),
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  setWheelSpinSound: (sound) => set({ wheelSpinSound: sound }),
  
  toggleMute: () => {
    const { isMuted } = get();
    const newMutedState = !isMuted;
    
    // Just update the muted state
    set({ isMuted: newMutedState });
    
    // Log the change
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Hit sound skipped (muted)");
        return;
      }
      
      // Clone the sound to allow overlapping playback
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Success sound skipped (muted)");
        return;
      }
      
      successSound.currentTime = 0;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  },

  playWheelSpin: () => {
    const { wheelSpinSound, isMuted } = get();
    if (wheelSpinSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Wheel spin sound skipped (muted)");
        return;
      }
      
      wheelSpinSound.currentTime = 0;
      wheelSpinSound.loop = true; // Loop the spinning sound
      wheelSpinSound.volume = 0.5;
      wheelSpinSound.play().catch(error => {
        console.log("Wheel spin sound play prevented:", error);
      });
    }
  },

  stopWheelSpin: () => {
    const { wheelSpinSound } = get();
    if (wheelSpinSound) {
      wheelSpinSound.pause();
      wheelSpinSound.currentTime = 0;
    }
  }
}));
