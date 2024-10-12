import { Edge, Node } from "@xyflow/react";
import React, { useState } from "react";
import { createNodesFromSchemaInput } from "../../utils/createNodesFromInput";
import { createEdgesFromSchemaInput } from "../../utils/createEdgesFromInput";
import { basicInitialSchema, expertInitialSchema } from "../../data/dbschema";

type SidebarProps = {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};

const Sidebar: React.FC<SidebarProps> = ({ setNodes, setEdges }) => {
  const [schema, setSchema] = useState<string>(expertInitialSchema);
  const convertSchema = () => {
    const newNodes: Node[] = createNodesFromSchemaInput(schema);
    const newEdges: Edge[] = createEdgesFromSchemaInput(newNodes, schema);

    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <div className="bg-Black text-White p-2 pb-4 h-full flex flex-col gap-2">
      <div className="w-full h-[95%]">
        <textarea
          className="w-full h-full bg-Light/10 text-Light resize-none rounded-md p-2 outline-none"
          placeholder="Enter your schema here"
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
        ></textarea>
      </div>
      <div className="w-full h-[5%]">
        <button
          onClick={convertSchema}
          className="w-full p-2 rounded bg-Blue text-White font-bold uppercase"
        >
          Convert Schema
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
