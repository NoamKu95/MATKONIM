import React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

const LogoutIcon = () => {
  return (
    <Svg
      width={22}
      height={23}
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_913_17245)">
        <Path
          d="M9.507 17.366v2.496c0 1.023.83 1.852 1.853 1.852h8.008c1.023 0 1.853-.83 1.853-1.852V5.507c0-1.023-.83-1.853-1.853-1.853H11.36c-1.024 0-1.853.83-1.853 1.853v2.496"
          stroke="#14C873"
          strokeWidth={1.22222}
          strokeLinecap="round"
        />
        <Path
          d="M13.902 11.555a.611.611 0 010 1.222v-1.222zM.292 12.598a.611.611 0 010-.864l3.889-3.89a.611.611 0 01.864.865l-3.457 3.457 3.457 3.457a.611.611 0 11-.864.864L.29 12.598zm13.61.18H.724v-1.223h13.178v1.222z"
          fill="#14C873"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_913_17245">
          <Path
            fill="#fff"
            transform="translate(0 .38)"
            d="M0 0H22.0001V22H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LogoutIcon;
