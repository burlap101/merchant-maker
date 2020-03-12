export interface Category {
  _id: string,
  name: string,
  description: string,
  level: number,
  treeSize: number,
  parent?: Category,
  children?: Category
}
