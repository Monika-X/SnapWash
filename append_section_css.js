const fs = require('fs');
const path = require('path');

const cssContent = `
/* Process Section */
.process-section {
  background-color: var(--surface);
  position: relative;
}

.process-timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 5rem;
}

.process-timeline::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--glass-border);
  z-index: 1;
}

.process-step {
  text-align: center;
  position: relative;
  z-index: 2;
  width: 25%;
}

.process-icon {
  width: 80px;
  height: 80px;
  background: var(--bg-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: var(--accent);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
}

.process-step:hover .process-icon {
  border-color: var(--accent);
  transform: translateY(-10px);
}

/* Premium Banner */
.premium-banner {
  margin: 8rem auto;
  border-radius: var(--border-radius-xl);
  background: linear-gradient(135deg, var(--primary) 0%, #1e5a58 100%);
  color: var(--bg-color);
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}

.premium-banner::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: url('../images/service_drycleaning_1786960683269.png') no-repeat center/cover;
  opacity: 0.2;
  mix-blend-mode: overlay;
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 500px;
}

.banner-content h2 {
  color: var(--accent);
  font-size: 3rem;
}

/* Testimonials */
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.testimonial-card {
  position: relative;
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: 20px;
  font-size: 4rem;
  color: var(--surface);
  opacity: 0.5;
  z-index: 0;
}

.testimonial-text {
  position: relative;
  z-index: 1;
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 2rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-weight: bold;
}

@media (max-width: 992px) {
  .process-timeline { flex-direction: column; gap: 3rem; align-items: center; }
  .process-timeline::before { display: none; }
  .process-step { width: 100%; }
  .premium-banner { flex-direction: column; text-align: center; padding: 3rem; }
}
`;

fs.appendFileSync(path.join(__dirname, 'assets', 'css', 'components.css'), cssContent);
console.log('Appended section CSS successfully.');
