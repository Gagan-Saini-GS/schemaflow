import React, { useState } from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import Tooltip from "../Tooltip/Tooltip";

type T_EnumColumn = {
  value: string;
  note?: string;
};

const EnumColumnNode: React.FC<T_EnumColumn> = ({ value, note }) => {
  const [showEnumNote, setShowEnumNote] = useState<boolean>(false);
  return (
    <div className="flex justify-between items-center p-2 relative">
      <div>{value}</div>
      <div
        className="relative cursor-pointer"
        onMouseOver={() => setShowEnumNote(true)}
        onMouseLeave={() => setShowEnumNote(false)}
      >
        {note && <FaRegNoteSticky className="w-4 h-4 text-DarkGray" />}
        {showEnumNote && <Tooltip text={note || "Notes"} />}
      </div>
    </div>
  );
};

export default EnumColumnNode;
