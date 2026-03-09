# Architecture

Project Structure

ecommerce-fullstack

backend
frontend

Architecture Pattern

Backend uses layered architecture:

Route → Controller → Service → Database

Backend Layers

Routes
Controllers
Services
Middleware
Validators
Prisma ORM

Database Tables

users
addresses
products
featured_products
carts
cart_items
orders
order_items
refresh_tokens

Authentication Flow

Signup
Create user
Create refresh token
Return access token + refresh token

Login
Validate credentials
Validate refresh token
Generate new tokens

Access token expiry
Client sends refresh token
Server generates new access token

Refresh token expiry
User must login again