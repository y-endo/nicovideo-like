import React from 'react';

export default function SvgSymbol() {
  return (
    <svg className="svg-symbol">
      <defs>
        <symbol id="icon-play" viewBox="0 0 512 512">
          <path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" />
        </symbol>
        <symbol id="icon-pause" viewBox="0 0 512 512">
          <g>
            <path d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z" />
            <path d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z" />
          </g>
        </symbol>
        <symbol id="icon-skip" viewBox="0 0 48 48">
          <path d="M12 36l17-12-17-12v24zm20-24v24h4V12h-4z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </symbol>
        <symbol id="icon-mute" viewBox="0 0 18 18">
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g fill="#000000" transform="translate(-211.000000, -170.000000)">
              <g transform="translate(211.000000, 170.000000)">
                <path d="M0,6 L0,12 L4,12 L9,17 L9,1 L4,6" />
              </g>
            </g>
          </g>
        </symbol>
        <symbol id="icon-unmute" viewBox="0 0 18 18">
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g fill="#000000" transform="translate(-211.000000, -170.000000)">
              <g transform="translate(211.000000, 170.000000)">
                <path d="M0,6 L0,12 L4,12 L9,17 L9,1 L4,6 L0,6 L0,6 Z M13.5,9 C13.5,7.2 12.5,5.7 11,5 L11,13 C12.5,12.3 13.5,10.8 13.5,9 L13.5,9 Z M11,0.2 L11,2.3 C13.9,3.2 16,5.8 16,9 C16,12.2 13.9,14.8 11,15.7 L11,17.8 C15,16.9 18,13.3 18,9 C18,4.7 15,1.1 11,0.2 L11,0.2 Z" />
              </g>
            </g>
          </g>
        </symbol>
      </defs>
    </svg>
  );
}
