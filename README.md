# Web Application Overview

## Administrative Area (`/admin` )
- **Product Management**: 
  - Admins can add new products.

- **Custom Parts Creation**: 
  - Admins can create custom parts that can be associated with products.

- **Price Restrictions**: 
  - Ability to set price restrictions for custom parts.

- **Custom Part Restrictions**: 
  - Manage restrictions between different custom parts.

## Shopping Module
- **Product Display**: 
  - Users can view all available products along with their associated custom parts.

- **Cart Functionality**: 
  - Users can add products to their cart, which is managed using cookies rather than being stored in a database.

- **Persistent Cart**: 
  - Items in the cart remain until the user decides to delete them or completes a purchase.

## Payment Module
- **Stripe Integration**: 
  - The application uses Stripe for processing payments during the checkout process
