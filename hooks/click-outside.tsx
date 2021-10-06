import { useEffect } from "react";

const useClickOutside = ({ nodeRef, action }) => {
  useEffect(() => {
    // const handler = (event) => {
    //   console.log(nodeRef);
    //   if (nodeRef) {
    //     action();
    //     console.log("click");
    //   } else {
    //     //console.log(event.target);
    //     console.log("no click");
    //   }
    // };
    // document.addEventListener("mousedown", handler);
    // return () => document.removeEventListener("mousedown", handler);
  }, [nodeRef]);
};

export default useClickOutside;
