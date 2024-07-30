// Logo Text Rotate tsx

const LogoTextRotate = () => {
  const circleText = "DEVELOPERS @ DEAKIN         DEVELOPERS @ DEAKIN         ";

  return (
    <div className="circle">
      <div className="logo">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="140" height="140" rx="70" transform="matrix(1 0 0 -1 0 140)" fill="#FFE900" />
          <path d="M88.1703 52.32C88.1703 52.16 88.197 51.92 88.2503 51.6C88.3036 51.28 88.4103 50.96 88.5703 50.64C88.677 50.32 88.837 50.0533 89.0503 49.84C89.2636 49.68 89.5036 49.68 89.7703 49.84C90.4103 50.16 91.1036 50.56 91.8503 51.04C92.5436 51.52 93.1836 51.9733 93.7703 52.4C94.4103 52.8267 95.1303 53.0667 95.9303 53.12C96.7303 53.1733 97.4236 53.4667 98.0103 54C98.7036 54.5867 99.717 55.28 101.05 56.08C102.33 56.88 103.744 57.68 105.29 58.48C106.784 59.3333 108.33 60.16 109.93 60.96C111.53 61.8133 113.024 62.5867 114.41 63.28C115.744 64.0267 116.89 64.64 117.85 65.12C118.757 65.6533 119.29 66.0267 119.45 66.24C119.93 66.4 120.224 66.72 120.33 67.2C120.437 67.68 120.464 68.1867 120.41 68.72C120.304 69.3067 120.144 69.84 119.93 70.32C119.664 70.8533 119.397 71.2533 119.13 71.52L118.25 71.6C117.237 72.8267 115.984 73.76 114.49 74.4C113.69 74.72 112.624 75.2267 111.29 75.92C109.904 76.6667 108.41 77.4667 106.81 78.32C105.21 79.2267 103.584 80.16 101.93 81.12C100.224 82.08 98.6503 82.96 97.2103 83.76C95.7703 84.56 94.5436 85.2267 93.5303 85.76C92.517 86.2933 91.8503 86.6133 91.5303 86.72C91.0503 86.88 90.5703 86.7733 90.0903 86.4C89.557 86.08 89.1836 85.6533 88.9703 85.12C88.7036 84.5867 88.6503 84 88.8103 83.36C88.917 82.72 89.3436 82.16 90.0903 81.68C91.3703 80.88 92.677 80.08 94.0103 79.28C95.2903 78.48 96.6236 77.7333 98.0103 77.04C99.7703 76.1333 101.397 75.2533 102.89 74.4C104.33 73.5467 106.01 72.7467 107.93 72C108.837 71.6267 109.637 71.12 110.33 70.48C111.024 69.8933 111.824 69.4133 112.73 69.04C112.41 68.88 111.877 68.56 111.13 68.08C110.33 67.6 109.504 67.12 108.65 66.64C107.744 66.16 106.917 65.7333 106.17 65.36C105.424 64.9867 104.944 64.8 104.73 64.8C103.93 64.8 103.29 64.5067 102.81 63.92C102.33 63.3333 101.85 62.7733 101.37 62.24C100.624 61.44 99.5036 60.6933 98.0103 60C96.4636 59.36 95.157 58.96 94.0903 58.8C93.6636 58.7467 93.3436 58.64 93.1303 58.48C92.8636 58.32 92.6503 58.1333 92.4903 57.92C92.277 57.76 92.0903 57.5733 91.9303 57.36C91.717 57.1467 91.4503 56.96 91.1303 56.8C90.1703 56.32 89.4503 55.7067 88.9703 54.96C88.437 54.2667 88.1703 53.3867 88.1703 52.32ZM54.2722 101.92C54.2722 101.707 54.6189 100.64 55.3122 98.72C56.0055 96.8533 56.9122 94.5333 58.0322 91.76C59.0989 88.9867 60.2989 85.9467 61.6322 82.64C62.9122 79.3867 64.1655 76.2667 65.3922 73.28C66.6189 70.3467 67.6855 67.7333 68.5922 65.44C69.4989 63.2 70.1122 61.68 70.4322 60.88C71.4989 58.1067 72.6989 55.4133 74.0322 52.8C75.3122 50.1867 76.5655 47.52 77.7922 44.8C78.0055 44.32 78.1389 43.76 78.1922 43.12C78.1922 42.4267 78.2189 41.76 78.2722 41.12C78.3255 40.48 78.4855 39.8933 78.7522 39.36C78.9655 38.8267 79.3655 38.4533 79.9522 38.24C80.6989 37.9733 81.4455 37.9467 82.1922 38.16C82.9389 38.3733 83.5255 38.8 83.9522 39.44C84.1122 39.6533 84.0322 40.3733 83.7122 41.6C83.3922 42.7733 82.9655 44.2133 82.4322 45.92C81.8455 47.6267 81.2055 49.4667 80.5122 51.44C79.7655 53.4667 79.0455 55.36 78.3522 57.12C77.6589 58.9333 77.0455 60.5333 76.5122 61.92C75.9789 63.36 75.6055 64.3467 75.3922 64.88C75.0722 65.7333 74.5122 67.0667 73.7122 68.88C72.8589 70.7467 71.9522 72.8267 70.9922 75.12C69.9789 77.4667 68.9389 79.8667 67.8722 82.32C66.7522 84.8267 65.7389 87.1733 64.8322 89.36C63.8722 91.6 63.0722 93.52 62.4322 95.12C61.7922 96.7733 61.4189 97.8667 61.3122 98.4C61.2589 98.88 61.0989 99.6 60.8322 100.56C60.5655 101.573 60.2189 102.533 59.7922 103.44C59.3655 104.4 58.8589 105.173 58.2722 105.76C57.6855 106.4 57.0189 106.613 56.2722 106.4C55.3655 106.133 54.8322 105.493 54.6722 104.48C54.5122 103.52 54.3789 102.667 54.2722 101.92ZM17.0878 70.88C16.0745 70.08 15.8878 69.1733 16.5278 68.16C17.1678 67.1467 18.2611 66.08 19.8078 64.96C21.3545 63.8933 23.2211 62.8 25.4078 61.68C27.5411 60.6133 29.6478 59.5733 31.7278 58.56C33.8078 57.5467 35.7011 56.64 37.4078 55.84C39.0611 55.04 40.1811 54.3733 40.7678 53.84C42.5278 52.24 44.1011 51.3333 45.4878 51.12C46.8211 50.96 47.8345 51.1733 48.5278 51.76C49.1678 52.3467 49.4345 53.1467 49.3278 54.16C49.1678 55.1733 48.4745 56.08 47.2478 56.88C46.0745 57.68 44.7945 58.5067 43.4078 59.36C41.9678 60.2133 40.5011 61.04 39.0078 61.84C37.4611 62.64 35.9411 63.3867 34.4478 64.08C32.9011 64.7733 31.4611 65.36 30.1278 65.84C29.5411 66.1067 28.8745 66.3467 28.1278 66.56C27.3278 66.8267 26.7145 67.2 26.2878 67.68C26.0745 67.8933 25.9411 68.08 25.8878 68.24C25.7811 68.4533 25.5145 68.5333 25.0878 68.48L24.1278 68.96C24.7678 69.3867 25.4345 69.7333 26.1278 70C26.8211 70.2667 27.5145 70.56 28.2078 70.88C30.4478 71.8933 32.5278 73.12 34.4478 74.56C36.3678 76.0533 38.3678 77.4133 40.4478 78.64C40.9811 78.5867 41.6745 78.6933 42.5278 78.96C43.3811 79.2267 44.2345 79.5733 45.0878 80C45.9411 80.48 46.7411 80.9867 47.4878 81.52C48.1811 82.0533 48.6878 82.56 49.0078 83.04C49.1678 83.3067 49.2478 83.6267 49.2478 84C49.1945 84.4267 49.1145 84.8267 49.0078 85.2C48.8478 85.6267 48.6345 85.9733 48.3678 86.24C48.1011 86.56 47.8078 86.72 47.4878 86.72C46.9545 86.72 45.9145 86.4 44.3678 85.76C42.8211 85.12 41.0345 84.2667 39.0078 83.2C36.9278 82.1867 34.7145 81.04 32.3678 79.76C30.0211 78.5333 27.8078 77.3333 25.7278 76.16C23.6478 74.9867 21.8345 73.92 20.2878 72.96C18.6878 72 17.6211 71.3067 17.0878 70.88Z" fill="black" />
        </svg>
      </div>
      <div className="text">
        {circleText.split("").map((char, index) => (
          <span key={index} style={{ transform: `rotate(${index * 6.5}deg)` }}
            className="rotate-text">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LogoTextRotate;