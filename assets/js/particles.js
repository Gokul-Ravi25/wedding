/**
 * Royal Particles Engine
 * Simulates shimmering gold dust, floating embers, and cascading rose & marigold petals.
 */

(function () {
  'use strict';

  class RoyalParticleCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.petals = [];
      this.bursts = [];
      this.mouse = { x: -1000, y: -1000, radius: 100 };
      this.isActive = true;

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });
      window.addEventListener('mouseleave', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });

      // Spawn initial particles
      const count = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < count; i++) {
        this.particles.push(this.createSparkleParticle(true));
      }

      // Spawn initial petals
      const petalCount = window.innerWidth < 768 ? 15 : 28;
      for (let i = 0; i < petalCount; i++) {
        this.petals.push(this.createPetal(true));
      }

      this.loop = this.loop.bind(this);
      requestAnimationFrame(this.loop);
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    createSparkleParticle(randomY = false) {
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : -10,
        size: Math.random() * 2.5 + 0.8,
        speedY: Math.random() * 0.4 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulse: Math.random() * Math.PI,
        color: Math.random() > 0.3 
          ? 'rgba(234, 182, 56, ' // Royal gold
          : 'rgba(255, 230, 160, ' // Starlight cream
      };
    }

    createPetal(randomY = false) {
      const isMarigold = Math.random() > 0.45;
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : -30,
        size: Math.random() * 8 + 8,
        aspectRatio: Math.random() * 0.5 + 0.8,
        speedY: Math.random() * 0.8 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        swingAmplitude: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.4 + 0.45,
        type: isMarigold ? 'marigold' : 'rose'
      };
    }

    triggerBurst(x, y, count = 35) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        this.bursts.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 1.5,
          size: Math.random() * 3.5 + 1.5,
          color: Math.random() > 0.5 ? '#d4af37' : '#ffd700',
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          gravity: 0.12
        });
      }
    }

    drawSparkle(p) {
      const alpha = (Math.sin(p.pulse) * 0.3 + 0.7) * p.opacity;
      this.ctx.fillStyle = `${p.color}${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Subtle glow for larger particles
      if (p.size > 2) {
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
      } else {
        this.ctx.shadowBlur = 0;
      }
    }

    drawPetal(petal) {
      this.ctx.save();
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate((petal.rotation * Math.PI) / 180);
      this.ctx.scale(1, petal.aspectRatio);

      // Color selection
      if (petal.type === 'marigold') {
        const grad = this.ctx.createLinearGradient(0, -petal.size, 0, petal.size);
        grad.addColorStop(0, `rgba(255, 179, 0, ${petal.opacity})`);
        grad.addColorStop(1, `rgba(230, 81, 0, ${petal.opacity * 0.85})`);
        this.ctx.fillStyle = grad;
      } else {
        const grad = this.ctx.createLinearGradient(0, -petal.size, 0, petal.size);
        grad.addColorStop(0, `rgba(219, 39, 119, ${petal.opacity})`);
        grad.addColorStop(0.5, `rgba(159, 18, 57, ${petal.opacity})`);
        grad.addColorStop(1, `rgba(76, 5, 25, ${petal.opacity * 0.85})`);
        this.ctx.fillStyle = grad;
      }

      // Realistic teardrop petal curve
      this.ctx.beginPath();
      this.ctx.moveTo(0, -petal.size);
      this.ctx.bezierCurveTo(
        petal.size * 0.8, -petal.size * 0.5,
        petal.size * 0.8, petal.size * 0.8,
        0, petal.size
      );
      this.ctx.bezierCurveTo(
        -petal.size * 0.8, petal.size * 0.8,
        -petal.size * 0.8, -petal.size * 0.5,
        0, -petal.size
      );
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }

    update() {
      // Update Sparkles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;

        // Subtle gentle drift away from mouse
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }

        if (p.y > this.height + 10 || p.x < -10 || p.x > this.width + 10) {
          this.particles[i] = this.createSparkleParticle(false);
        }
      }

      // Update Petals
      for (let i = 0; i < this.petals.length; i++) {
        const petal = this.petals[i];
        petal.swing += petal.swingSpeed;
        petal.x += Math.sin(petal.swing) * petal.swingAmplitude + petal.speedX;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;

        // Mouse disturbance
        const dx = this.mouse.x - petal.x;
        const dy = this.mouse.y - petal.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          petal.x -= (dx / dist) * 1.5;
          petal.y -= (dy / dist) * 1.5;
        }

        if (petal.y > this.height + 30) {
          this.petals[i] = this.createPetal(false);
        }
      }

      // Update Bursts
      for (let i = this.bursts.length - 1; i >= 0; i--) {
        const b = this.bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += b.gravity;
        b.vx *= 0.98;
        b.alpha -= b.decay;

        if (b.alpha <= 0) {
          this.bursts.splice(i, 1);
        }
      }
    }

    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Draw sparkles
      for (const p of this.particles) {
        this.drawSparkle(p);
      }

      // Draw petals
      for (const petal of this.petals) {
        this.drawPetal(petal);
      }

      // Draw bursts
      for (const b of this.bursts) {
        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, b.alpha);
        this.ctx.fillStyle = b.color;
        this.ctx.beginPath();
        this.ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    loop() {
      this.update();
      this.draw();
      requestAnimationFrame(this.loop);
    }
  }

  // Expose to window
  window.RoyalParticles = {
    init: function (id = 'royal-particles-canvas') {
      const instance = new RoyalParticleCanvas(id);
      window.royalParticlesInstance = instance;
      return instance;
    },
    burst: function (x, y, count) {
      if (window.royalParticlesInstance) {
        window.royalParticlesInstance.triggerBurst(x, y, count);
      }
    }
  };
})();
