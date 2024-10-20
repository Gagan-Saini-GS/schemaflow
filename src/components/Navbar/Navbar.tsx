import React from "react";
import { GrDocumentText } from "react-icons/gr";
import { PiExportBold } from "react-icons/pi";
import SchemaFlowLogo from "../../assets/images/schem_flow_logo-transparent.png";

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
      <div className="flex items-center gap-2">
        <img src={SchemaFlowLogo} alt="Schema Flow Logo" className="w-8 h-8" />
        <div className="text-2xl font-medium text-Blue">Schema Flow</div>
      </div>
      <div className="h-[70%] flex items-center gap-2">
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
