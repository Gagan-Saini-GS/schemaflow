import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TableNode from "../Nodes/TableNode";
import { initialEdges, initialNodes } from "../../data/dbschema";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { docs, symbols } from "../../data/docs";
import { IoClose } from "react-icons/io5";

const nodeTypes = { TableNode: TableNode };

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
 * 1. Theme change option in navbar.
 * 2. Allow users to use enum as a column type and then define Enum outside table.
 * 3. Allow users to export there schema as .txt file.
 * 4. Add a input in navbar to give project name. (Later I can use same name as file name while exporting schema).
 * 5. Seperate source & target handle to show them individually
 *    (Only show which is required, not need to show both all the time when hasConnection is true).e
 * 6. Attach UI for building schemas.
 *
 *    // Attach backend
 * 6. User own explaination for their schema's (co-workers).
 * 7. Share link for there schema.
 * 8. Live schema share option using Backend (Edit/Read).
 *  */

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [openDocs, setOpenDocs] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen bg-Black relative">
      <Navbar setOpenDocs={setOpenDocs} />
      <div className="h-[94%] flex">
        <div className="w-1/4">
          <Sidebar setNodes={setNodes} setEdges={setEdges} />
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
      <div
        className={`h-full w-[30rem] bg-Black text-Light transition-all duration-300 absolute top-0 z-50 shadow-sm shadow-Light ${
          openDocs ? "right-0" : "-right-full"
        }`}
      >
        <div
          className="p-2 rounded-full bg-Light absolute top-2 -left-4 cursor-pointer flex items-center justify-center"
          onClick={() => setOpenDocs(false)}
        >
          <IoClose className="w-4 h-4 text-Black" />
        </div>
        <div className="w-full h-full p-4 pt-2">
          <div className="h-[5%] font-semibold text-xl px-2 mb-2 border-b border-b-Light/50 sticky top-0">
            Welcome to, Schema Flow!
          </div>
          <div className="h-[95%] overflow-y-scroll py-2">
            <div className="flex flex-col gap-8">
              {docs.map((doc) => {
                return (
                  <div key={doc.id} className="flex flex-col gap-2">
                    <div className="text-xl font-medium">{doc.title}</div>
                    <div className="text-Light/75">
                      {doc.description.map((desc, index) => {
                        return <div key={index}>↳ {desc}</div>;
                      })}
                    </div>
                    <div className="w-full">
                      <div className="mb-0.5">Code</div>
                      <pre className="bg-DarkBlue/20 p-2 rounded-md border-2 border-Light/60 shadow-md shadow-Blue/20 w-full overflow-x-scroll">
                        {doc.code}
                      </pre>
                    </div>
                    <div className="w-full">
                      <div className="mb-0.5">Example</div>
                      <pre className="bg-DarkBlue/20 p-2 rounded-md border-2 border-Light/50 shadow-md shadow-Blue/20 w-full overflow-x-scroll">
                        {doc.example}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-8">
              <div className="text-xl font-medium pb-2">Symbols</div>
              <div className="flex flex-col gap-4">
                {symbols.map((symbol) => {
                  return (
                    <div>
                      <div className="flex items-center gap-1">
                        <div>{symbol.symbol}</div>
                        <div>{symbol.label}</div>
                      </div>
                      <div>↳ {symbol.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-16 text-right">
              Made by{" "}
              <span className="font-medium italic text-Blue">Gagan Saini</span>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
