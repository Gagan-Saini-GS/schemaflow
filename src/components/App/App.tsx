import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "../../data/dbschema";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import Docs from "../Docs/Docs";
import TableNode from "../Nodes/TableNode";
import EnumNode from "../Nodes/EnumNode";

const nodeTypes = { TableNode: TableNode, EnumNode: EnumNode };

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [openDocs, setOpenDocs] = useState<boolean>(false);
  const [exportSchema, setExportSchema] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");

  return (
    <div className="w-screen h-screen bg-Black relative">
      <Navbar
        setOpenDocs={setOpenDocs}
        setExportSchema={setExportSchema}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      <div className="h-[94%] flex">
        <div className="w-1/4">
          <Sidebar
            setNodes={setNodes}
            setEdges={setEdges}
            projectName={projectName}
            exportSchema={exportSchema}
            setExportSchema={setExportSchema}
          />
        </div>
        <div className="w-3/4 h-full bg-Black">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            key={`${nodes.length}-${edges.length}`}
          >
            <Background color="#f0f3f6" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
      <Docs openDocs={openDocs} setOpenDocs={setOpenDocs} />
    </div>
  );
};

export default App;
