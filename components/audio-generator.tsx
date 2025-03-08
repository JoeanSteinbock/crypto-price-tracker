"use client"

import { useEffect, useRef, useState } from "react"

type AudioGeneratorProps = {
  isPlaying: boolean
  priceDirection?: "up" | "down" | null
  onAudioInitialized: () => void
}

// Musical notes and frequencies for creating melodies
const NOTES = {
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.00,
  A3: 220.00,
  B3: 246.94,
  C4: 261.63, 
  D4: 293.66, 
  E4: 329.63, 
  F4: 349.23, 
  G4: 392.00, 
  A4: 440.00, 
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99
}

// Fibonacci sequence frequencies (multiplied by 20 to get into audible range)
const FIBONACCI_FREQS = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144].map(n => n * 20);

// Prime number frequencies (multiplied by 20 to get into audible range)
const PRIME_FREQS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47].map(n => n * 20);

// Bitcoin-themed arpeggio patterns (using mathematical patterns)
const BITCOIN_ARPEGGIOS = [
  // C major (blockchain base)
  [NOTES.C4, NOTES.E4, NOTES.G4, NOTES.C5],
  // G major (mining reward)
  [NOTES.G4, NOTES.B4, NOTES.D5, NOTES.G5],
  // F major (transaction)
  [NOTES.F4, NOTES.A4, NOTES.C5, NOTES.F5],
  // D minor (cryptography)
  [NOTES.D4, NOTES.F4, NOTES.A4, NOTES.D5],
  // A minor (decentralization)
  [NOTES.A3, NOTES.C4, NOTES.E4, NOTES.A4],
  // E minor (peer-to-peer)
  [NOTES.E4, NOTES.G4, NOTES.B4, NOTES.E5]
]

// Binary rhythm patterns (0 = rest, 1 = play)
const BINARY_RHYTHMS = [
  // 8-bit patterns
  [1, 0, 1, 0, 1, 1, 0, 0], // 0xAC
  [1, 1, 0, 0, 1, 0, 1, 0], // 0xCA
  [1, 0, 1, 0, 0, 1, 1, 0], // 0xA6
  [0, 1, 0, 1, 1, 0, 1, 0], // 0x5A
  // Fibonacci binary
  [0, 1, 1, 0, 1, 0, 0, 1], // Fibonacci in binary
  // Prime binary
  [1, 1, 0, 1, 0, 0, 0, 1]  // Prime pattern
]

export function AudioGenerator({ isPlaying, priceDirection, onAudioInitialized }: AudioGeneratorProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const noiseNodeRef = useRef<AudioNode | null>(null)
  const gainNodesRef = useRef<GainNode | null>(null)
  const isInitializedRef = useRef(false)
  const [audioStatus, setAudioStatus] = useState<string>("Not initialized")
  const arpeggioIntervalRef = useRef<number | null>(null)
  const rhythmIntervalRef = useRef<number | null>(null)
  const currentArpeggioRef = useRef<number>(0)
  const currentNoteRef = useRef<number>(0)
  const currentRhythmRef = useRef<number>(0)
  const currentRhythmStepRef = useRef<number>(0)
  const sequencerNodesRef = useRef<{osc: OscillatorNode, gain: GainNode}[]>([])

  // Initialize audio context on first render
  useEffect(() => {
    if (!isInitializedRef.current) {
      try {
        console.log("Initializing AudioContext...")
        
        // Create audio context
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        // Create master gain node
        gainNodesRef.current = audioContextRef.current.createGain();
        gainNodesRef.current.gain.value = 0.2; // Set lower volume
        gainNodesRef.current.connect(audioContextRef.current.destination);
        
        isInitializedRef.current = true;
        setAudioStatus("Initialized");
        onAudioInitialized();
        
      } catch (err) {
        console.error("Initialization failed:", err);
        setAudioStatus("Initialization failed");
      }
    }
  }, [onAudioInitialized]);

  // Create white noise generator with filter sweeps
  const createNoiseGenerator = (ctx: AudioContext) => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate noise with occasional digital glitches
    for (let i = 0; i < bufferSize; i++) {
      // Add digital glitches (bit-crushing effect)
      if (Math.random() < 0.001) {
        // Create a glitch pattern for the next few samples
        const glitchLength = Math.floor(Math.random() * 100) + 10;
        const glitchValue = Math.random() > 0.5 ? 0.8 : -0.8;
        
        for (let j = 0; j < glitchLength && i + j < bufferSize; j++) {
          // Binary pattern glitch
          output[i + j] = j % 2 === 0 ? glitchValue : -glitchValue;
        }
        
        i += glitchLength;
      } else {
        output[i] = Math.random() * 2 - 1;
      }
    }
    
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    
    // Create a bandpass filter for the noise with sweeping effect
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 800;
    bandpass.Q.value = 1.5;
    
    // Create a gain node for the noise
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.01; // Very quiet
    
    // Connect everything
    whiteNoise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(gainNodesRef.current!);
    
    // Create filter sweep effect with randomized parameters
    const sweepFilter = () => {
      const now = ctx.currentTime;
      // Sweep filter frequency up and down for interesting texture
      bandpass.frequency.cancelScheduledValues(now);
      bandpass.frequency.setValueAtTime(bandpass.frequency.value, now);
      
      // Randomize target frequencies
      const targetFreq1 = 400 + Math.random() * 2000;
      const targetFreq2 = 200 + Math.random() * 600;
      
      // Randomize timing
      const sweepTime1 = 3 + Math.random() * 4;
      const sweepTime2 = 3 + Math.random() * 4;
      
      bandpass.frequency.exponentialRampToValueAtTime(targetFreq1, now + sweepTime1);
      bandpass.frequency.exponentialRampToValueAtTime(targetFreq2, now + sweepTime1 + sweepTime2);
      
      // Schedule next sweep
      setTimeout(sweepFilter, (sweepTime1 + sweepTime2) * 1000);
    };
    
    sweepFilter();
    whiteNoise.start(0);
    
    return whiteNoise;
  };

  // Create a reverb effect with randomized parameters
  const createReverb = (ctx: AudioContext) => {
    // Randomize reverb duration for variety
    const duration = 1 + Math.random() * 2;
    
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const impulse = ctx.createBuffer(2, length, sampleRate);
    const impulseL = impulse.getChannelData(0);
    const impulseR = impulse.getChannelData(1);
    
    // Generate impulse response with digital artifacts
    for (let i = 0; i < length; i++) {
      const n = i / length;
      // Decay curve
      const t = i / sampleRate;
      const decay = Math.exp(-t * 3);
      
      // Add occasional digital artifacts
      if (Math.random() < 0.01) {
        // Digital spike
        impulseL[i] = (Math.random() > 0.5 ? 1 : -1) * decay;
        impulseR[i] = (Math.random() > 0.5 ? 1 : -1) * decay;
      } else {
        // Random values for natural reverb
        impulseL[i] = (Math.random() * 2 - 1) * decay;
        impulseR[i] = (Math.random() * 2 - 1) * decay;
      }
    }
    
    const convolver = ctx.createConvolver();
    convolver.buffer = impulse;
    
    return convolver;
  };

  // Create a delay effect with randomized parameters
  const createDelay = (ctx: AudioContext) => {
    // Randomize delay time for variety
    const delayTime = 0.25 + Math.random() * 0.25;
    
    const delay = ctx.createDelay();
    delay.delayTime.value = delayTime;
    
    const feedbackGain = ctx.createGain();
    feedbackGain.gain.value = 0.3 + Math.random() * 0.2;
    
    delay.connect(feedbackGain);
    feedbackGain.connect(delay);
    
    return { delay, feedbackGain };
  };

  // Create a sequencer for playing arpeggios
  const startArpeggio = () => {
    if (!audioContextRef.current || !gainNodesRef.current) return;
    
    const ctx = audioContextRef.current;
    const arpeggioSpeed = 150 + Math.floor(Math.random() * 100); // ms between notes
    
    // Start with a random arpeggio
    currentArpeggioRef.current = Math.floor(Math.random() * BITCOIN_ARPEGGIOS.length);
    
    // Function to play the next note in the arpeggio
    const playNextArpeggioNote = () => {
      if (!isPlaying || !audioContextRef.current) return;
      
      const ctx = audioContextRef.current;
      const currentArpeggio = BITCOIN_ARPEGGIOS[currentArpeggioRef.current];
      const noteFreq = currentArpeggio[currentNoteRef.current];
      
      // Create oscillator for the note
      const osc = ctx.createOscillator();
      // Randomize waveform for variety
      osc.type = ["sine", "triangle", "square"][Math.floor(Math.random() * 3)] as OscillatorType;
      osc.frequency.value = noteFreq;
      
      // Add slight detuning for more organic sound
      osc.detune.value = Math.random() * 10 - 5;
      
      // Create gain node with envelope
      const noteGain = ctx.createGain();
      noteGain.gain.value = 0;
      
      // Connect to effects
      const { delay } = createDelay(ctx);
      osc.connect(noteGain);
      noteGain.connect(delay);
      delay.connect(gainNodesRef.current!);
      
      // Apply envelope
      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      // Start and stop
      osc.start(now);
      osc.stop(now + 0.5);
      
      // Move to next note
      currentNoteRef.current = (currentNoteRef.current + 1) % currentArpeggio.length;
      
      // Occasionally change to a different arpeggio
      if (currentNoteRef.current === 0 && Math.random() > 0.7) {
        currentArpeggioRef.current = Math.floor(Math.random() * BITCOIN_ARPEGGIOS.length);
      }
    };
    
    // Start the interval
    arpeggioIntervalRef.current = window.setInterval(playNextArpeggioNote, arpeggioSpeed);
  };

  // Create a binary rhythm sequencer based on binary patterns
  const startRhythmSequencer = () => {
    if (!audioContextRef.current || !gainNodesRef.current) return;
    
    const ctx = audioContextRef.current;
    const rhythmSpeed = 125; // 16th notes at 120bpm
    
    // Start with a random rhythm pattern
    currentRhythmRef.current = Math.floor(Math.random() * BINARY_RHYTHMS.length);
    
    // Function to play the next step in the rhythm
    const playNextRhythmStep = () => {
      if (!isPlaying || !audioContextRef.current) return;
      
      const ctx = audioContextRef.current;
      const currentRhythm = BINARY_RHYTHMS[currentRhythmRef.current];
      const step = currentRhythmStepRef.current;
      
      // If this step is active (1), play a sound
      if (currentRhythm[step] === 1) {
        // Create oscillator for the rhythm hit
        const osc = ctx.createOscillator();
        osc.type = "square";
        
        // Use Fibonacci or Prime frequencies for geek factor
        const useFreqSet = Math.random() > 0.5 ? FIBONACCI_FREQS : PRIME_FREQS;
        const freqIndex = Math.floor(Math.random() * useFreqSet.length);
        osc.frequency.value = useFreqSet[freqIndex];
        
        // Create gain node with envelope
        const noteGain = ctx.createGain();
        noteGain.gain.value = 0;
        
        // Connect
        osc.connect(noteGain);
        noteGain.connect(gainNodesRef.current!);
        
        // Apply envelope - very short percussive sound
        const now = ctx.currentTime;
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.05, now + 0.005);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        
        // Start and stop
        osc.start(now);
        osc.stop(now + 0.1);
        
        // Store for cleanup
        sequencerNodesRef.current.push({ osc, gain: noteGain });
      }
      
      // Move to next step
      currentRhythmStepRef.current = (currentRhythmStepRef.current + 1) % currentRhythm.length;
      
      // Occasionally change to a different rhythm pattern
      if (currentRhythmStepRef.current === 0 && Math.random() > 0.8) {
        currentRhythmRef.current = Math.floor(Math.random() * BINARY_RHYTHMS.length);
      }
    };
    
    // Start the interval
    rhythmIntervalRef.current = window.setInterval(playNextRhythmStep, rhythmSpeed);
  };

  // Handle background music using oscillators and noise
  useEffect(() => {
    // Clean up any existing oscillators and noise
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Ignore errors from already stopped oscillators
      }
    });
    
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as AudioBufferSourceNode).stop();
        noiseNodeRef.current.disconnect();
      } catch (e) {
        // Ignore errors
      }
    }
    
    sequencerNodesRef.current.forEach(node => {
      try {
        node.osc.stop();
        node.osc.disconnect();
        node.gain.disconnect();
      } catch (e) {
        // Ignore errors
      }
    });
    
    if (arpeggioIntervalRef.current) {
      clearInterval(arpeggioIntervalRef.current);
      arpeggioIntervalRef.current = null;
    }
    
    if (rhythmIntervalRef.current) {
      clearInterval(rhythmIntervalRef.current);
      rhythmIntervalRef.current = null;
    }
    
    oscillatorsRef.current = [];
    noiseNodeRef.current = null;
    sequencerNodesRef.current = [];
    
    if (isPlaying) {
      try {
        const ctx = audioContextRef.current!;
        
        // Create ambient sound with multiple oscillators and noise
        const createAmbientSound = () => {
          // Base frequency oscillator (low pad)
          const baseOsc = ctx.createOscillator();
          baseOsc.type = "sine";
          baseOsc.frequency.value = 110; // A2
          
          // Higher frequency oscillator for texture
          const highOsc = ctx.createOscillator();
          highOsc.type = "sine";
          highOsc.frequency.value = 220; // A3
          
          // Very low frequency oscillator for depth
          const lowOsc = ctx.createOscillator();
          lowOsc.type = "triangle";
          lowOsc.frequency.value = 55; // A1
          
          // Chord oscillators for richness
          const chordOsc1 = ctx.createOscillator();
          chordOsc1.type = "sine";
          chordOsc1.frequency.value = 164.81; // E3
          
          const chordOsc2 = ctx.createOscillator();
          chordOsc2.type = "sine";
          chordOsc2.frequency.value = 196; // G3
          
          // Pulse oscillator for rhythmic element
          const pulseOsc = ctx.createOscillator();
          pulseOsc.type = "square";
          pulseOsc.frequency.value = 0.25; // Very slow pulse
          
          // LFO to modulate the pulse
          const pulseLFO = ctx.createOscillator();
          pulseLFO.type = "sine";
          pulseLFO.frequency.value = 0.1;
          
          // Individual gain nodes for mixing
          const baseGain = ctx.createGain();
          baseGain.gain.value = 0.1;
          
          const highGain = ctx.createGain();
          highGain.gain.value = 0.05;
          
          const lowGain = ctx.createGain();
          lowGain.gain.value = 0.05;
          
          const chordGain1 = ctx.createGain();
          chordGain1.gain.value = 0.03;
          
          const chordGain2 = ctx.createGain();
          chordGain2.gain.value = 0.03;
          
          const pulseGain = ctx.createGain();
          pulseGain.gain.value = 0;
          
          const pulseLFOGain = ctx.createGain();
          pulseLFOGain.gain.value = 0.3;
          
          // Connect everything
          baseOsc.connect(baseGain);
          highOsc.connect(highGain);
          lowOsc.connect(lowGain);
          chordOsc1.connect(chordGain1);
          chordOsc2.connect(chordGain2);
          
          // Connect pulse modulation
          pulseLFO.connect(pulseLFOGain);
          pulseLFOGain.connect(pulseGain.gain);
          pulseOsc.connect(pulseGain);
          
          // Create effects
          const { delay, feedbackGain } = createDelay(ctx);
          const reverb = createReverb(ctx);
          
          baseGain.connect(reverb);
          highGain.connect(reverb);
          lowGain.connect(reverb);
          chordGain1.connect(delay);
          chordGain2.connect(delay);
          pulseGain.connect(delay);
          
          delay.connect(reverb);
          reverb.connect(gainNodesRef.current!);
          
          // Add some noise for texture
          noiseNodeRef.current = createNoiseGenerator(ctx);
          
          // Start oscillators
          baseOsc.start();
          highOsc.start();
          lowOsc.start();
          chordOsc1.start();
          chordOsc2.start();
          pulseOsc.start();
          pulseLFO.start();
          
          // Store references for cleanup
          oscillatorsRef.current = [baseOsc, highOsc, lowOsc, chordOsc1, chordOsc2, pulseOsc, pulseLFO];
          
          // Slowly modulate frequencies for interest with randomization
          const modulate = () => {
            if (!isPlaying) return;
            
            const now = ctx.currentTime;
            
            // Randomize modulation targets
            const baseFreqMod = 110 * (0.95 + Math.random() * 0.1);
            const highFreqMod = 220 * (0.95 + Math.random() * 0.1);
            const chord1FreqMod = 164.81 * (0.98 + Math.random() * 0.04);
            const chord2FreqMod = 196 * (0.98 + Math.random() * 0.04);
            
            // Randomize modulation times
            const modTime1 = 3 + Math.random() * 2;
            const modTime2 = 3 + Math.random() * 2;
            const modTime3 = 4 + Math.random() * 3;
            const modTime4 = 4 + Math.random() * 3;
            
            // Apply modulations
            baseOsc.frequency.exponentialRampToValueAtTime(
              baseFreqMod, 
              now + modTime1
            );
            
            highOsc.frequency.exponentialRampToValueAtTime(
              highFreqMod,
              now + modTime2
            );
            
            // Chord variations
            chordOsc1.frequency.exponentialRampToValueAtTime(
              chord1FreqMod,
              now + modTime3
            );
            
            chordOsc2.frequency.exponentialRampToValueAtTime(
              chord2FreqMod,
              now + modTime4
            );
            
            // Occasionally change pulse rate
            if (Math.random() > 0.7) {
              const newPulseRate = [0.125, 0.25, 0.5][Math.floor(Math.random() * 3)];
              pulseOsc.frequency.exponentialRampToValueAtTime(
                newPulseRate,
                now + 2
              );
            }
            
            // Schedule next modulation
            setTimeout(modulate, 5000 + Math.random() * 3000);
          };
          
          // Start modulation
          modulate();
          
          // Create LFO for subtle volume changes
          const lfo = ctx.createOscillator();
          lfo.frequency.value = 0.1; // Very slow oscillation
          const lfoGain = ctx.createGain();
          lfoGain.gain.value = 0.1;
          lfo.connect(lfoGain);
          lfoGain.connect(gainNodesRef.current!.gain);
          lfo.start();
          oscillatorsRef.current.push(lfo);
        };
        
        createAmbientSound();
        
        // Start the arpeggio player
        startArpeggio();
        
        // Start the binary rhythm sequencer
        startRhythmSequencer();
        
        setAudioStatus("Playing Bitcoin conference soundtrack");
        
      } catch (err) {
        console.error("Failed to start ambient sound:", err);
        setAudioStatus("Audio generation failed");
      }
    } else {
      setAudioStatus("Audio stopped");
    }
    
    return () => {
      // Clean up oscillators and noise on unmount or when isPlaying changes
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Ignore errors from already stopped oscillators
        }
      });
      
      if (noiseNodeRef.current) {
        try {
          (noiseNodeRef.current as AudioBufferSourceNode).stop();
          noiseNodeRef.current.disconnect();
        } catch (e) {
          // Ignore errors
        }
      }
      
      sequencerNodesRef.current.forEach(node => {
        try {
          node.osc.stop();
          node.osc.disconnect();
          node.gain.disconnect();
        } catch (e) {
          // Ignore errors
        }
      });
      
      if (arpeggioIntervalRef.current) {
        clearInterval(arpeggioIntervalRef.current);
        arpeggioIntervalRef.current = null;
      }
      
      if (rhythmIntervalRef.current) {
        clearInterval(rhythmIntervalRef.current);
        rhythmIntervalRef.current = null;
      }
      
      oscillatorsRef.current = [];
      noiseNodeRef.current = null;
      sequencerNodesRef.current = [];
    };
  }, [isPlaying]);

  // Play exciting notification sounds when price changes
  useEffect(() => {
    if (!priceDirection || !audioContextRef.current || !isPlaying) return;
    
    try {
      const ctx = audioContextRef.current;
      
      if (priceDirection === "up") {
        // Create an exciting "up" sound - rising arpeggio
        const notes = [NOTES.C4, NOTES.E4, NOTES.G4, NOTES.C5, NOTES.E5];
        
        notes.forEach((note, index) => {
          setTimeout(() => {
            // Create oscillator
            const osc1 = ctx.createOscillator();
            osc1.type = "sine";
            osc1.frequency.value = note;
            
            const osc2 = ctx.createOscillator();
            osc2.type = "triangle";
            osc2.frequency.value = note * 2;
            osc2.detune.value = 5;
            
            // Create gain node with envelope
            const gainNode = ctx.createGain();
            gainNode.gain.value = 0;
            
            // Apply envelope
            const now = ctx.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            
            // Connect and play
            osc1.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.3);
            osc2.stop(now + 0.3);
            
            // Clean up
            setTimeout(() => {
              osc1.disconnect();
              osc2.disconnect();
              gainNode.disconnect();
            }, 300);
          }, index * 60); // Play each note 60ms apart
        });
        
      } else {
        // Create an exciting "down" sound - falling arpeggio
        const notes = [NOTES.C5, NOTES.G4, NOTES.E4, NOTES.C4, NOTES.G3];
        
        notes.forEach((note, index) => {
          setTimeout(() => {
            // Create oscillator
            const osc1 = ctx.createOscillator();
            osc1.type = "triangle";
            osc1.frequency.value = note;
            
            const osc2 = ctx.createOscillator();
            osc2.type = "sine";
            osc2.frequency.value = note / 2;
            
            // Create gain node with envelope
            const gainNode = ctx.createGain();
            gainNode.gain.value = 0;
            
            // Apply envelope
            const now = ctx.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            
            // Connect and play
            osc1.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.4);
            osc2.stop(now + 0.4);
            
            // Clean up
            setTimeout(() => {
              osc1.disconnect();
              osc2.disconnect();
              gainNode.disconnect();
            }, 400);
          }, index * 60); // Play each note 60ms apart
        });
      }
    } catch (err) {
      console.error("Failed to play price change sound:", err);
    }
  }, [audioContextRef, isPlaying, priceDirection]);

  return null;
}