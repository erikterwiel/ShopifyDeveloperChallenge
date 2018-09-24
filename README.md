# Shopify Developer Internship Challenge

This project was made for the Shopify Devloper Internship Challenge and was made using Node.js with Express and MongoDB. It fully meets the base requirements of the challenge plus I did some of the extras.
- Basically full CRUD support (see below)
- Added very basic API key security (I know how to further secure using jwt etc but it's 4AM and I need to study for a test tomorrow :/ but this quick and has some security)
- Deployed to a GKE cluster at http://35.232.145.58/ with load balancing and MongoDB support

I am also aware that this API does not scale because the products/orders/lineItems are related to the shop based off of the shop's name instead of id. I did this for the sake of time and simplicity so I don't have to keep copy and pasting ids which tends to get pretty tedious. For this reason, on /shop there is only create and read functionality.

# Table of Contents
- Deployment (#deployment)
- Authorization (#API)

# Deployment
My Dockerfile and yamls are in the repo and here is proof of it running on GKE:
![screenshot from 2018-09-24 03-35-09](https://user-images.githubusercontent.com/29645585/45942033-ced3c580-bfae-11e8-9e0c-2b3fbde9e64a.png)


# API

## Authorization
Very simple authorization, just add the following to your headers when making any request:
```
Authorization: Key 224c560337b54ab4ac6c07eea08b1e20
```

## Endpoints
- /shop
- /product
- /productLI
- /order

## /shop
### GET request Shop

http://35.232.145.58/shop will return
```
[
    {
        "_id": ObjectId,
        "name": String
    }
]
```

http://35.232.145.58/shop?name=shopName will return 
```
{
    "_id": ObjectId,
    "name": String,
    "products": [
        {
            "shopName": String,
            "name": String,
            "price": 1000
            "productLineItems": [
                {
                    "shopName": String,
                    "productName": String,
                    "name": String,
                    "price": Number
                }
            ]
        },
    ],
    "orders": [
        {
            "_id": ObjectId,
            "shopName": String,
            "buyerName": String,
            "orderLineItems": [
                {
                    "name": String,
                    "price": Number
                    "quantity": Number,
                    "productLineItems": [
                        {
                            "name": String,
                            "price": Number,
                            "quantity": Number,
                            "total": Number
                        }
                    ],
                    "total": Number,
                },
            ],
            "total": Number,
        }
    ]
}
```

