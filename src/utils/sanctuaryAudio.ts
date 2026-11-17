export type AmbientMode = 'birds' | 'wind' | 'water' | 'bells' | 'none';

class SanctuaryAudioEngine {
  private ctx: AudioContext | null = null;
  private ambientNodes: AudioNode[] = [];
  private ambientTimer: number | null = null;
  private isAmbientRunning = false;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public playTempleBell(volume = 0.25) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Harmonic partials inspired by cast Burmese bronze temple bells
    const partials = [
      { freq: 392.0, amp: 0.45, decay: 4.5 },
      { freq: 784.0, amp: 0.24, decay: 3.6 },
      { freq: 1188.0, amp: 0.14, decay: 2.8 },
      { freq: 1624.0, amp: 0.08, decay: 2.1 },
    ];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, now);
    masterGain.connect(ctx.destination);

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(p.amp, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + p.decay + 0.05);
    });
  }

  public playBeadClick(isRoundComplete = false) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    if (isRoundComplete) {
      this.playTempleBell(0.22);
      return;
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(210, now + 0.045);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.14, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  private createNoiseBuffer(ctx: AudioContext, seconds = 3): AudioBuffer {
    const bufferSize = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.03 * white) / 1.03;
      data[i] = lastOut * 2.5;
    }
    return buffer;
  }

  public startAmbient(mode: AmbientMode, muted = false) {
    this.stopAmbient();
    if (mode === 'none' || muted) return;

    const ctx = this.ensureContext();
    if (!ctx) return;
    this.isAmbientRunning = true;

    if (mode === 'wind' || mode === 'water' || mode === 'birds') {
      const noise = ctx.createBufferSource();
      noise.buffer = this.createNoiseBuffer(ctx, 4);
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = mode === 'water' ? 'bandpass' : 'lowpass';
      filter.frequency.value = mode === 'water' ? 780 : mode === 'wind' ? 320 : 240;
      filter.Q.value = mode === 'water' ? 0.7 : 0.4;

      const gain = ctx.createGain();
      gain.gain.value = mode === 'water' ? 0.14 : mode === 'wind' ? 0.12 : 0.05;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      this.ambientNodes.push(noise, filter, gain);
    }

    if (mode === 'birds') {
      const chirp = () => {
        if (!this.isAmbientRunning || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const base = 1850 + Math.random() * 750;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(base, now);
        osc.frequency.exponentialRampToValueAtTime(base * 1.24, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(base * 0.92, now + 0.18);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.045, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.24);

        this.ambientTimer = window.setTimeout(chirp, 2600 + Math.random() * 3400);
      };
      this.ambientTimer = window.setTimeout(chirp, 800);
    } else if (mode === 'bells') {
      this.playTempleBell(0.16);
      const loopBell = () => {
        if (!this.isAmbientRunning) return;
        this.playTempleBell(0.14);
        this.ambientTimer = window.setTimeout(loopBell, 9500);
      };
      this.ambientTimer = window.setTimeout(loopBell, 9500);
    }
  }

  public startChantResonance(muted = false) {
    this.stopAmbient();
    if (muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.isAmbientRunning = true;

    const freqs = [130.81, 196.0, 261.63]; // C3, G3, C4 warm monastic drone
    const master = ctx.createGain();
    master.gain.value = 0.04;
    master.connect(ctx.destination);

    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.connect(master);
      osc.start();
      this.ambientNodes.push(osc);
    });
    this.ambientNodes.push(master);
  }

  public stopAmbient() {
    this.isAmbientRunning = false;
    if (this.ambientTimer !== null) {
      window.clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
    this.ambientNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignore already stopped nodes
      }
    });
    this.ambientNodes = [];
  }
}

export const sanctuaryAudio = new SanctuaryAudioEngine();
