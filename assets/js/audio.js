/**
 * Royal Audio Controller
 * Provides an opulent, sacred ambient soundscape via Web Audio API
 * or plays a custom audio track if configured.
 */

(function () {
  'use strict';

  class RoyalAudioPlayer {
    constructor() {
      this.isPlaying = false;
      this.audioCtx = null;
      this.customAudio = null;
      this.masterGain = null;
      this.timer = null;
      this.noteIndex = 0;

      // Mohanam / Bhupali Pentatonic Auspicious Scale Frequencies (Hz)
      // D4, E4, F#4, A4, B4, D5, E5, F#5
      this.scale = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99];
      this.arpeggioSequence = [0, 1, 2, 4, 3, 2, 4, 5, 4, 2, 1, 0, 2, 3, 4, 3];

      this.initUI();
    }

    initUI() {
      this.btn = document.getElementById('music-toggle-btn');
      this.statusText = document.getElementById('music-status-text');
      this.waveBars = document.querySelectorAll('.music-wave-bar');

      if (this.btn) {
        this.btn.addEventListener('click', () => this.toggle());
      }
    }

    initWebAudio() {
      if (this.audioCtx) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();

      // Master Gain
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      // Reverb Simulation (Convolver / Delay network)
      this.delay = this.audioCtx.createDelay();
      this.delay.delayTime.value = 0.35;

      this.delayGain = this.audioCtx.createGain();
      this.delayGain.gain.value = 0.35;

      this.delay.connect(this.delayGain);
      this.delayGain.connect(this.delay);
      this.delayGain.connect(this.masterGain);

      // Continuous Tanpura drone base
      this.startDrone();
    }

    startDrone() {
      if (!this.audioCtx) return;

      // Base note D3 (146.83 Hz) and Pa A3 (220.0 Hz)
      const freqs = [146.83, 220.0, 293.66];
      freqs.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.04 / (idx + 1), this.audioCtx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
      });
    }

    playPluckedNote(freq) {
      if (!this.audioCtx || !this.isPlaying) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      // Pluck timbre
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Bell / Sitar harmonic overtone
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 1.2);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      gain.connect(this.delay);

      osc.start(now);
      osc.stop(now + 2.2);
    }

    scheduleMelody() {
      if (!this.isPlaying) return;

      const noteIdx = this.arpeggioSequence[this.noteIndex % this.arpeggioSequence.length];
      const freq = this.scale[noteIdx];
      this.playPluckedNote(freq);

      this.noteIndex++;
      const nextTime = Math.random() * 400 + 750; // Gentle, irregular humanized tempo
      this.timer = setTimeout(() => this.scheduleMelody(), nextTime);
    }

    play() {
      const config = window.WEDDING_CONFIG || {};

      if (config.audio && config.audio.customAudioUrl) {
        if (!this.customAudio) {
          this.customAudio = new Audio(config.audio.customAudioUrl);
          this.customAudio.loop = true;
        }
        this.customAudio.play().catch(e => console.log('Audio autoplay prevented:', e));
      } else {
        this.initWebAudio();
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        // Fade in
        const now = this.audioCtx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.22, now + 2.0);

        if (!this.timer) {
          this.scheduleMelody();
        }
      }

      this.isPlaying = true;
      this.updateUI(true);
    }

    pause() {
      if (this.customAudio) {
        this.customAudio.pause();
      } else if (this.audioCtx && this.masterGain) {
        const now = this.audioCtx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

        clearTimeout(this.timer);
        this.timer = null;
      }

      this.isPlaying = false;
      this.updateUI(false);
    }

    toggle() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }

    updateUI(playing) {
      if (this.btn) {
        this.btn.classList.toggle('playing', playing);
        this.btn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
      }
      if (this.statusText) {
        this.statusText.textContent = playing ? 'Now Playing' : 'Music Paused';
      }
      this.waveBars.forEach((bar) => {
        bar.classList.toggle('animate-wave', playing);
      });
    }
  }

  window.RoyalAudio = new RoyalAudioPlayer();
})();
