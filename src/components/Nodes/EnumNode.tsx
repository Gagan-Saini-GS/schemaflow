import React from "react";
import EnumColumnNode from "./EnumColumnNode";
import { Handle, Position } from "@xyflow/react";
import { T_Enum } from "../../types/tableColumns";

type T_EnumNode = {
  data: {
    enumName: string;
    values: T_Enum[];
  };
};

const EnumNode: React.FC<T_EnumNode> = ({ data }) => {
  return (
    <div className="w-64 bg-White shadow-md rounded-md">
      <Handle
        id={`${data.enumName}-Enum-target`}
        position={Position.Top}
        type="target"
        className="absolute top-0 left-1/2"
      />
      <div className="text-lg font-bold bg-Coral text-White text-center py-2 rounded-t-md">
        {data.enumName}
      </div>
      <div>
        {data.values.map((value: T_Enum, index: number) => (
          <div
            key={value.value}
            className={`${index % 2 !== 0 ? "bg-Gray" : "bg-White"} ${
              index === data.values.length - 1
                ? "rounded-b-md"
                : "border-b border-gray-300"
            } hover:bg-Blue/20`}
          >
            <EnumColumnNode value={value.value} note={value.note} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnumNode;
