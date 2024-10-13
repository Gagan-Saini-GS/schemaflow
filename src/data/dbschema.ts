import { Node, Edge } from "@xyflow/react";

export const basicInitialSchema = `Table Users{
     id int,
     name string,
     email string,
     password hashcode,
     avatar string,
     bio string,
}

Table Posts{
    id int,
    title string,
    image_url string,
    user_id int > ref Users.id,
}

Table Comments{
    id int,
    content string,
    post_id int > ref Posts.id,
    user_id int > ref Users.id,
}`;

export const expertInitialSchema = `Table Users {
    id int [primary_key],
    name string [50],
    email string [UNIQUE, NOT NULL],
    password string [not null],
    avatar string,
    bio string [250, NOTE="Programmer"],
    status UserStatus,
    created_at Date [DEFAULT="Date.now()"],
    updated_at Date,
}

Table Posts {
  id int [primary_key],
  title string [300],
  type PostType,
  image_url string [500],
  user_id int > ref Users.id,
}

Table Comments{
  id int [primary_key],
  content string [100, NOT NULL],
  user_id int > ref Users.id,
  post_id int > ref Posts.id,
} 

Enum UserStatus{
  online,
  offline,
  available,
  do_not_distrub [Note="DND"],
  on_leave [Note="Holiday"],
}

Enum PostType{
  image,
  video,
  audio,
  article,
}
`;

export const initialNodes: Node[] = [
  {
    id: "Users",
    type: "TableNode",
    data: {
      tableName: "Users",
      columns: [
        { name: "id", type: "int", hasConnection: true },
        { name: "name", type: "string", hasConnection: false },
        { name: "email", type: "string", hasConnection: false },
        { name: "password", type: "hashcode", hasConnection: false },
        { name: "avatar", type: "string", hasConnection: false },
        { name: "bio", type: "string", hasConnection: false },
      ],
    },
    position: { x: 800, y: 300 },
  },
  {
    id: "Posts",
    type: "TableNode",
    data: {
      tableName: "Posts",
      columns: [
        { name: "id", type: "int", hasConnection: true },
        { name: "title", type: "string", hasConnection: false },
        { name: "image_url", type: "string", hasConnection: false },
        { name: "user_id", type: "int", hasConnection: true },
      ],
    },
    position: { x: 500, y: 50 },
  },
  {
    id: "Comments",
    type: "TableNode",
    data: {
      tableName: "Comments",
      columns: [
        { name: "id", type: "int", hasConnection: false },
        { name: "content", type: "string", hasConnection: false },
        { name: "post_id", type: "int", hasConnection: true },
        { name: "user_id", type: "int", hasConnection: true },
      ],
    },
    position: { x: 100, y: 300 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e-Posts-user_id-Users-id",
    source: "Posts",
    target: "Users",
    sourceHandle: "Posts-user_id-source",
    targetHandle: "Users-id-target",
    type: "smoothstep",
    animated: true,
  },
  {
    id: "e-Comments-post_id-Posts-id",
    source: "Comments",
    target: "Posts",
    sourceHandle: "Comments-post_id-source",
    targetHandle: "Posts-id-target",
    type: "smoothstep",
    animated: true,
  },
  {
    id: "e-Comments-user_id-Users-id",
    source: "Comments",
    target: "Users",
    sourceHandle: "Comments-user_id-source",
    targetHandle: "Users-id-target",
    type: "smoothstep",
    animated: true,
  },
];

// All other type of edges
//   { id: "e2-1", source: "2", target: "1", type: "smoothstep", animated: true, label: "user_id", },
//   { id: "e2-1", source: "2", target: "1", type: "step", animated: true, label: "user_id", },
//   { id: "e2-1", source: "2", target: "1", type: "bezier", animated: true, label: "user_id", },
//   { id: "e2-1", source: "2", target: "1", type: "straight", animated: true, label: "user_id", },
