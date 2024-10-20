import { Edge, Node } from "@xyflow/react";
import React, { useEffect, useState } from "react";
import { createNodesFromSchemaInput } from "../../utils/createNodesFromInput";
import { createEdgesFromSchemaInput } from "../../utils/createEdgesFromInput";
import { basicInitialSchema } from "../../data/dbschema";
import { handleExport } from "../../utils/downloadSchemaTextFile";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github_dark";

type T_Sidbar = {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  projectName: string;
  exportSchema: boolean;
  setExportSchema: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<T_Sidbar> = ({
  setNodes,
  setEdges,
  projectName,
  exportSchema,
  setExportSchema,
}) => {
  const [schema, setSchema] = useState<string>(basicInitialSchema);

  const convertSchema = () => {
    const newNodes: Node[] = createNodesFromSchemaInput(schema);
    const newEdges: Edge[] = createEdgesFromSchemaInput(newNodes, schema);

    setNodes(newNodes);
    setEdges(newEdges);
  };

  useEffect(() => {
    if (exportSchema) {
      handleExport(projectName, schema);
      setExportSchema(false);
    }
  }, [exportSchema]);

  return (
    <div className="bg-Black text-White p-2 pb-4 h-full flex flex-col gap-2">
      <div className="w-full h-[95%]">
        <AceEditor
          placeholder="Write your schema here"
          mode="mysql"
          theme="github_dark"
          name="schema-editor"
          onLoad={() => {}}
          onChange={(value) => setSchema(value)}
          fontSize={14}
          lineHeight={18}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={false}
          value={schema}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
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
