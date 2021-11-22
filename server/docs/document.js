/**
 * @swagger
 * paths:
 *  /api/auth/signin:
 *    post:
 *      tags:
 *        - Authenticate
 *      summary: Login into app
 *      description: Check password of the user and return access token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - password
 *              properties:
 *                name:
 *                  type: string
 *                  example: user1
 *                password:
 *                  type: string
 *                  example: 123
 *      responses:
 *        200:
 *          description: Signin successful.
 *        401:
 *          description: Invalid password.
 *        404:
 *          description: User not found.
 *
 *  /api/auth/signup:
 *    post:
 *      tags:
 *        - Authenticate
 *      summary: Register a new user
 *      description: Check valid register data and create new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: user1
 *                password:
 *                  type: string
 *                  example: 123
 *      responses:
 *        200:
 *          description: Register successful.
 *        404:
 *          description: User is already exist.
 *
 *  /api/auth:
 *    post:
 *      tags:
 *        - Authenticate
 *      summary: Authenticate a user
 *      description: Authenticate a user and return the access token.
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Register successful.
 *        401:
 *          description: Unauthorized.
 *        403:
 *          description: No token provided.
 */

/**
 * @swagger
 * paths:
 *  /api/cardset:
 *    get:
 *      tags:
 *        - Card Set
 *      summary: Return all cardset
 *      description: Retrieve all cardset in Database
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/cardset/{cardSetId}:
 *    get:
 *      tags:
 *        - Card Set
 *      summary: Return cardset
 *      description: Search by ID and return cardset
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: cardSetId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of Cardset
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/cardset/user/{userId}:
 *    get:
 *      tags:
 *        - Card Set
 *      summary: Return cardset based on user ID
 *      description: Search by user ID and return cardset
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: userId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of user
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 */

/**
 * @swagger
 * paths:
 *  /api/card:
 *    get:
 *      tags:
 *        - Card
 *      summary: Return all card
 *      description: Retrieve all cardset in Database
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/card/todo:
 *    get:
 *      tags:
 *        - Card
 *      summary: Return Todo card
 *      description: Search by cardset Id and return Todo card
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: cardset_id
 *          in: query
 *          description: ID of cardset
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *        404:
 *          description: Card not found
 *        501:
 *          description: Error when executed queries
 *
 *  /api/card/{cardId}:
 *    get:
 *      tags:
 *        - Card
 *      summary: Return card using ID
 *      description: Search by ID and return card
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: cardId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of card
 *      responses:
 *        200:
 *          description: Success
 *        404:
 *          description: Card not found
 *        501:
 *          description: Error when executed queries
 *
 *  /api/card/update/{cardId}:
 *    put:
 *      tags:
 *        - Card
 *      summary: Update card
 *      description: Search by ID and update the card with data in body request
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: cardId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of card
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - index
 *                - title
 *                - cardset_id
 *              properties:
 *                index:
 *                  type: integer
 *                  example: 1
 *                title:
 *                  type: string
 *                  example: In Progress
 *                cardset_id:
 *                  type: string
 *                  example: d057be4b-5200-4eaa-960c-c78da535dcfc
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/card/add:
 *    post:
 *      tags:
 *        - Card
 *      summary: Create new card
 *      description: Create new card with data in request body
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - index
 *                - title
 *                - cardset_id
 *              properties:
 *                index:
 *                  type: integer
 *                  example: 1
 *                title:
 *                  type: string
 *                  example: In Progress
 *                cardset_id:
 *                  type: string
 *                  example: d057be4b-5200-4eaa-960c-c78da535dcfc
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/card/delete/{cardId}:
 *    delete:
 *      tags:
 *        - Card
 *      summary: Delete card
 *      description: Delete card by using ID
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: cardId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of card
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/card/cardset/{cardSetId}:
 *    get:
 *      tags:
 *        - Card
 *      summary: Return card based on cardset ID
 *      description: Search by cardset ID and return all card
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: cardSetId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of cardset
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 */

/**
 * @swagger
 * paths:
 *  /api/task:
 *    get:
 *      tags:
 *        - Task
 *      summary: Return all task
 *      description: Retrieve all task in Database
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/task/add:
 *    post:
 *      tags:
 *        - Task
 *      summary: Create new task
 *      description: Create new task with data in request body
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - index
 *                - name
 *                - card_id
 *              properties:
 *                index:
 *                  type: integer
 *                  example: 0
 *                name:
 *                  type: string
 *                  example: Do homework
 *                card_id:
 *                  type: string
 *                  example: d057be4b-5200-4eaa-960c-c78da535dcfc
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/task/card/{cardId}:
 *    get:
 *      tags:
 *        - Task
 *      summary: Return al tasks based on card ID
 *      description: Search by card ID and return all tasks.
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: cardId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of card
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/task/update/{taskId}:
 *    put:
 *      tags:
 *        - Task
 *      summary: Update task
 *      description: Search by ID and update the task with data in body request
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: taskId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of task
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - index
 *                - name
 *                - card_id
 *              properties:
 *                index:
 *                  type: integer
 *                  example: 0
 *                title:
 *                  type: string
 *                  example: Do homework
 *                card_id:
 *                  type: string
 *                  example: d057be4b-5200-4eaa-960c-c78da535dcfc
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 *
 *  /api/task/delete/{taskId}:
 *    delete:
 *      tags:
 *        - Task
 *      summary: Delete task
 *      description: Delete task by using ID
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *          description: an authorization header
 *          required: true
 *          type: string
 *        - name: taskId
 *          in: path
 *          type: string
 *          required: true
 *          description: ID of task
 *      responses:
 *        200:
 *          description: Success
 *        501:
 *          description: Error when executed queries
 */
