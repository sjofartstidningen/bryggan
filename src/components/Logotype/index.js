// @flow
import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  width: 100%;
  height: auto;
`;

const Polygon = styled.polygon`
  fill: ${p => (p.filled ? 'currentColor' : 'none')};
`;

const Path = Polygon.withComponent('path');

function Logotype({ className = '' }: { className?: string } = {}) {
  return (
    <Svg viewBox="0 0 250 300" className={className}>
      <title>Logotype</title>
      <desc>Logotype for Sjöfartstidningen</desc>
      <Polygon points="161.78 201.59 162.33 204.32 163.36 202.91 162.99 201.28 161.78 201.59" />
      <Polygon points="163.54 210.31 164.64 208.53 164.03 205.83 162.93 207.32 163.54 210.31" />
      <Polygon points="154.74 180.51 155.19 180.41 154.44 176.72 154.18 176.78 154.74 180.51" />
      <Path d="M152.2,178.76l-8.26,50.51,3.1-4.19a111.62,111.62,0,0,0,9.46-17.5Z" />
      <Polygon points="155.07 182.76 155.58 186.14 156.32 186.03 155.72 183.04 155.5 183.01 155.55 182.67 155.07 182.76" />
      <Polygon points="191.54 214.78 190.12 215.19 190.06 218.26 191.72 217.81 191.54 214.78" />
      <Polygon points="157.69 200.27 159.13 199.9 158.37 196.14 157.1 196.32 157.69 200.27" />
      <Polygon points="157.91 193.9 156.78 188.27 155.91 188.39 156.76 194.06 157.91 193.9" />
      <Polygon points="185.68 184.4 187.6 175.76 182.5 184.01 185.68 184.4" />
      <Path d="M169.58,230.22c-.64.06-1.31.14-2,.22l.46,2.29,2-.27Z" />
      <Polygon points="151.39 222.99 150.12 224.72 153.88 225.9 154.94 224.19 151.39 222.99" />
      <Polygon points="188.03 173.87 188.22 173 187.72 173.68 188.03 173.87" />
      <Path d="M160.52,206.78l-.41-2c-.39,1-.82,2.11-1.27,3.19l.13.9Z" />
      <Polygon points="188.56 181.88 187.94 184.68 188.5 184.75 188.56 181.88" />
      <Polygon points="164.19 213.55 164.99 217.5 166.62 217.21 165.36 211.67 164.19 213.55" />
      <Polygon points="165.44 219.73 166.16 223.28 167.95 223.04 167.13 219.44 165.44 219.73" />
      <Path d="M166.61,225.51l.54,2.69,1.93-.21-.62-2.72Z" />
      <Path d="M158.5,202.41l-.47.12.12.84C158.27,203.05,158.39,202.73,158.5,202.41Z" />
      <Polygon points="167.03 201.75 168.37 202.51 169.79 200.22 168.57 199.66 167.03 201.75" />
      <Polygon points="174.9 191.08 173.32 193.21 174.08 193.3 175.35 191.25 174.9 191.08" />
      <Polygon points="171.76 195.33 169.95 197.79 171 198.27 172.75 195.45 171.76 195.33" />
      <Polygon points="165.86 203.71 166.34 205.8 167.17 204.44 165.86 203.71" />
      <Path d="M161.74,183.8v0l-.44-.05.81,3.58c.15-1.22.25-2.36.31-3.42Z" />
      <Polygon points="162.46 216.36 161.36 218.13 162.76 217.89 162.46 216.36" />
      <Polygon points="177.8 187.14 176.3 189.17 176.57 189.28 177.88 187.17 177.8 187.14" />
      <Polygon points="161.8 213.12 161.12 209.78 159.45 212.05 160.03 215.97 161.8 213.12" />
      <Path d="M163.5,193.35l1.63,7.16,8.68-11.77.16-.45.13.05,2.05-2.79-11.39-1.38A61.81,61.81,0,0,1,163.5,193.35Z" />
      <Path d="M159,187.94l1.14,5.63.92-.13.06-.29-1.22-5.34Z" />
      <Path d="M162,199.18l.47-.12-.19-.86C162.2,198.52,162.1,198.85,162,199.18Z" />
      <Polygon points="158.09 183.33 158.57 185.7 159.41 185.58 158.93 183.43 158.09 183.33" />
      <Polygon points="155.96 216.79 158.03 217.84 157.55 214.63 155.96 216.79" />
      <Polygon points="154.59 218.65 152.81 221.07 156.18 222.2 157.47 220.11 154.59 218.65" />
      <Polygon points="153.59 172.78 153.84 174.52 153.99 174.49 153.65 172.79 153.59 172.78" />
      <Polygon points="154.56 164.28 154.42 165.17 155.54 170.75 156.05 170.82 154.56 164.28" />
      <Path d="M109.14,228.61a1.06,1.06,0,0,1,1,1l0,0,24,7.48c-7.69-7.18-7.82-19.08-7.77-21.18l-.84-1.69c-4.9-1.94-22.86-16.31-34.64-26,.34,8.94,1.72,18.34,3.59,19.29l.3.15.17.28c0,.06,3.33,5.51,8.23,6.57l1.32.28-.51,1.27c-.13.32-2.91,7.49,4.36,12.46A1.25,1.25,0,0,1,109.14,228.61Z" />
      <Path d="M205.87,271.52a4,4,0,0,1-.9,3.87c-.39.92-2.19,4.08-9,6.66a18.39,18.39,0,0,0,7.64-3.39c1.2-1.12,4.26-4.63,3.59-7-.37-1.34-2-2.11-3.55-2.55A4.82,4.82,0,0,1,205.87,271.52Z" />
      <Path d="M37.2,272.1a26.16,26.16,0,0,0,7.16,1.15c4.21,0,6.57-1.58,7.89-3.3a16.2,16.2,0,0,1-9.48,2.87A23.33,23.33,0,0,1,37.2,272.1Z" />
      <Path d="M192.69,168.13l-.87-.9-.49,2.21,1.8,15.87,29.45,3.6-.92-.38,3.62-8.78c-9-10.36-20.22-13.57-30.63-13.61C194,166.81,193.36,167.47,192.69,168.13Z" />
      <Path d="M19,287.44a18.61,18.61,0,0,0,4.33.42c.51,0,.85,0,.86,0,6,.65,9.79.16,12-.63a44.55,44.55,0,0,1-8.18.58C24.37,287.79,20.76,287.57,19,287.44Z" />
      <Path d="M231.24,167.76c6-14.21,13.15-39.56,0-61.43Z" />
      <Path d="M195.17,238.61l.16,2.76c.6-.21,1.18-.4,1.81-.63l-.2-1.7-.57-.72Z" />
      <Path d="M175.59,261.35c1.59-.21,3.17-.48,4.72-.81l1.22-7.39c-1.54.26-3.08.48-4.59.67Z" />
      <Path d="M183.88,252.73,182.69,260c1.24-.33,2.46-.71,3.65-1.13l-.21-.06,1.7-6.91C186.55,252.19,185.23,252.47,183.88,252.73Z" />
      <Path d="M87.43,297a37.66,37.66,0,0,0,7.09.7,26.4,26.4,0,0,0,14.37-3.92c-4.76,2.23-10.6,3.35-17.46,3.35C90.06,297.15,88.72,297.1,87.43,297Z" />
      <Path d="M169.54,254.58l-1.32,7.33c1.71-.05,3.42-.13,5.1-.29h-.07l1.34-7.51C172.83,254.3,171.13,254.45,169.54,254.58Z" />
      <Path d="M215.69,67.73l3.08.5,1.69,3.4,2,1.32.71.24.74-.18c.64-1.14,2.5-3.5,6.88-3.5a17.32,17.32,0,0,1,5.38,1h1l-4.73-4h-2L224.7,70l-2.16-3.28-1.09-2.52a34.3,34.3,0,0,0-12-2.07l.28,5.58Z" />
      <Path d="M140.66,56.63a7.14,7.14,0,0,0,4.8-1.94l.22-.23.31-.08c4.53-1.24,8.53-1,10.89-.11a7.55,7.55,0,0,0-6.12-2.57,10.1,10.1,0,0,0-1.9.17c-7.78,1.1-12.31-1.26-14.42-3.07l-.95,4.34C135.92,55.46,138.33,56.63,140.66,56.63Z" />
      <Path d="M15.32,278.67a40.54,40.54,0,0,1-9-1.18c5.13,3.37,11.31,1.36,11.34,1.34l.28,0a11.6,11.6,0,0,0,6.35-2.5,9.78,9.78,0,0,1-2.52,1.2A15.13,15.13,0,0,1,15.32,278.67Z" />
      <Path d="M138.37,156.75c1.85-.86,3.67-1.67,5.44-2.4l-.54-3.38A66.18,66.18,0,0,1,138.37,156.75Z" />
      <Path d="M27,273.78a20.67,20.67,0,0,0,2.5-3.46l.49-.9.95.4.46.2c-.92-.43-1.7-.84-2.32-1.19A11.35,11.35,0,0,1,27,273.78Z" />
      <Path d="M158.53,261.62c2.47.2,4.93.32,7.39.32l1.29-7.19c-3.15.2-5.62.28-6.84.31Z" />
      <Path d="M171.85,230l1.87,8.21,1.89-8.5C174.41,229.78,173.13,229.89,171.85,230Z" />
      <Polygon points="195.04 236.3 196.59 235.93 196.41 234.34 194.94 234.64 195.04 236.3" />
      <Path d="M142.93,235.49l-.62,3.82c.13,0,.25.11.39.15l-.09.32,2.86.9-.53-.34,2.18-3.53Z" />
      <Polygon points="189.65 237.59 192.81 236.84 192.71 235.09 189.69 235.7 189.65 237.59" />
      <Polygon points="134.93 180.12 133.52 182.62 135.8 183.78 136.81 181.46 134.93 180.12" />
      <Path d="M159,173.52l1.78,7.84,1.74.21a31.66,31.66,0,0,0-.51-6.66l-1.7.94,1.19-2Z" />
      <Polygon points="146.67 169.54 147.69 163.94 146.97 163.84 144.6 169.25 146.67 169.54" />
      <Path d="M137.29,211.75c.44,1.16.79,2.24,1.11,3.26l7.86-43.23-2.6-.35L133,195.84Z" />
      <Polygon points="134.03 187.84 134.89 185.87 132.39 184.6 131.16 186.78 134.03 187.84" />
      <Polygon points="156.65 176.24 157.41 179.97 158.1 179.82 157.26 176.11 156.65 176.24" />
      <Path d="M115.82,205.12,118.9,201,116,199l1.3-1.86,3,2.12,2.89-3.85,1.79,1.38a32.87,32.87,0,0,0-4.8-3.77l-7.68,9.6Z" />
      <Path d="M110.26,249c2,.87,23.33,10.07,46,12.39l1.89-6.75-49.71-16.61c-.82,6.8,1.3,8.15,1.33,8.17l.69.31-.07.74C110.35,247.89,110.32,248.48,110.26,249Z" />
      <Polygon points="193.63 211.81 193.85 211.74 193.44 208.11 193.42 208.11 193.63 211.81" />
      <Polygon points="193.94 217.22 194.45 217.08 194.11 214.04 193.77 214.14 193.94 217.22" />
      <Polygon points="134.21 176.81 135.75 174.07 134.87 173.54 133.08 176 134.21 176.81" />
      <Polygon points="189.94 223.93 192.04 223.43 191.85 220.14 190.01 220.63 189.94 223.93" />
      <Polygon points="129.63 183.21 129.93 184.35 130.37 183.58 129.63 183.21" />
      <Path d="M74.88,175.25l2.92.55c.27-2.63,1.24-8.46,4.55-11a36.16,36.16,0,0,1-3.91-6.52,16.14,16.14,0,0,1-6,5.2C73.29,165.89,75.19,171.69,74.88,175.25Z" />
      <Path d="M66.63,193.2l-1.23,0,.24.92.39.82a2.41,2.41,0,0,1,.33-1.34A2.33,2.33,0,0,1,66.63,193.2Z" />
      <Path d="M75.4,202.79l.13.33a3.62,3.62,0,0,0,2.21,1.26,12.21,12.21,0,0,0,1.89.31l-.94-.35c-1.44-.51-2.24-1.27-2.33-2.27A3.09,3.09,0,0,1,78,199.48l2.76-2.79a1.6,1.6,0,0,0,.27-1.41,3.23,3.23,0,0,0-1.61-1.61l-.25,0a1.89,1.89,0,0,1,1,1.13,2.59,2.59,0,0,1-.78,2.42L77,200.08c-1.95,1.77-1.88,2.52-1.88,2.55Z" />
      <Path d="M90.76,185.44l.09-.12c6.67,5.49,13.74,11.15,19.83,15.87l7.49-9.38c-5.58-3-12.68-4.72-21.71-4.07l-1.6.12.43-1.57A291,291,0,0,0,103,141.57L87.92,184c.71.39,1.47.78,2.32,1.19Z" />
      <Path d="M49.38,213.18a24.68,24.68,0,0,0-3.52,3.64c20.57-2,37.61,5.61,45.9,9.3,4.72,2.1,5.63,1.26,5.66,1.23.26-.26.1-1.17-.13-1.7L95,221.84a13.7,13.7,0,0,1-1.65-11.63l.49.19c-.27-.38-.51-.71-.64-.91-3.73-2.63-4.45-17.07-4.58-22.56-9.88-4.91-10.83-8.17-10.92-8.83l-3.6-.67a3.77,3.77,0,0,1-.66,1.68c-1.48,2.16-5.14,3.58-10.86,4.21a46.83,46.83,0,0,1-11.18,20.27l.35-.17C54.3,208.54,51.31,212,49.38,213.18Zm26-14.7,2.37-2.78.08-.09h-.07c-1.14-.2-1.57-.26-1.72-.27v-.65l-.21.66c-.36-.05-1.58-.31-1.82-1.37-.17-.74.2-1.41,1.1-2l.23-.16,4.46-.45.26.1a5.68,5.68,0,0,1,3.15,3.16,4.09,4.09,0,0,1-.69,3.53l-3.24,3.24a2.67,2.67,0,0,0-.57.46,3.67,3.67,0,0,0,.77.35l4.61,1.75,1.21,2.49-1.39.32a14.94,14.94,0,0,1-3,.28,15.36,15.36,0,0,1-3.63-.42,5.84,5.84,0,0,1-3.57-2.14,2.42,2.42,0,0,1-.86-1.54C72.67,201.61,73.49,200.16,75.35,198.48Zm-16.23.91.68.42a6.29,6.29,0,0,0,3.36.86,7.62,7.62,0,0,0,1.87-.21l.16,0h.42a3.65,3.65,0,0,0,.57,0l-.06-.08-.13-.22-2.47-5.25-.62-2.41,1.58-1.61,6.85.32,1.35,2.54-1.62,1.49a4,4,0,0,0-2-.38c-.44,0-.76,0-.78,0a1.64,1.64,0,0,0,.14.8l1.93,4.15a3.63,3.63,0,0,1,.24,3.67c-1,1.76-3.67,1.89-4.46,1.89h-.08c-7.55,0-8.53-3.39-8.61-3.77l-.16-.7Z" />
      <Path d="M54.7,259.45l1.48.49A3.55,3.55,0,0,0,57,260c1.66,0,5.19-.74,10.11-5.71l2-2-.29,16.15.09-.14h0l0-.14c12.33,2.53,23.64-17,23.75-17.18,5.13-7.14,3.67-12.66,3.19-14C75,224.63,49.22,224.74,47,224.75l-3.59,1.09c-3.4,2.44-2,11.67-.88,16.32,32.14-.61,49.31,8,50,8.4l-1,2c-.17-.09-17.35-8.66-48.55-8.15,2.39,12,9.71,17.53,11.68,18.82Z" />
      <Path d="M100.21,185.32c16.76,0,26.55,8.39,32.15,16.78l-3.71-13.81-.78-.29.48-.84-1.43-5.32-.67-.34.43-.58-20.89-77.8c3,36.53-5.88,74.26-7.92,82.25C98.66,185.34,99.44,185.32,100.21,185.32Z" />
      <Path d="M66.15,203.05c1,0,2.24-.29,2.52-.77a1.46,1.46,0,0,0-.17-1.18,2.42,2.42,0,0,1-.12.35c-.4.84-1.33,1.26-2.77,1.26h-.17a10.85,10.85,0,0,1-1.57.22,18.17,18.17,0,0,0,2.23.12Z" />
      <Path d="M42.35,223.84l.29-.14,4.19-1.22c.26,0,28.27-.64,50.52,12.76l.29.18.15.31c.13.29,3.14,7.06-2.77,15.82l6.49,2.92c.11.05,2.28,1.22,4,.22,1.51-.88,2.4-3.25,2.59-6.89-1.16-1.06-3.12-4.17-1.51-12.59.39-2.06.67-3.5.9-4.5-7.21-4.76-6.54-11.45-5.89-14.18a15.75,15.75,0,0,1-6.37-4.47,11.64,11.64,0,0,0,1.72,8.58l2.35,4c.19.4,1.2,2.87-.28,4.35a3.2,3.2,0,0,1-2.41.86,15.29,15.29,0,0,1-5.75-1.61c-8.3-3.7-25.59-11.38-46.2-9l-.17,0-.18,0a1.52,1.52,0,0,1-1.14-1.11c-.27-1,.14-2.55,4.91-6.77A4.9,4.9,0,0,0,50,205a38.92,38.92,0,0,1-14,8.44c1.73,7.49-1.36,11.81-1.51,12l-.24.24c-3,2.16-4.46,4.35-4.38,6.53.13,3.54,4.26,6.12,4.31,6.14l6.07,3.91C39.26,237.94,37.32,227.11,42.35,223.84Z" />
      <Path d="M169.08,70.09h.16l-3.44,78.05c6.92-.75,12.77.09,17.48,2.54a19.49,19.49,0,0,1,9.37,10.57c27.77-49.85-2.92-96-3.24-96.47l.07-.05c-.26-.36-.47-.63-.6-.8l-19.57,4.7Z" />
      <Path d="M193.87,163.64c24.81-26.93,16.66-59.15,7-79.59C207.32,102.94,211.72,132.65,193.87,163.64Z" />
      <Polygon points="134.53 170.18 125.81 168.99 128.38 178.58 134.53 170.18" />
      <Path d="M162,70.4,146.8,74a93,93,0,0,1,8.91,36.22Z" />
      <Polygon points="156.02 173.12 156.2 174.01 156.75 173.89 156.6 173.2 156.02 173.12" />
      <Polygon points="137.71 170.61 137.07 170.53 136.22 171.7 136.87 172.09 137.71 170.61" />
      <Polygon points="140.11 166.37 138.6 168.43 138.92 168.48 140.11 166.37" />
      <Path d="M66.52,277.84c-1.78-.09-3.41-.2-4.79-.31A47.29,47.29,0,0,0,66.52,277.84Z" />
      <Path d="M198.8,235.32l3.48-2.81a39.37,39.37,0,0,0-3.94-1.2Z" />
      <Path d="M224.41,191.44l-31-3.78,4.68,41.26A32.76,32.76,0,0,1,211,234.65a17.64,17.64,0,0,1,6.05,8.12,36.63,36.63,0,0,0,6-8.71C232,215.81,225,193.28,224.41,191.44Z" />
      <Path d="M169.22,249a28.65,28.65,0,0,1-6.95-.72L161,252.76c4.4-.14,17.64-.78,27.44-3.39v0l.08,0c3.81-1,7.08-2.34,9.11-4l-.25-2.24C184.25,247.8,175.06,249,169.22,249Z" />
      <Path d="M188.67,257.93c1.05-.44,2.09-.92,3.09-1.46l.56-.29.25.14,3.31-7.22a36,36,0,0,1-5.55,2.1Z" />
      <Path d="M66.74,257.77c-4.57,3.94-8,4.61-9.78,4.53v12.63l.17-.05.19-.05.2,0s1.68.19,4.26.39h4.64Z" />
      <Path d="M192.21,258.8c-29.06,14.83-75.86-4.63-82.32-7.45-.59,2.6-1.68,4.4-3.28,5.33a5.39,5.39,0,0,1-2.69.69,7.7,7.7,0,0,1-3.41-.86l-6.71-3c-2.47,3.91-10.67,15.65-20.69,17A61,61,0,0,0,86,275.06q1.49-.26,2.73-.57l.19-.05.2,0s3,.29,7.29.29c7.22,0,20.63-.84,29.43-6.42l.52-.33.56.26c.1.05,9.69,4.56,19.61,4.56,5.48,0,10-1.36,13.54-4l.57-.44.64.34c.11.06,11,5.83,21.65,5.83,5.84,0,10.47-1.74,13.81-5.16l-.34-.07L197,269l0,0A11.92,11.92,0,0,0,192.21,258.8Z" />
      <Path d="M225.06,235.08a38.26,38.26,0,0,1-3.2,5.3c6.37,1.07,10.57,3.18,12.44,6.29a7.44,7.44,0,0,1,.85,2.13c4.38-5.61,8.17-18.17,9.19-21.74L229,223A46.18,46.18,0,0,1,225.06,235.08Z" />
      <Path d="M232.33,247.8c-1.11-1.81-4.05-4.2-11.74-5.34l0-.36A42.11,42.11,0,0,1,205.33,254l27.72-3.43A4.65,4.65,0,0,0,232.33,247.8Z" />
      <Path d="M68.67,275.66c1.9.08,3.91.13,6,.13,1.77,0,3.41,0,5-.12a67.5,67.5,0,0,1-10.82-4.81Z" />
      <Path d="M96.94,277.9c-.47.07-.94.11-1.42.16.41,0,.81,0,1.23,0a50.59,50.59,0,0,0,13.11-2A90.85,90.85,0,0,1,96.8,277Z" />
      <Polygon points="190.3 206.46 191.05 206.29 190.51 196.78 190.3 206.46" />
      <Path d="M138.28,274.26a58.55,58.55,0,0,1-10.56-3.15A32.79,32.79,0,0,0,138.28,274.26Z" />
      <Path d="M176.45,276.42l1.08,0c-1.11-.16-2.21-.36-3.27-.6Z" />
      <Path d="M158.81,272.28c.94-.3,1.48-.5,1.5-.51l.37-.14.39.13c1.4.47,3.39,1.09,5.47,1.72a60.11,60.11,0,0,1-5.73-2.46A19.76,19.76,0,0,1,158.81,272.28Z" />
      <Path d="M197.57,271.67q-.63.58-1.32,1.11A5.93,5.93,0,0,0,197.57,271.67Z" />
      <Path d="M151.78,135.39a62,62,0,0,1-3.32,7.41l2.28-.77Z" />
      <Polygon points="190.17 212.8 191.41 212.45 191.19 208.6 190.25 208.8 190.17 212.8" />
      <Path d="M181.16,186.16l-14.11,22.78,4.29,18.82c1.65-.15,3.25-.26,4.78-.34l9.06-40.76Z" />
      <Path d="M189.86,227.63c.83.07,1.66.15,2.43.25l-.12-2.14-2.28.55Z" />
      <Path d="M187.6,227.45l.85-40.4-1-.12-9,40.41Q183.45,227.18,187.6,227.45Z" />
      <Polygon points="189.78 231.35 189.74 233.37 192.57 232.79 192.46 230.81 189.78 231.35" />
      <Path d="M157.18,144l1.45,5.39c1.69-.4,3.32-.71,4.9-.95L166.2,88Z" />
      <Path d="M189.77,166.34A73.75,73.75,0,0,0,164,173.82l-1.13.63,1.29-.35a31.58,31.58,0,0,1,.7,7.75l12.88,1.58,9.77-13.26,1.16.88.15-.68,0-.72H189l-.13-2.27.66-.06.15-.66A1.15,1.15,0,0,1,189.77,166.34Z" />
      <Path d="M182.2,152.7a21.4,21.4,0,0,0-5.4-1.86l.86.52-11.31,18.82A75.22,75.22,0,0,1,191.1,164,17,17,0,0,0,182.2,152.7Z" />
      <Path d="M159.23,151.65l3.36,12.55-5.8-.31,1.66,7.26,4,.54-.11.81,13.18-21.92C171.38,149.93,166.06,150.06,159.23,151.65Z" />
      <Path d="M148.71,226.66c-.55.84-1.11,1.68-1.71,2.54l4.22,1,1.42-2.3Z" />
      <Path d="M158.71,222.41l-4.85,7.83c2-.38,4-.73,5.87-1Z" />
      <Polygon points="145.38 231.15 143.75 233.36 148.36 234.82 149.96 232.24 145.38 231.15" />
      <Polygon points="163.91 223.57 163.22 220.12 160.72 220.56 161.22 223.93 163.91 223.57" />
      <Polygon points="170.6 234.69 168.52 234.97 169 237.32 171.16 237.14 170.6 234.69" />
      <Polygon points="166.28 235.26 162.98 235.7 163.29 237.78 166.73 237.5 166.28 235.26" />
      <Path d="M164.9,228.46l-.53-2.65-2.81.37.4,2.71Z" />
      <Path d="M165.82,233l-.47-2.34c-1,.13-2,.3-3,.45l.34,2.31Z" />
      <Path d="M122.11,200.53l3.58,2.56,2-3.52a36,36,0,0,0-2.71-2.83Z" />
      <Path d="M153.51,232.61l-.26-1.39-6.17,10,14.74,4.58.4.12-2.16-14.41C158,231.8,155.78,232.18,153.51,232.61Z" />
      <Polygon points="142.27 168.94 145.11 162.43 145.07 162.2 141.34 168.81 142.27 168.94" />
      <Path d="M188,243.69l-.74,0,.3-14q-4.34-.27-9.62-.08l-2.48,11.18a1.14,1.14,0,0,1-1.1.89,1,1,0,0,1-.25,0,1.09,1.09,0,0,1-.8-.75l-1.23.29-.41-1.81-2.22.18.55,2.72-2.21.46-.61-3-3.56.29.94,6.24-.28,0C167.85,246.88,175.46,247.2,188,243.69Z" />
      <Polygon points="194.07 219.54 194.27 222.9 195.09 222.71 194.71 219.37 194.07 219.54" />
      <Polygon points="194.4 225.21 194.56 228.06 195.67 227.84 195.35 224.99 194.4 225.21" />
      <Path d="M192.94,239.15l-3.34.8-.07,3.3c1.16-.34,2.34-.7,3.58-1.11Z" />
      <Path d="M120.74,202.35l-3.1,4.13c1.62,1.2,3.1,2.27,4.35,3.14l2.57-4.54Z" />
      <Path d="M194.81,232.34l1.34-.27-.14-1.28c-.44-.09-.85-.19-1.3-.27Z" />
      <Path d="M110,232l-.44-.05c-.17.8-.41,2-.74,3.68a.69.69,0,0,1,0,.13l50,16.69,1.36-4.86L110,232Z" />
      <Polygon points="137.74 179.33 139.14 176.13 137.69 175.25 136.06 178.13 137.74 179.33" />
      <Polygon points="131.49 181.6 133.08 178.79 131.74 177.84 129.66 180.68 131.49 181.6" />
      <Polygon points="140.06 174.02 141.33 171.11 140.12 170.94 138.81 173.27 140.06 174.02" />
      <Path d="M123.87,210.89a10.77,10.77,0,0,0,2.52,1.36l.81-.12.21.74,1.3,2.63,0,.31c0,.6-.53,11.75,6.13,18.83l2.53-13.92-2.21-8.26a45.67,45.67,0,0,0-5.94-11Z" />
      <Polygon points="133.12 189.93 131.25 189.24 132.08 192.33 133.12 189.93" />
      <Path
        filled
        d="M136.4,294c-13.7,0-20.45-6.59-20.51-6.66l-.79-.78-.8.77c-5.06,5-12.76,7.5-22.87,7.5a71.21,71.21,0,0,1-17.36-2.26l-.77,2.14c7.61,3.48,14.75,5.25,21.22,5.25,12,0,18.38-6,20.4-8.3,6.18,4.27,12.24,6.44,18,6.44a17.51,17.51,0,0,0,9.26-2.3l-.75-2.09A46.5,46.5,0,0,1,136.4,294Zm-41.88,3.68a37.66,37.66,0,0,1-7.09-.7c1.29.08,2.63.13,4,.13,6.86,0,12.7-1.12,17.46-3.35A26.4,26.4,0,0,1,94.52,297.72Z"
      />
      <Path
        filled
        d="M66.07,205.33h.08c.79,0,3.44-.13,4.46-1.89a3.63,3.63,0,0,0-.24-3.67l-1.93-4.15a1.64,1.64,0,0,1-.14-.8s.34,0,.78,0a4,4,0,0,1,2,.38l1.62-1.49-1.35-2.54-6.85-.32-1.58,1.61.62,2.41L66,200.09l.13.22.06.08a3.65,3.65,0,0,1-.57,0h-.42l-.16,0a7.62,7.62,0,0,1-1.87.21,6.29,6.29,0,0,1-3.36-.86l-.68-.42-1.82,1.47.16.7C57.54,201.94,58.52,205.33,66.07,205.33Zm0-10.44-.39-.82-.24-.92,1.23,0a2.33,2.33,0,0,0-.27.35A2.41,2.41,0,0,0,66,194.89Zm-.59,7.82h.17c1.44,0,2.37-.42,2.77-1.26a2.42,2.42,0,0,0,.12-.35,1.46,1.46,0,0,1,.17,1.18c-.28.48-1.5.77-2.52.77H66.1a18.17,18.17,0,0,1-2.23-.12A10.85,10.85,0,0,0,65.44,202.71Z"
      />
      <Path
        filled
        d="M77.27,206.61a15.36,15.36,0,0,0,3.63.42,14.94,14.94,0,0,0,3-.28l1.39-.32-1.21-2.49-4.61-1.75a3.67,3.67,0,0,1-.77-.35,2.67,2.67,0,0,1,.57-.46l3.24-3.24a4.09,4.09,0,0,0,.69-3.53A5.68,5.68,0,0,0,80,191.45l-.26-.1-4.46.45-.23.16c-.9.6-1.27,1.27-1.1,2,.24,1.06,1.46,1.32,1.82,1.37l.21-.66v.65c.15,0,.58.07,1.72.27h.07l-.08.09-2.37,2.78c-1.86,1.68-2.68,3.13-2.51,4.45a2.42,2.42,0,0,0,.86,1.54A5.84,5.84,0,0,0,77.27,206.61ZM77,200.08l2.41-2.83a2.59,2.59,0,0,0,.78-2.42,1.89,1.89,0,0,0-1-1.13l.25,0A3.23,3.23,0,0,1,81,195.28a1.6,1.6,0,0,1-.27,1.41L78,199.48a3.09,3.09,0,0,0-1.64,2.59c.09,1,.89,1.76,2.33,2.27l.94.35a12.21,12.21,0,0,1-1.89-.31,3.62,3.62,0,0,1-2.21-1.26l-.13-.33-.32-.16S75,201.85,77,200.08Z"
      />
      <Path
        filled
        d="M229.32,220.77c.25-1.85.41-3.68.49-5.46l17.79-15.24a1.13,1.13,0,1,0-1.46-1.73l-16.26,13.92a75.21,75.21,0,0,0-3-20.52l2.71.33h0l.27-2.27-6-.73,3.73-9c1.23-2,27.3-45.28,3-78.76l-1.44,1.07H229v.15l-.17.13c.06.08.11.17.17.26v69.83c-1,2.15-1.95,3.82-2.55,4.87-8.81-9.8-19.58-13.25-29.73-13.67,18.16-20.64,18.1-44,12.82-63.18l24.47.39,0-2.28-25-.4v.67c-.87-3-1.85-5.8-2.91-8.5h.13L207.89,70l7.61,0,1.77.3,1.44,2.9,2.58,1.74,1.76.63,2.45-.63.21-.55c0-.1,1-2.59,5-2.59a15.33,15.33,0,0,1,4.84.92l7.76.06-10.1-8.59h-3.46l-4.42,2.75-.85-1.27-1.34-3.14-.36-.19c-.2-.1-5-2.48-14.55-2.48h-1.18l0,.72-.75-.06-2,25.76a124.39,124.39,0,0,0-13.08-22.91l3.61-.87-.52-2.21-22,5.28,5.68-12.8H173l6.56-37.93,1.1-1.08a6.42,6.42,0,0,1,1.44-.94,8.62,8.62,0,0,1,2.21-.28q4.65,0,11,3.82l7,3.32,2.37-.6,1.19-.41s2.6-4.29,2.61-4.34c1,.12,4-1.26,5.94,2.22.56,1.05,2.4,3.29,7.89,3.29a25.74,25.74,0,0,0,3.27-.23l4.14-.55-.78-.33h0L207.77,9.23l-1.56-.74-.53.37a11.13,11.13,0,0,1-5.56,1.84,7,7,0,0,1-1.14-.13,6.16,6.16,0,0,1-3-2.64l-.1-.17-.19-.07c-.06,0-.45-.17-1.09-.38l-.2-.1a26.27,26.27,0,0,0-11-2.36c-.77,0-1.55,0-2.32.11l.39-5h-3.29L165.61,53.4l-4.18,1.26,1.25,11L162.33,68l-23.71,5.69.52,2.22,5.4-1.29c.61,1.16,19.33,37.46.73,69.28l-3,1,.47,2.91a66.06,66.06,0,0,1-11.63,12.74l1.46,1.75c.3-.27.57-.54.87-.8l.08.15c3.81-1.95,7.33-3.57,10.64-5l0,.23-8.17,11.18-10.88-1.48-10.88-40.54,23.63,3.78.35-2.25-24.56-3.93,0,.15-.15-.59,8.87-35.36,16.41,1,.14-2.27-16-1,8.6-34.27L131,53.87l.44.44c3,3.06,6.12,4.61,9.21,4.61a9.31,9.31,0,0,0,6.19-2.42,21.48,21.48,0,0,1,5.27-.75c4.79,0,6.43,2.25,6.48,2.33l2-.89c-1.11-4.93-4.71-7.77-9.88-7.77a11.63,11.63,0,0,0-2.3.21h0a25.67,25.67,0,0,1-3.52.25c-7.59,0-10.08-3.89-10.18-4l-1.28-2.17,1-4.05-2.19-.56-11.64,46.4-12.53-.8L108,86.94l12.11.77-7.79,31-9.74-36.33c-.49-2-1-4.06-1.61-6L98.8,77,100.39,83c3.06,12.83,4,26.63,3.74,39.85L92.3,120.51l-.43,2.24L104,125.11l.13-.64c-.09,3.5-.26,7-.49,10.34l-.49-.18L85.92,182.87c-5.36-3.2-6-5.11-6-5.15l0-.52c.1-2.59,1.11-9.61,4.55-11l1.58-.64-1.2-1.22s-2.81-2.92-5.41-9.28l-1.6-3.89-.56,4.19s-.53,3.44-6.79,6.6l-.92.46.37,1c1.38,3.58,3.27,10.12,2.51,12.42l-.37,1.13-.24.06a1.26,1.26,0,0,1-.36.93c-.71.91-3,2.54-9.95,3.21l-.85.08-.16.85c0,.23-4.46,23-26.89,29.82l0,.14-.4.14c2.29,6.91,0,11.05-.52,11.82-3.53,2.59-5.27,5.4-5.16,8.34.18,4.76,5.18,7.88,5.37,8l7.93,5.1c2.84,13.32,11.27,19,12.91,20a14,14,0,0,1-11.07,5.13c-7.21,0-13.93-4.51-14-4.55l-1.66-1.13-.1,2c-.34,6.89-5.56,8.34-6,8.47a13.45,13.45,0,0,1-5.72,1,45.39,45.39,0,0,1-12.54-2.27L-.5,273l2,2.87a13.79,13.79,0,0,0,11.82,5.84,19.44,19.44,0,0,0,4.89-.63c6.8-.42,11.27-6.44,12.75-8.76,5.18,2.14,9.69,3.23,13.41,3.23,5.91,0,8.86-2.68,10.34-5.23v5.29c-7.57,2.53-16.73,8.33-18.05,9.19a37,37,0,0,1-8.61.73c-5,0-9.88-.42-9.93-.42l-.57,0-.38.43a2.36,2.36,0,0,0-.62,2.63c.39.88,1.52,2,6.8,2,.46,0,.8,0,.82,0a47.9,47.9,0,0,0,5.27.32c8.3,0,11-2.8,11.63-3.79a62.46,62.46,0,0,1,17.42-7.5c1.87.67,5.24,1,10.29,1,8.1,0,18-.88,19.66-1a25.08,25.08,0,0,0,8.32,1.27c12.2,0,25.91-6.39,28.83-7.83a36.79,36.79,0,0,0,18.09,4.33,54.42,54.42,0,0,0,17.06-2.83c4.83,1.59,15.16,4.58,15.27,4.61l.16,0h.18c13.65-.38,21.6-2.59,23.63-6.56a4.41,4.41,0,0,0,.5-2c1.2.36,2.93,1.11,3.27,2.1.17.47,0,1.08-.63,1.81l-.2.37c0,.07-2.73,7.18-24.73,8.66l0,2.28c.09,0,2.16.17,5.22.17,7.14,0,16.7-.89,21.76-5.2.56-.52,5.42-5.2,4.27-9.34-.62-2.21-2.76-3.7-6.37-4.43l-.34-.07-2.9,1.26-.54-.83a14.19,14.19,0,0,0-5.19-9.59l.41.2,5.07-11-.19-.14.68-.08L199.1,238l5.58-4.51a25.23,25.23,0,0,1,4.82,2.88c4.23,3.29,5.4,6.76,5.71,8.24a45.08,45.08,0,0,1-17,9.82,1.14,1.14,0,0,0,.35,2.22,1,1,0,0,0,.35-.06l.13,0,.06.49,33.28-4.11-.62,1.8,3-2.24c5.76-4.37,10.66-20.71,11.83-24.85l2.41.63.57-2.21Zm1.92-114.44c13.15,21.87,6,47.22,0,61.43Zm-9.79-42.11,1.09,2.52L224.7,70l5.73-3.56h2l4.73,4h-1a17.32,17.32,0,0,0-5.38-1c-4.38,0-6.24,2.36-6.88,3.5l-.74.18-.71-.24-2-1.32-1.69-3.4-3.08-.5h-5.95l-.28-5.58A34.3,34.3,0,0,1,221.45,64.22ZM184.35,6.54a35.82,35.82,0,0,1,10.72,2.15,7.13,7.13,0,0,0,6.41,3.52,14.68,14.68,0,0,0,6.46-1.77l17,7.71c-.45,0-.88.06-1.3.06-5.13,0-6.2-2.6-6.25-2.7l-.07-.19-.17-.11c-.16-.09-3.95-2.28-6.76-2.63a6.55,6.55,0,0,0-.72-.05,2.42,2.42,0,0,0-1.95.73,1.82,1.82,0,0,0-.4,1.11l-2.08,3.16a7.35,7.35,0,0,0-1.19.31,8.73,8.73,0,0,0-2.15-1c-.82-.24-1.84-.54-6.56-3.35a17.9,17.9,0,0,0-9-2.83A10.44,10.44,0,0,0,181,12.08l.88-5.34A14.21,14.21,0,0,1,184.35,6.54Zm-46,150.21a66.18,66.18,0,0,0,4.9-5.78l.54,3.38C142,155.08,140.22,155.89,138.37,156.75ZM134.44,48.8c2.11,1.81,6.64,4.17,14.42,3.07a10.1,10.1,0,0,1,1.9-.17,7.55,7.55,0,0,1,6.12,2.57c-2.36-.89-6.36-1.13-10.89.11l-.31.08-.22.23a7.14,7.14,0,0,1-4.8,1.94c-2.33,0-4.74-1.17-7.17-3.49ZM18,278.79l-.28,0s-6.21,2-11.34-1.34a40.54,40.54,0,0,0,9,1.18,15.13,15.13,0,0,0,6.47-1.18,9.78,9.78,0,0,0,2.52-1.2A11.6,11.6,0,0,1,18,278.79Zm13-9-.95-.4-.49.9a20.67,20.67,0,0,1-2.5,3.46,11.35,11.35,0,0,0,2.08-4.95c.62.35,1.4.76,2.32,1.19Zm13.43,3.43a26.16,26.16,0,0,1-7.16-1.15,23.33,23.33,0,0,0,5.57.72A16.2,16.2,0,0,0,52.25,270C50.93,271.67,48.57,273.25,44.36,273.25ZM24.2,287.84s-.35,0-.86,0a18.61,18.61,0,0,1-4.33-.42c1.75.13,5.36.35,9,.35a44.55,44.55,0,0,0,8.18-.58C34,288,30.18,288.49,24.2,287.84Zm183-16.19c.67,2.38-2.39,5.89-3.59,7a18.39,18.39,0,0,1-7.64,3.39c6.78-2.58,8.58-5.74,9-6.66a4,4,0,0,0,.9-3.87,4.82,4.82,0,0,0-2.19-2.42C205.27,269.54,206.86,270.31,207.23,271.65Zm18.05-91.9-3.62,8.78.92.38-29.45-3.6-1.8-15.87.49-2.21.87.9c.67-.66,1.32-1.32,2-2C205.06,166.18,216.31,169.39,225.28,179.75ZM189,169.65h-.13l0,.72-.15.68-1.16-.88-9.77,13.26-12.88-1.58a31.58,31.58,0,0,0-.7-7.75l-1.29.35,1.13-.63a73.75,73.75,0,0,1,25.79-7.48,1.15,1.15,0,0,0-.14.32l-.15.66-.66.06ZM163.62,240l3.56-.29.61,3,2.21-.46-.55-2.72,2.22-.18.41,1.81,1.23-.29a1.09,1.09,0,0,0,.8.75,1,1,0,0,0,.25,0,1.14,1.14,0,0,0,1.1-.89l2.48-11.18q5.28-.19,9.62.08l-.3,14,.74,0c-12.54,3.51-20.15,3.19-23.72,2.63l.28,0Zm-53.87,6.19s-2.15-1.37-1.33-8.17l49.71,16.61-1.89,6.75c-22.65-2.32-44-11.52-46-12.39.06-.55.09-1.14.11-1.75l.07-.74Zm-6.51-31.6c-4.9-1.06-8.2-6.51-8.23-6.57l-.17-.28-.3-.15c-1.87-.95-3.25-10.35-3.59-19.29,11.78,9.65,29.74,24,34.64,26l.84,1.69c-.05,2.1.08,14,7.77,21.18l-24-7.48,0,0a1.06,1.06,0,0,0-1-1,1.25,1.25,0,0,0-.73,0c-7.27-5-4.49-12.14-4.36-12.46l.51-1.27Zm26.42-34,2.08-2.83,1.34,1-1.59,2.8Zm.71,2.91-.44.78-.3-1.15Zm2,1,2.5,1.27-.86,2-2.87-1.06Zm.73,5.33-1,2.4-.83-3.09Zm10.54-18.5,2.6.35L138.4,215c-.32-1-.67-2.1-1.11-3.26L133,195.84Zm15.57-19.78c6.83-1.59,12.15-1.72,16.26-1.07L162.31,172.5l.11-.81-4-.54-1.66-7.26,5.8.31Zm17.57-.81a21.4,21.4,0,0,1,5.4,1.86A17,17,0,0,1,191.1,164a75.22,75.22,0,0,0-24.75,6.21l11.31-18.82Zm12.94,82.53,0-2,2.68-.54.11,2Zm3,1.72.1,1.75-3.16.75,0-1.89Zm-2.85-7.46,0-1.34,2.28-.55.12,2.14C191.52,227.78,190.69,227.7,189.86,227.63Zm.08-3.7.07-3.3,1.84-.49.19,3.29Zm.12-5.67.06-3.07,1.42-.41.18,3Zm.11-5.46.09-4,.93-.2.22,3.85Zm.13-6.34.21-9.68.54,9.51Zm-9.14-20.3,4,.5-9.06,40.76c-1.53.08-3.13.19-4.78.34l-4.29-18.82Zm-4.86,3,1.5-2,.08,0-1.31,2.11Zm6.2-5.16,5.1-8.24-1.92,8.63Zm-6.89,45.7-1.89,8.5L171.85,230C173.13,229.89,174.41,229.78,175.61,229.71Zm-8.44-25.27-.83,1.36-.48-2.09Zm-.14-2.68,1.54-2.1,1.22.56-1.42,2.29Zm-.41,15.45-1.63.29-.8-3.95,1.17-1.88Zm.51,2.23L168,223l-1.79.23-.72-3.54Zm1.33,5.83.62,2.72-1.93.21-.54-2.69Zm1.12,4.95.51,2.24-2,.27-.46-2.29C168.27,230.36,168.94,230.28,169.58,230.22Zm1,4.47.56,2.45-2.16.18-.48-2.35Zm-.65-36.9,1.81-2.46,1,.12L171,198.27Zm3.37-4.58,1.58-2.13.45.17-1.27,2.05Zm.78-4.87-.13-.05-.16.45-8.68,11.77-1.63-7.16a61.81,61.81,0,0,0,1.26-9.18l11.39,1.38ZM164,205.83l.61,2.7-1.1,1.78-.61-3Zm-3.87-12.26L159,187.94l.9-.13,1.22,5.34-.06.29Zm.36,13.21L159,208.87l-.13-.9c.45-1.08.88-2.15,1.27-3.19Zm-2-21.08-.49-2.37.85.1.48,2.15Zm-.2,10.44.76,3.76-1.44.37-.59-4Zm.13,6.27c-.11.32-.23.64-.35,1l-.12-.84Zm.21,20,1,6.8c-1.89.3-3.86.65-5.87,1Zm.74-10.36,1.67-2.27.68,3.34L160,216Zm3-28.17c-.06,1.06-.16,2.2-.31,3.42l-.81-3.58.44.05v0Zm0,15.18-.47.12c.09-.33.19-.66.28-1Zm0,17.3.3,1.53-1.4.24Zm.76,3.76.69,3.45-2.69.36-.5-3.37Zm-.89-15.8-.55-2.73,1.21-.31.37,1.63Zm-1.56-23L159,173.52l2.5.35-1.19,2,1.7-.94a31.66,31.66,0,0,1,.51,6.66Zm-3.51-5.25.84,3.72-.69.14-.76-3.73ZM156.2,174l-.18-.89.58.08.15.69Zm-.66-3.26-1.12-5.58.14-.9,1.49,6.55Zm-1.1,6,.75,3.69-.45.1-.56-3.73Zm1.11,5.95-.05.34.22,0,.61,3-.75.11-.51-3.38Zm1.23,5.6,1.14,5.63-1.16.16-.84-5.67Zm.77,26.36.48,3.21L156,216.79Zm-.08,5.48-1.29,2.09-3.37-1.13,1.78-2.42Zm-2.53,4.08-1.06,1.71-3.76-1.18,1.27-1.73Zm-2.3,3.71-1.42,2.3-4.22-1c.6-.86,1.16-1.7,1.71-2.54ZM150,232.24l-1.59,2.58-4.61-1.46,1.63-2.21Zm-4.48,8.44-2.86-.9.09-.32c-.14,0-.26-.11-.39-.15l.62-3.82,4.19,1.32-2.18,3.53Zm-10.33-28.22,2.21,8.26-2.53,13.92c-6.66-7.08-6.16-18.23-6.13-18.83l0-.31-1.3-2.63-.21-.74-.81.12a10.77,10.77,0,0,1-2.52-1.36l5.33-9.41A45.67,45.67,0,0,1,135.14,212.46ZM122,209.62c-1.25-.87-2.73-1.94-4.35-3.14l3.1-4.13,3.82,2.73Zm3.7-6.53-3.58-2.56,2.85-3.79a36,36,0,0,1,2.71,2.83Zm-2.53-7.73-2.89,3.85-3-2.12L116,199l2.9,2.08-3.08,4.09-3.35-2.55,7.68-9.6a32.87,32.87,0,0,1,4.8,3.77Zm-14.39,40.42a.69.69,0,0,0,0-.13c.33-1.71.57-2.88.74-3.68l.44.05v0l50.14,15.61-1.36,4.86Zm51.6,19.28c1.22,0,3.69-.11,6.84-.31l-1.29,7.19c-2.46,0-4.92-.12-7.39-.32Zm-13.29-13.88,6.17-10,.26,1.39c2.27-.43,4.44-.81,6.55-1.14l2.16,14.41-.4-.12ZM162,228.89l-.4-2.71,2.81-.37.53,2.65Zm3.39,1.8.47,2.34-3.18.42-.34-2.31C163.32,231,164.37,230.82,165.35,230.69Zm.92,4.57.46,2.24-3.44.28L163,235.7Zm21.33-7.81q-4.15-.27-9.15-.11l9-40.41,1,.12Zm.34-42.77.62-2.8-.06,2.87Zm-.22-11,.5-.69-.19.88ZM189.6,240l3.34-.8.17,3c-1.24.41-2.42.77-3.58,1.11Zm4.27-76.31c17.85-31,13.45-60.7,7-79.59C210.53,104.49,218.68,136.71,193.87,163.64Zm-24.56-95,19.57-4.7c.13.17.34.44.6.8l-.07.05c.32.46,31,46.62,3.24,96.47a19.49,19.49,0,0,0-9.37-10.57c-4.71-2.45-10.56-3.29-17.48-2.54l3.44-78.05h-.16ZM166.2,88l-2.67,60.49c-1.58.24-3.21.55-4.9.95L157.18,144ZM146.8,74,162,70.4l-6.24,39.86A93,93,0,0,0,146.8,74ZM154,174.49l-.15,0-.25-1.73h.06Zm2.51,33.09a111.62,111.62,0,0,1-9.46,17.5l-3.1,4.19,8.26-50.51Zm-4.72-72.19-1,6.64-2.28.77A62,62,0,0,0,151.78,135.39ZM147,163.83l.72.11-1,5.6-2.06-.29Zm-1.9-1.63,0,.23-2.84,6.51-.94-.13Zm-3.74,8.91L140.06,174l-1.25-.75,1.31-2.33Zm-1.22-4.74-1.19,2.11-.31,0Zm-3,4.16.64.08-.84,1.48-.65-.39Zm.62,4.72,1.45.88-1.4,3.2-1.68-1.2Zm-.88,6.21-1,2.32-2.28-1.16,1.41-2.5Zm-1.06-7.39-1.54,2.74-1.13-.81,1.79-2.46Zm-1.22-3.89-6.15,8.4L125.81,169Zm-28.74-67.06,20.89,77.8-.43.58.67.34,1.43,5.32-.48.84.78.29,3.71,13.81c-5.6-8.39-15.39-16.78-32.15-16.78-.77,0-1.55,0-2.34.05C99.91,177.38,108.84,139.65,105.79,103.12ZM103,141.57a291,291,0,0,1-7.75,44.72l-.43,1.57,1.6-.12c9-.65,16.13,1,21.71,4.07l-7.49,9.38c-6.09-4.72-13.16-10.38-19.83-15.87l-.09.12-.52-.26c-.85-.41-1.61-.8-2.32-1.19Zm-30.6,22a16.14,16.14,0,0,0,6-5.2,36.16,36.16,0,0,0,3.91,6.52c-3.31,2.5-4.28,8.33-4.55,11l-2.92-.55C75.19,171.69,73.29,165.89,72.44,163.52Zm-20.67,39.9-.35.17A46.83,46.83,0,0,0,62.6,183.32c5.72-.63,9.38-2,10.86-4.21a3.77,3.77,0,0,0,.66-1.68l3.6.67c.09.66,1,3.92,10.92,8.83.13,5.49.85,19.93,4.58,22.56.13.2.37.53.64.91l-.49-.19A13.7,13.7,0,0,0,95,221.84l2.27,3.81c.23.53.39,1.44.13,1.7,0,0-.94.87-5.66-1.23-8.29-3.69-25.33-11.26-45.9-9.3a24.68,24.68,0,0,1,3.52-3.64C51.31,212,54.3,208.54,51.77,203.42ZM40.27,242.3l-6.07-3.91c-.05,0-4.18-2.6-4.31-6.14-.08-2.18,1.39-4.37,4.38-6.53l.24-.24c.15-.2,3.24-4.52,1.51-12A38.92,38.92,0,0,0,50,205a4.9,4.9,0,0,1-1.94,6.31c-4.77,4.22-5.18,5.75-4.91,6.77a1.52,1.52,0,0,0,1.14,1.11l.18,0,.17,0c20.61-2.41,37.9,5.27,46.2,9a15.29,15.29,0,0,0,5.75,1.61A3.2,3.2,0,0,0,99,229c1.48-1.48.47-4,.28-4.35l-2.35-4a11.64,11.64,0,0,1-1.72-8.58,15.75,15.75,0,0,0,6.37,4.47c-.65,2.73-1.32,9.42,5.89,14.18-.23,1-.51,2.44-.9,4.5-1.61,8.42.35,11.53,1.51,12.59-.19,3.64-1.08,6-2.59,6.89-1.71,1-3.88-.17-4-.22L95,251.55c5.91-8.76,2.9-15.53,2.77-15.82l-.15-.31-.29-.18c-22.25-13.4-50.26-12.77-50.52-12.76l-4.19,1.22-.29.14C37.32,227.11,39.26,237.94,40.27,242.3Zm21.46,35.23c1.38.11,3,.22,4.79.31A47.29,47.29,0,0,1,61.73,277.53Zm4.69-2.29H61.78c-2.58-.2-4.23-.38-4.26-.39l-.2,0-.19.05-.17.05V262.3c1.75.08,5.21-.59,9.78-4.53ZM57,260a3.55,3.55,0,0,1-.83-.08l-1.48-.49v3.81c-2-1.29-9.29-6.82-11.68-18.82,31.2-.51,48.38,8.06,48.55,8.15l1-2c-.72-.37-17.89-9-50-8.4-1.12-4.65-2.52-13.88.88-16.32L47,224.75c2.18,0,28-.12,48.82,12.25.48,1.34,1.94,6.86-3.19,14-.11.2-11.42,19.71-23.75,17.18l0,.14h0l-.09.14.29-16.15-2,2C62.2,259.28,58.67,260,57,260Zm17.61,15.77c-2,0-4.05-.05-6-.13l.09-4.8a67.5,67.5,0,0,0,10.82,4.81C78,275.75,76.39,275.79,74.62,275.79Zm22.13,2.31c-.42,0-.82,0-1.23,0,.48-.05,1-.09,1.42-.16L96.8,277a90.85,90.85,0,0,0,13.06-.95A50.59,50.59,0,0,1,96.75,278.1Zm31-7a58.55,58.55,0,0,0,10.56,3.15A32.79,32.79,0,0,1,127.72,271.11Zm33.35.65-.39-.13-.37.14s-.56.21-1.5.51a19.76,19.76,0,0,0,2-1.26,60.11,60.11,0,0,0,5.73,2.46C164.46,272.85,162.47,272.23,161.07,271.76Zm15.38,4.66-2.19-.64c1.06.24,2.16.44,3.27.6Zm19.8-3.64q.69-.52,1.32-1.11A5.93,5.93,0,0,1,196.25,272.78ZM197,269l0,0-.64.28.34.07c-3.34,3.42-8,5.16-13.81,5.16-10.61,0-21.54-5.77-21.65-5.83l-.64-.34-.57.44c-3.51,2.68-8.06,4-13.54,4-9.92,0-19.51-4.51-19.61-4.56l-.56-.26-.52.33c-8.8,5.58-22.21,6.42-29.43,6.42-4.32,0-7.26-.29-7.29-.29l-.2,0-.19.05q-1.25.31-2.73.57a61,61,0,0,1-12.85-4.53c10-1.38,18.22-13.12,20.69-17l6.71,3a7.7,7.7,0,0,0,3.41.86,5.39,5.39,0,0,0,2.69-.69c1.6-.93,2.69-2.73,3.28-5.33,6.46,2.82,53.26,22.28,82.32,7.45A11.92,11.92,0,0,1,197,269Zm-23.7-7.35c-1.68.16-3.39.24-5.1.29l1.32-7.33c1.59-.13,3.29-.28,5.05-.48l-1.34,7.51Zm2.27-.27,1.35-7.53c1.51-.19,3.05-.41,4.59-.67l-1.22,7.39C178.76,260.87,177.18,261.14,175.59,261.35Zm10.75-2.51c-1.19.42-2.41.8-3.65,1.13l1.19-7.24c1.35-.26,2.67-.54,4-.86l-1.7,6.91Zm6.23-2.52-.25-.14-.56.29c-1,.54-2,1-3.09,1.46l1.66-6.73a36,36,0,0,0,5.55-2.1Zm-4-7-.08,0v0c-9.8,2.61-23,3.25-27.44,3.39l1.26-4.49a28.65,28.65,0,0,0,6.95.72c5.84,0,15-1.19,28.18-5.93l.25,2.24C195.62,247,192.35,248.33,188.54,249.35Zm6.5-13-.1-1.66,1.47-.3.18,1.59Zm1.9,2.74.2,1.7c-.63.23-1.21.42-1.81.63l-.16-2.76,1.2-.29Zm-2.13-6.7-.1-1.82c.45.08.86.18,1.3.27l.14,1.28Zm-.25-4.28-.16-2.85.95-.22.32,2.85Zm-.29-5.16-.2-3.36.64-.17.38,3.34Zm-.33-5.68-.17-3.08.34-.1.34,3Zm-.31-5.41-.21-3.7h0l.41,3.63Zm5.17,23.51-.46-4a39.37,39.37,0,0,1,3.94,1.2Zm12.18-.67a32.76,32.76,0,0,0-12.91-5.73l-4.68-41.26,31,3.78c.6,1.84,7.6,24.37-1.37,42.62a36.63,36.63,0,0,1-6,8.71A17.64,17.64,0,0,0,211,234.65Zm22.07,15.89L205.33,254a42.11,42.11,0,0,0,15.31-11.87l0,.36c7.69,1.14,10.63,3.53,11.74,5.34A4.65,4.65,0,0,1,233.05,250.54Zm2.1-1.74a7.44,7.44,0,0,0-.85-2.13c-1.87-3.11-6.07-5.22-12.44-6.29a38.26,38.26,0,0,0,3.2-5.3A46.18,46.18,0,0,0,229,223l15.38,4C243.32,230.63,239.53,243.19,235.15,248.8Z"
      />
    </Svg>
  );
}

export default Logotype;
