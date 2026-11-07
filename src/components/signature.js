const githubIcon = (className = '') => `
        <svg class="${className}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M12 .75a11.25 11.25 0 0 0-3.558 21.923c.563.104.768-.244.768-.543 0-.267-.01-.975-.015-1.914-3.13.68-3.791-1.508-3.791-1.508-.512-1.3-1.25-1.646-1.25-1.646-1.023-.7.077-.686.077-.686 1.13.08 1.725 1.16 1.725 1.16 1.006 1.724 2.641 1.226 3.284.938.102-.729.394-1.226.715-1.508-2.499-.284-5.126-1.25-5.126-5.563 0-1.229.44-2.233 1.16-3.02-.116-.284-.503-1.429.11-2.978 0 0 .945-.302 3.094 1.154A10.79 10.79 0 0 1 12 6.18c.956.004 1.92.13 2.819.38 2.148-1.456 3.09-1.154 3.09-1.154.616 1.55.229 2.694.113 2.978.722.787 1.158 1.791 1.158 3.02 0 4.324-2.631 5.276-5.138 5.554.404.35.765 1.043.765 2.1 0 1.516-.014 2.739-.014 3.111 0 .302.203.652.774.542A11.25 11.25 0 0 0 12 .75Z" />
        </svg>`;

export const createSignature = (label = 'moth.mov') => `
    <p class="signature">
      <a class="signature-github" href="https://github.com/datamothd/moth.mov" target="_blank" rel="noopener noreferrer" aria-label="View moth.mov on GitHub">
        ${githubIcon('signature-github-glow')}
        ${githubIcon()}
      </a>
      <span>${label}</span>
    </p>`;
