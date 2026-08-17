class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.themeToggleBtn = document.getElementById('theme-toggle');
    this.dirToggleBtn = document.getElementById('dir-toggle');
    
    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.theme);
    this.applyDir(this.dir);

    // Event listeners
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }
    if (this.dirToggleBtn) {
      this.dirToggleBtn.addEventListener('click', () => this.toggleDir());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      if(this.themeToggleBtn) this.themeToggleBtn.innerHTML = '<i class="ri-sun-line"></i>';
    } else {
      document.body.classList.remove('dark-mode');
      if(this.themeToggleBtn) this.themeToggleBtn.innerHTML = '<i class="ri-moon-line"></i>';
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme(this.theme);
  }

  applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    if (dir === 'rtl') {
      document.body.classList.add('rtl-mode');
    } else {
      document.body.classList.remove('rtl-mode');
    }
  }

  toggleDir() {
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
    localStorage.setItem('dir', this.dir);
    this.applyDir(this.dir);
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});
