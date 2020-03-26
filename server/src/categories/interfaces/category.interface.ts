export interface Category {
  _id: string,
  name: string,
  description: string,
  hasParent: boolean,
  children: Category[]
}
