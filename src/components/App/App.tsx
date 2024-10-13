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

/**
 * Todo
 * ```````
 * 1. Add a popup show meaning of all symbols (key, U, block, note). ✅
 * 2. Write docs for project. ✅
 * 3. If hovered on the icons then show meaning. ✅
 *    (Title="Primary Key", Content="About Primary key", Title="Note", Content="note written by user").
 *
 * Next Featues
 * ```````````````
 * 1. Allow users to export there schema as .txt file. ✅
 * 2. Add a input in navbar to give project name. (Later I can use same name as file name while exporting schema). ✅
 * 3. Theme change option in navbar.
 * 4. Allow users to use enum as a column type and then define Enum outside table.
 * 5. Seperate source & target handle to show them individually. (Only show which is required, not need to show both all the time when hasConnection is true).
 * 6. Attach UI for building schemas.
 *
 *    Attach backend
 * 7. User own explaination for their schema's (co-workers).
 * 8. Share link for there schema.
 * 9. Live schema share option using Backend (Edit/Read).
 *  */

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
