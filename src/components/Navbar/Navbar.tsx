import React from "react";
import { GrDocumentText } from "react-icons/gr";
import { PiExportBold } from "react-icons/pi";

type T_Navbar = {
  setOpenDocs: React.Dispatch<React.SetStateAction<boolean>>;
  setExportSchema: React.Dispatch<React.SetStateAction<boolean>>;
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<T_Navbar> = ({
  setOpenDocs,
  setExportSchema,
  projectName,
  setProjectName,
}) => {
  return (
    <div className="h-[6%] flex justify-between px-2 items-center bg-Light/10 text-Light shadow-md">
      <div className="text-2xl font-medium">Schema Flow</div>
      <div className="h-4/5 flex items-center gap-2">
        <div className="h-full">
          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="h-full p-2 max-w-60 rounded-md bg-Light/20 text-Light outline-none"
          />
        </div>
        <div
          className="flex gap-2 items-center bg-Light/20 p-2 rounded-md h-full cursor-pointer"
          onClick={() => setExportSchema(true)}
        >
          <div>
            <PiExportBold />
          </div>
          <div>Export Schema</div>
        </div>
        <div
          className="flex gap-2 items-center bg-Light/20 p-2 rounded-md h-full cursor-pointer"
          onClick={() => setOpenDocs(true)}
        >
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
