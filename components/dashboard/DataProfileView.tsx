import { useState, useRef, useEffect } from "react";

export interface DataProfileViewProps {
  children: React.ReactNode;
}

const DataProfileView = ({ children }: DataProfileViewProps) => {
  return (
    <section className="">
      <div className="">{children}</div>
      <div className="">Profile</div>
    </section>
  );
};

export default DataProfileView;
