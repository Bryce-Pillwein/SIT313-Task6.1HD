// Logo Dev Deakin

import { useEffect, useState } from "react";
import { useThemeContext } from "../providers/ThemeProvider";

const IconDevDeakin = () => {
  const { isDarkTheme } = useThemeContext();
  const [fill, setFill] = useState("#FFE900"); // Yellow
  const [color, setColor] = useState("#212121"); // Black

  useEffect(() => {
    if (isDarkTheme) {
      setFill("#FFE900");
      setColor("#212121");
    } else {
      setFill("#212121");
      setColor("#FFE900");
    }
  }, [isDarkTheme])

  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="50" rx="25" transform="matrix(1 0 0 -1 0 50)" fill={fill} />
      <path d="M32.2681 18.528C32.2681 18.464 32.2788 18.368 32.3001 18.24C32.3215 18.112 32.3641 17.984 32.4281 17.856C32.4708 17.728 32.5348 17.6213 32.6201 17.536C32.7055 17.472 32.8015 17.472 32.9081 17.536C33.1641 17.664 33.4415 17.824 33.7401 18.016C34.0175 18.208 34.2735 18.3893 34.5081 18.56C34.7641 18.7307 35.0521 18.8267 35.3721 18.848C35.6921 18.8693 35.9695 18.9867 36.2041 19.2C36.4815 19.4347 36.8868 19.712 37.4201 20.032C37.9321 20.352 38.4975 20.672 39.1161 20.992C39.7135 21.3333 40.3321 21.664 40.9721 21.984C41.6121 22.3253 42.2095 22.6347 42.7641 22.912C43.2975 23.2107 43.7561 23.456 44.1401 23.648C44.5028 23.8613 44.7161 24.0107 44.7801 24.096C44.9721 24.16 45.0895 24.288 45.1321 24.48C45.1748 24.672 45.1855 24.8747 45.1641 25.088C45.1215 25.3227 45.0575 25.536 44.9721 25.728C44.8655 25.9413 44.7588 26.1013 44.6521 26.208L44.3001 26.24C43.8948 26.7307 43.3935 27.104 42.7961 27.36C42.4761 27.488 42.0495 27.6907 41.5161 27.968C40.9615 28.2667 40.3641 28.5867 39.7241 28.928C39.0841 29.2907 38.4335 29.664 37.7721 30.048C37.0895 30.432 36.4601 30.784 35.8841 31.104C35.3081 31.424 34.8175 31.6907 34.4121 31.904C34.0068 32.1173 33.7401 32.2453 33.6121 32.288C33.4201 32.352 33.2281 32.3093 33.0361 32.16C32.8228 32.032 32.6735 31.8613 32.5881 31.648C32.4815 31.4347 32.4601 31.2 32.5241 30.944C32.5668 30.688 32.7375 30.464 33.0361 30.272C33.5481 29.952 34.0708 29.632 34.6041 29.312C35.1161 28.992 35.6495 28.6933 36.2041 28.416C36.9081 28.0533 37.5588 27.7013 38.1561 27.36C38.7321 27.0187 39.4041 26.6987 40.1721 26.4C40.5348 26.2507 40.8548 26.048 41.1321 25.792C41.4095 25.5573 41.7295 25.3653 42.0921 25.216C41.9641 25.152 41.7508 25.024 41.4521 24.832C41.1321 24.64 40.8015 24.448 40.4601 24.256C40.0975 24.064 39.7668 23.8933 39.4681 23.744C39.1695 23.5947 38.9775 23.52 38.8921 23.52C38.5721 23.52 38.3161 23.4027 38.1241 23.168C37.9321 22.9333 37.7401 22.7093 37.5481 22.496C37.2495 22.176 36.8015 21.8773 36.2041 21.6C35.5855 21.344 35.0628 21.184 34.6361 21.12C34.4655 21.0987 34.3375 21.056 34.2521 20.992C34.1455 20.928 34.0601 20.8533 33.9961 20.768C33.9108 20.704 33.8361 20.6293 33.7721 20.544C33.6868 20.4587 33.5801 20.384 33.4521 20.32C33.0681 20.128 32.7801 19.8827 32.5881 19.584C32.3748 19.3067 32.2681 18.9547 32.2681 18.528ZM18.7089 38.368C18.7089 38.2827 18.8475 37.856 19.1249 37.088C19.4022 36.3413 19.7649 35.4133 20.2129 34.304C20.6395 33.1947 21.1195 31.9787 21.6529 30.656C22.1649 29.3547 22.6662 28.1067 23.1569 26.912C23.6475 25.7387 24.0742 24.6933 24.4369 23.776C24.7995 22.88 25.0449 22.272 25.1729 21.952C25.5995 20.8427 26.0795 19.7653 26.6129 18.72C27.1249 17.6747 27.6262 16.608 28.1169 15.52C28.2022 15.328 28.2555 15.104 28.2769 14.848C28.2769 14.5707 28.2875 14.304 28.3089 14.048C28.3302 13.792 28.3942 13.5573 28.5009 13.344C28.5862 13.1307 28.7462 12.9813 28.9809 12.896C29.2795 12.7893 29.5782 12.7787 29.8769 12.864C30.1755 12.9493 30.4102 13.12 30.5809 13.376C30.6449 13.4613 30.6129 13.7493 30.4849 14.24C30.3569 14.7093 30.1862 15.2853 29.9729 15.968C29.7382 16.6507 29.4822 17.3867 29.2049 18.176C28.9062 18.9867 28.6182 19.744 28.3409 20.448C28.0635 21.1733 27.8182 21.8133 27.6049 22.368C27.3915 22.944 27.2422 23.3387 27.1569 23.552C27.0289 23.8933 26.8049 24.4267 26.4849 25.152C26.1435 25.8987 25.7809 26.7307 25.3969 27.648C24.9915 28.5867 24.5755 29.5467 24.1489 30.528C23.7009 31.5307 23.2955 32.4693 22.9329 33.344C22.5489 34.24 22.2289 35.008 21.9729 35.648C21.7169 36.3093 21.5675 36.7467 21.5249 36.96C21.5035 37.152 21.4395 37.44 21.3329 37.824C21.2262 38.2293 21.0875 38.6133 20.9169 38.976C20.7462 39.36 20.5435 39.6693 20.3089 39.904C20.0742 40.16 19.8075 40.2453 19.5089 40.16C19.1462 40.0533 18.9329 39.7973 18.8689 39.392C18.8049 39.008 18.7515 38.6667 18.7089 38.368ZM3.83512 25.952C3.42979 25.632 3.35512 25.2693 3.61112 24.864C3.86712 24.4587 4.30446 24.032 4.92312 23.584C5.54179 23.1573 6.28846 22.72 7.16312 22.272C8.01646 21.8453 8.85912 21.4293 9.69112 21.024C10.5231 20.6187 11.2805 20.256 11.9631 19.936C12.6245 19.616 13.0725 19.3493 13.3071 19.136C14.0111 18.496 14.6405 18.1333 15.1951 18.048C15.7285 17.984 16.1338 18.0693 16.4111 18.304C16.6671 18.5387 16.7738 18.8587 16.7311 19.264C16.6671 19.6693 16.3898 20.032 15.8991 20.352C15.4298 20.672 14.9178 21.0027 14.3631 21.344C13.7871 21.6853 13.2005 22.016 12.6031 22.336C11.9845 22.656 11.3765 22.9547 10.7791 23.232C10.1605 23.5093 9.58446 23.744 9.05112 23.936C8.81646 24.0427 8.54979 24.1387 8.25112 24.224C7.93112 24.3307 7.68579 24.48 7.51512 24.672C7.42979 24.7573 7.37646 24.832 7.35512 24.896C7.31246 24.9813 7.20579 25.0133 7.03512 24.992L6.65112 25.184C6.90712 25.3547 7.17379 25.4933 7.45112 25.6C7.72846 25.7067 8.00579 25.824 8.28312 25.952C9.17912 26.3573 10.0111 26.848 10.7791 27.424C11.5471 28.0213 12.3471 28.5653 13.1791 29.056C13.3925 29.0347 13.6698 29.0773 14.0111 29.184C14.3525 29.2907 14.6938 29.4293 15.0351 29.6C15.3765 29.792 15.6965 29.9947 15.9951 30.208C16.2725 30.4213 16.4751 30.624 16.6031 30.816C16.6671 30.9227 16.6991 31.0507 16.6991 31.2C16.6778 31.3707 16.6458 31.5307 16.6031 31.68C16.5391 31.8507 16.4538 31.9893 16.3471 32.096C16.2405 32.224 16.1231 32.288 15.9951 32.288C15.7818 32.288 15.3658 32.16 14.7471 31.904C14.1285 31.648 13.4138 31.3067 12.6031 30.88C11.7711 30.4747 10.8858 30.016 9.94712 29.504C9.00846 29.0133 8.12312 28.5333 7.29112 28.064C6.45912 27.5947 5.73379 27.168 5.11512 26.784C4.47512 26.4 4.04846 26.1227 3.83512 25.952Z"
        fill={color} />
    </svg>
  );
};

export default IconDevDeakin;