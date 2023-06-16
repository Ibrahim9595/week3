# Instructions

1. Use the code from previous task to create a new endpoint GET /products?CUR=<currency_code> which will return the same results from last time but the price will be converted according to currency_code passed by the client

2. Create POST /products endpoint which will accept a product, validate it and then call 

[POST] https://api.escuelajs.co/api/v1/products/
# Body
```json
{
  "title": "New Product",
  "price": 10,
  "description": "A description",
  "categoryId": 1,
  "images": ["https://placeimg.com/640/480/any"]
}
```
and return the response to the client 

# Example response 
```json
{
  "title": "New Product",
  "price": 10,
  "description": "A description",
  "images": ["https://placeimg.com/640/480/any"],
  "category": {
    "id": 1,
    "name": "Clothes",
    "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=4278",
    "creationAt": "2023-01-03T15:58:58.000Z",
    "updatedAt": "2023-01-03T15:58:58.000Z"
  },
  "id": 210,
  "creationAt": "2023-01-03T16:51:33.000Z",
  "updatedAt": "2023-01-03T16:51:33.000Z"
}
```