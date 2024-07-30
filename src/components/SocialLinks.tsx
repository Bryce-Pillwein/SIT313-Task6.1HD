// Social Links tsx


const SocialLinks = () => {
  const size = 32;
  const fill = 'hsl(0 0% 50%)';

  return (
    <div className="grid grid-rows-3 gap-y-6">
      <div className="flex items-center gap-x-8">
        {/* Linked In */}
        <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com">
          <svg viewBox="0 0 195 195" width={size} height={size} fill={fill}>
            <path clip-rule="evenodd" d="M179.88 0H14.57C6.49 0 0 6.53 0 14.16v166.68C0 188.47 6.48 195 14.59 195h165.83c8.1 0 14.58-6.53 14.58-14.16V14.16C194.46 6.53 187.98 0 179.87 0zM28.63 73.5h28.63v93.64H28.63V73.5zm14.59-46.28A16.9 16.9 0 0159.95 44.1a16.9 16.9 0 01-16.74 16.88A16.9 16.9 0 0126.47 44.1c0-9.8 7.56-16.88 16.75-16.88zm59.94 46.28H75.61v92.56h29.17v-46.28c0-11.98 2.16-23.95 17.29-23.95 15.12 0 15.12 14.15 15.12 25.04v45.73h28.63v-51.17c0-25.05-5.4-44.65-34.57-44.65-14.04 0-23.77 7.62-27.55 15.25h-.54V73.5z" fill-rule="evenodd" id="linkedin"></path>
          </svg>
        </a>

        {/* Facebook */}
        <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com">
          <svg viewBox="0 0 123 195" width={size} height={size} fill={fill}>
            <path d="M22.69 103.24h18.28v79a2.73 2.73 0 002.7 2.83h30.97c1.5 0 2.69-1.24 2.69-2.82v-78.62h21.02a2.77 2.77 0 002.7-2.48l3.17-29.09c.1-.79-.17-1.58-.65-2.2a2.53 2.53 0 00-1.99-.96h-24.2V50.66c0-5.48 2.8-8.3 8.39-8.3h15.81c1.5 0 2.69-1.24 2.69-2.82V12.82a2.73 2.73 0 00-2.69-2.82h-22.8c-3.77 0-16.94.79-27.32 10.84a30.89 30.89 0 00-9.57 26.71V68.9h-19.2A2.73 2.73 0 0020 71.73v28.68a2.73 2.73 0 002.69 2.83z" id="facebook"></path>
          </svg>
        </a>

        {/* Instagram */}
        <a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com">
          <svg viewBox="0 0 39 40" width={size} height={size} fill={fill}>
            <g id="instagram">
              <path d="M11.44 2.93a8.5 8.5 0 00-8.5 8.5v17.14a8.5 8.5 0 008.5 8.5h16.09c4.7 0 8.5-3.8 8.5-8.5V11.43a8.5 8.5 0 00-8.5-8.5h-16.1zM0 11.43C0 5.12 5.12 0 11.44 0h16.09c6.31 0 11.44 5.12 11.44 11.43v17.14c0 6.31-5.13 11.43-11.44 11.43h-16.1A11.44 11.44 0 010 28.57V11.43z"></path>
              <path d="M10.6 3.58a6.98 6.98 0 00-7.01 7.06 7.05 7.05 0 007.05 7.05 7.13 7.13 0 007.06-7.1 6.78 6.78 0 00-1.67-4.9c-1.1-1.18-2.85-2.03-5.44-2.1M0 10.63C0 4.82 4.73-.16 10.7 0c3.35.1 6.08 1.24 7.95 3.23a10.34 10.34 0 012.64 7.45 10.71 10.71 0 01-10.65 10.59A10.64 10.64 0 010 10.64z" transform="translate(8.84 9.3)"></path>
              <path d="M2.48 4.96a2.48 2.48 0 100-4.96 2.48 2.48 0 000 4.96z" transform="translate(27.9 6.54)"> </path>
            </g>
          </svg>
        </a>
      </div>

      <div className="flex items-center gap-x-8">
        {/* Spotify */}
        <a rel="noopener noreferrer" target="_blank" href="https://open.spotify.com/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.49 167.49" width={size} height={size} fill={fill}>
            <path d="M83.72 0a83.75 83.75 0 1 0 83.77 83.72A83.75 83.75 0 0 0 83.72 0zm38.4 120.79a5.22 5.22 0 0 1-7.18 1.74c-19.66-12-44.41-14.74-73.56-8.08a5.22 5.22 0 1 1-2.33-10.17c31.9-7.3 59.27-4.16 81.34 9.33a5.22 5.22 0 0 1 1.76 7.18zm10.25-22.8a6.54 6.54 0 0 1-9 2.15C100.86 86.3 66.55 82.3 39.92 90.38a6.531 6.531 0 1 1-3.79-12.5c30.41-9.22 68.22-4.75 94.07 11.13a6.54 6.54 0 0 1 2.2 8.98zm.88-23.75c-27-16-71.52-17.5-97.29-9.68a7.836 7.836 0 1 1-4.54-15c29.58-9 78.75-7.25 109.83 11.2a7.833 7.833 0 0 1-8 13.47z"></path>
          </svg>
        </a>

        {/* Youtube */}
        <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width={size} height={size} fill={fill}>
            <path d="M187.35 50a23.86 23.86 0 0 0-16.8-16.91c-14.81-4-74.23-4-74.23-4s-59.41 0-74.23 4A23.89 23.89 0 0 0 5.29 50c-4 14.91-4 46-4 46s0 31.12 4 46a23.89 23.89 0 0 0 16.8 16.91c14.82 4 74.23 4 74.23 4s59.42 0 74.23-4a23.86 23.86 0 0 0 16.8-16.91c4-14.91 4-46 4-46s-.03-31.12-4-46zM76.89 124.25v-56.5L126.55 96z"></path>
          </svg>
        </a>

        {/* X Twitter */}
        <a rel="noopener noreferrer" target="_blank" href="https://x.com">
          <svg viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={fill}>
            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default SocialLinks;