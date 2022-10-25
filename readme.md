# Project Setup

Provide aws credential to access s3 bucket in `serverless.yml` file

# Description

### Technologies:
**Technologies used in this Project:**

* **Api Gateway**
> Api Gateway is used for HTTP Rest API routing.



* **AWS Lambda**
> AWS Lambda is used for the main back end. All the request coming from API Gateway is handled by Lambda function. Lambda function is responsible for all the backend logic. It recieves data from api gateway, process the data and send responce through api gateway. It also process authentication request comes from AWS Cognito.



* **AWS Cognito**
>AWS Cognito is used for user authentication. We can manage ful user flow from this service. It also handles multi factor authentication, email/phone verification for us.



* **DynamoDB**
>DynamoDB is a NoSQL document database created by amazon. It is used for storing all sorts of product and order data.



* **Amazon S3**
>Amazon S3 stands for Simple Storage Service. It is a managed storage service by amazon. It is used for storing product image.

* **Amplify**
>Amplify is a modern web application (Like: React JS, Next JS, Vue JS, Angluar JS etc.) hosting service. It is used to host frontend application. It also simplifies ci/cd.

### Application Flow

#### Buyer
> Buyer section is for all users. Anyone can view and order product from this section. From the home page one can add a product to cart. User can also increase product. After adding to cart on the cart page user can view all the products and details. From this section they can add or remove and increase or decrease product quantity. After that they can checkout. But the checkout page is restricted for guest user. If only the user is uthenticated then they can only checkout and confirm order with proper information. For checkout if user is already authenticated then they will redirected to checkout page, if not then they will be redirected to authentication page. From there the can create a new account and if they already have an account then they can log in to existing account.

#### Seller
>For this part administrator will create an account from cognito dashboard. They they can share the credential to to authorized seller. Then the seller should login to the account using the credential. Then they will be forced to change the password. After changing the password they can enter the dashboard. from there they can view the orders made by buyer. By clicking the order id they can view the order details. From there they can make the order status derivered or keep as pending.
>By clicking on products from left sidebar they can view the products page. From there they can view all the products and also delete a product. By clicking Add Product seller can add new product.