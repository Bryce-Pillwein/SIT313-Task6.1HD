// Icon General tsx

interface IconGeneralProps {
  type: string;
  size?: number;
  fill?: string;
}

const IconGeneral: React.FC<IconGeneralProps> = ({ type, size = 24, fill = 'hsl(0 0% 50%)' }) => {

  /**
   * Get Svg Content
   * @returns svg path
   */
  const getSvgContent = () => {
    switch (type) {
      // Theme
      case 'dark-light-mode':
        return "M480-120q-151 0-255.5-104.5T120-480q0-138 90-239.5T440-838q13-2 23 3.5t16 14.5q6 9 6.5 21t-7.5 23q-17 26-25.5 55t-8.5 61q0 90 63 153t153 63q31 0 61.5-9t54.5-25q11-7 22.5-6.5T819-479q10 5 15.5 15t3.5 24q-14 138-117.5 229T480-120Z";

      // Rating Star
      case 'rating':
        return "M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z";

      // Menu
      case 'menu-open':
        return "M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z";
      case 'menu-close':
        return "M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z";

      // Logout
      case 'logout':
        return "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z";

      // Settings
      case 'settings':
        return "M405-80q-15 0-26-10t-13-25l-12-93q-13-5-24.5-12T307-235l-87 36q-14 6-28 1.5T170-215L96-344q-8-13-5-28t15-24l75-57q-1-7-1-13.5v-27q0-6.5 1-13.5l-75-57q-12-9-15-24t5-28l74-129q8-13 22-17.5t28 1.5l87 36q11-8 23-15t24-12l12-93q2-15 13-25t26-10h150q15 0 26 10t13 25l12 93q13 5 24.5 12t22.5 15l87-36q14-6 28-1.5t22 17.5l74 129q8 13 5 28t-15 24l-75 57q1 7 1 13.5v27q0 6.5-2 13.5l75 57q12 9 15 24t-5 28l-74 128q-8 13-22.5 18t-28.5-1l-85-36q-11 8-23 15t-24 12l-12 93q-2 15-13 25t-26 10H405Zm77-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z";

      // Profile
      case 'profile':
        return "M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Z";

      // Placeholder Error
      default:
        return '"M256-200h447l-84-84q-29 21-64.5 32.5T480-240q-39 0-74.5-12T341-285l-85 85Zm-56-57 84-84q-21-29-32.5-64.5T240-480q0-39 12-74.5t33-64.5l-85-85v447Zm142-142 82-81-82-81q-11 18-16.5 38t-5.5 43q0 23 5.5 43t16.5 38Zm138 79q23 0 43-5.5t38-16.5l-81-82-82 82q18 11 38.5 16.5T480-320Zm0-217 81-81q-18-11-38-16.5t-43-5.5q-23 0-43 5.5T399-618l81 81Zm138 138q11-18 16.5-38t5.5-43q0-23-5.5-43.5T618-562l-81 81 81 82Zm142 142v-447l-85 85q21 29 33 64.5t12 74.5q0 39-11.5 74.5T676-341l84 84ZM619-675l85-85H257l84 84q29-21 64.5-32.5T480-720q39 0 74.5 12t64.5 33ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"';
    }
  }

  const svgContent = getSvgContent();

  return (
    <svg width={size} height={size} viewBox="0 -960 960 960" fill={fill}>
      <path d={svgContent} />
    </svg>
  );
}

export default IconGeneral;