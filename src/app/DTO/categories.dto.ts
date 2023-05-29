export interface CategoriesDTO {
  id: number,
  image?: string,
  name: string,
  categories?: CategoriesDTO[]
}
