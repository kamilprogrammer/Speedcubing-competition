import Image from "next/image";
import React from "react";
import illRightImage from "..//..//..//public/images/ill_right.png";
import illRightSmallImage from "..//..//..//public/images/ill_right_s.png";
import illLeftSmallImage from "..//..//..//public/images/ill_left_s.png";
import illLeftImage from "..//..//..//public/images/ill_left.png";
export default function IllRight(props) {
  console.log(props.small);
  console.log(props.width);
  console.log(props.height);
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-12 mx-auto">
      <div
        className="pointer-events-none absolute bottom-10 mr-12 right-1/2 -z-10  translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      >
        <Image
          className="md:max-w-none"
          src={
            props.right
              ? props.small
                ? illRightSmallImage
                : illRightImage
              : illLeftSmallImage
          }
          width={props.width}
          height={props.height}
          alt="Secondary illustration"
        />
      </div>
    </div>
  );
}
