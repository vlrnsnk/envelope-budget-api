# Envelope Budget API

This API provides tools for developers to integrate envelope budgeting functionalities into their applications.

**Features:**

* Create, read, update, and delete budget envelopes.
* Track individual envelope balances.
* Implement envelope budgeting principles within your application.

**Technology Stack:**

* Node.js
* Express

**Prerequisites:**

* Familiarity with Node.js and Express.
* Basic understanding of RESTful API concepts.

## Getting Started

1. Clone this repository:

```
git clone https://github.com/vlrnsnk/envelope-budget-api.git
```

2. Install dependencies:

```
npm install
```

3. Run the API server:

```
npm start
```

This will start the server on port 8000 by default. You can access the API documentation at `http://localhost:8000/api-docs` (assuming you're running the server locally).


## API Documentation

This API follows RESTful conventions for endpoints and uses JSON for request and response bodies.
**Supported Endpoints:**

* **Envelopes:**
    * `GET /api/v1/envelopes`: Get a list of all envelopes.
    * `POST /api/v1/envelopes`: Create a new envelope.
    * `GET /api/v1/envelopes/:id`: Get details of a specific envelope.
    * `PUT /api/v1/envelopes/:id`: Update an existing envelope.
    * `DELETE /api/v1/envelopes/:id`: Delete an envelope.
    * `POST /api/v1/envelope/{fromId}/transfer/{toId}`: Transfer money between envelopes.
* **Transactions (planned for future implementation):**
    * Endpoints for managing transactions within envelopes will be added in future versions.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
