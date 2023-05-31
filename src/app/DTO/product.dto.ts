export interface ProductDTO {
  id: number,
  name: string,
  image: string,
  price: number,
  amount: number
  userAmount?: number,
}

export interface FullProductDTO extends ProductDTO{
  description: string,
  review: CommentDTO[];
}

export interface CommentDTO {
  id: number,
  comment: string
}
