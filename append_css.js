const fs = require('fs');
const path = require('path');

const cssContent = `
/* New Footer Styles */
.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--bg-color);
  transition: all var(--transition-fast);
}

.social-icon:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.newsletter-form {
  display: flex;
  margin-top: 1.5rem;
}

.newsletter-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--bg-color);
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-sm) 0 0 var(--border-radius-sm);
  flex-grow: 1;
  outline: none;
}

.newsletter-input:focus {
  border-color: var(--accent);
}

.newsletter-btn {
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.newsletter-btn:hover {
  background: #c5a66a;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  font-size: 0.8rem;
  opacity: 0.7;
}

.footer-bottom-links {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
}

.footer-bottom-links a:hover {
  color: var(--accent);
}

.center-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent);
  margin: 0 auto;
}

.back-to-top {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--accent);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
  z-index: 100;
  border: none;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 992px) {
  .footer-bottom {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
  .footer-bottom-links {
    justify-content: center;
  }
  .back-to-top {
    position: static;
    margin: 2rem auto 0;
  }
}
`;

fs.appendFileSync(path.join(__dirname, 'assets', 'css', 'components.css'), cssContent);
console.log('Appended CSS successfully.');
