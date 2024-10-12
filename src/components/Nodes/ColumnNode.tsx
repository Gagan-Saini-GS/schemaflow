import { Handle, Position } from "@xyflow/react";
import React, { useState } from "react";
import { T_Column } from "../../types/tableColumns";
import { FaUnderline } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdDoNotDisturbAlt, MdOutlineKey } from "react-icons/md";
import Tooltip from "../Tooltip/Tooltip";
import { convertToTitleCase } from "../../utils/convertToTitleCase";

type ColumnNodeProps = {
  column: T_Column;
  tableName: string;
};

const ColumnNode: React.FC<ColumnNodeProps> = ({ column, tableName }) => {
  const [showPrimaryKeyTooltip, setShowPrimaryKeyTooltip] =
    useState<boolean>(false);
  const [showColumnNote, setShowColumnNote] = useState<boolean>(false);
  const [showUnderlineConstraint, setShowUnderlineConstraint] =
    useState<boolean>(false);
  const [showNotNullConstraint, setShowNotNullConstraint] =
    useState<boolean>(false);

  return (
    <div className={`flex justify-between items-center p-2 relative`}>
      {column.hasConnection && (
        <>
          <Handle
            id={`${tableName}-${column.name}-target`}
            position={Position.Left}
            type="target"
            className="absolute left-0 top-1/2"
          />
          <Handle
            id={`${tableName}-${column.name}-source`}
            position={Position.Right}
            type="source"
            className="absolute right-0 top-1/2"
          />
        </>
      )}
      <div className="flex items-centers gap-1">
        <div>{column.name}</div>
        <div className="flex items-center gap-1">
          <div
            className="relative cursor-pointer"
            onMouseOver={() => setShowPrimaryKeyTooltip(true)}
            onMouseLeave={() => setShowPrimaryKeyTooltip(false)}
          >
            {column.isPrimaryKey && (
              <MdOutlineKey className="w-4 h-4 text-DarkGray" />
            )}
            {showPrimaryKeyTooltip && (
              <Tooltip text={`Unique Key for ${tableName}`} />
            )}
          </div>

          <div
            className="relative cursor-pointer"
            onMouseOver={() => setShowColumnNote(true)}
            onMouseLeave={() => setShowColumnNote(false)}
          >
            {column.note && (
              <FaRegNoteSticky className="w-4 h-4 text-DarkGray" />
            )}
            {showColumnNote && <Tooltip text={column.note || "Notes"} />}
          </div>
          <div
            className="relative cursor-pointer"
            onMouseOver={() => setShowUnderlineConstraint(true)}
            onMouseLeave={() => setShowUnderlineConstraint(false)}
          >
            {column.constraints?.includes("unique") && (
              <FaUnderline className="w-4 h-4 text-DarkGray" />
            )}
            {showUnderlineConstraint && (
              <Tooltip
                text={`${convertToTitleCase(
                  column.name
                )} must be unique within ${tableName}`}
              />
            )}
          </div>
          <div
            className="relative cursor-pointer"
            onMouseOver={() => setShowNotNullConstraint(true)}
            onMouseLeave={() => setShowNotNullConstraint(false)}
          >
            {column.constraints?.includes("not null") && (
              <MdDoNotDisturbAlt className="w-4 h-4 text-Red/80" />
            )}
            {showNotNullConstraint && (
              <Tooltip
                text={`${convertToTitleCase(
                  column.name
                )} cannot be empty in ${tableName}`}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        {column.type}
        {column.length && ` (${column.length})`}
      </div>
    </div>
  );
};

export default ColumnNode;
