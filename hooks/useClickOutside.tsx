import { useRef, useEffect, useState, RefObject } from "react";

type AnyEvent = MouseEvent | TouchEvent;
interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>;
  handler: (e: AnyEvent) => void;
}

const useClickOutside = (
  ref: UseClickOutsideProps["ref"],
  handler: UseClickOutsideProps["handler"]
) => {
  useEffect(() => {
    const clickOutside = (e: AnyEvent) => {
      const el = ref?.current;

      if (el && !el.contains(e.target as Node)) {
        handler(e);
      }
    };
    window.addEventListener("mousedown", clickOutside);
    window.addEventListener("touchstart", clickOutside);

    return () => {
      window.window.removeEventListener("mousedown", clickOutside);
      window.removeEventListener("touchstart", clickOutside);
    };
  }, [ref, handler]);
};

export default useClickOutside;
