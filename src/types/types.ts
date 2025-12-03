export type CodeBlock = {
  _id: string;
  uid: string;
  folder_id: string;
  email: string;
  title: string;
  description: string;
  code: string;
  language: string;
  theme: string;
  created_at: number | string;
  updated_at: number | string;
};

export type CodeFolder = {
  _id: string;
  uid: string;
  email: string;
  folder_name: string;
  folder_description: string;
  code_blocks: string[];
  created_at: number | string;
  updated_at: number | string;
};

export type ClientCodeFolderPostType = Omit<
  CodeFolder,
  '_id' | 'created_at' | 'updated_at'
>;
