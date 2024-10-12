import React from "react";
import { GrDocumentText } from "react-icons/gr";

type NavbarProps = {
  setOpenDocs: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ setOpenDocs }) => {
  return (
    <div className="h-[6%] flex justify-between px-2 items-center bg-Light/10 text-Light shadow-md">
      <div className="text-2xl font-medium">Schema Flow</div>
      <div
        className="bg-Light/20 p-2 rounded-md h-3/4"
        onClick={() => setOpenDocs(true)}
      >
        <div className="flex gap-2 items-center h-full">
          <div>
            <GrDocumentText />
          </div>
          <div>Docs</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
