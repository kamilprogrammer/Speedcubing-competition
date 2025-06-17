import { useEffect, useState } from "react";
import Image from "next/image";
import "./cursor.css";
import cursor from "..//..//..//public/images/cursor.png";
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  interface cursorType {
    clientX: number;
    clientY: number;
  }
  useEffect(() => {
    const move = (e: cursorType) =>
      setPosition({ x: e.clientX + 70, y: e.clientY + 16 });
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div
      className="custom-cursor-wrapper"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible ? 1 : 0,
      }}
    >
      <Image src={cursor} alt={"cursor"} className="custom-cursor-image" />
      <div className="custom-cursor-name font-bold">SpeedCuber</div>
    </div>
  );
};

export default CustomCursor;
