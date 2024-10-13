import React from "react";
import { docs, nodeStyles, symbols } from "../../data/docs";
import { IoClose } from "react-icons/io5";

type T_Docs = {
  openDocs: boolean;
  setOpenDocs: React.Dispatch<React.SetStateAction<boolean>>;
};

const Docs: React.FC<T_Docs> = ({ openDocs, setOpenDocs }) => {
  return (
    <div
      className={`h-full w-[30rem] bg-Black text-Light transition-all duration-300 fixed top-0 z-50 shadow-sm shadow-Light ${
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
          <div className="pt-8">
            <div className="text-xl font-medium pb-2">Node Styles</div>
            <div className="flex flex-col gap-1">
              {nodeStyles.map((node) => {
                return (
                  <div key={node.id} className="flex items-center gap-1">
                    <div
                      className={`${node.boxColor} w-4 h-4 rounded-sm`}
                    ></div>
                    <div>{node.type}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-16 text-right">
            Made by{" "}
            <span className="font-medium italic text-Blue">Gagan Saini</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
