# GetTam back-end
The back-end security and firebase services for GetTam.

# Security
The back-end security implemented is based on the following principles:
* All requests to the firebase api must be made on the back-end to ensure abstraction to the end-user.
* All api-keys are stored in the process env.
* Unauthorized users are not allowed to access the api.
* Sanity checks are to be made on the data before it is sent to the database, and as it is being processed in the firebase rules.

The main part of back-end security is abstraction to the front-end. This means things such as api-keys, api-requests, and user-data are not exposed to the front-end. The reason for this is to prevent any bozo from looking in the network log and copying the request data to write data that can compromise the database. The second major part of back-end security is sanity checks. Sanity checks usually follow these guidelines:
* Does the data exist?
* Is the data of the right type?
* Is the data of the right length?
* Is the data of the right value?
* Is the data between the correct bounds?
* Is the data formatted correctly?
* Does the data have the right correlation to the current data?

# Author
Created by nekumelon (Caden).