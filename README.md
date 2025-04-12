# A RESTFul API for an uptime monitory application

The appliation allows users to enter URLs they want monitored, and receive alerts when those resources "go down" or "come back up".

### Basic functionality of the API
Users' can sign in and and sign up. Users' can also send and SMS alert to a user, rather than email.

### API Complete Funtionality
1. The API listens on a PORT and accepts incoming HTTP request for POST, GET, PUT, DELETE and HEAD

2. The API allows clients to connect to it, then create a new user, then edit and delete that user.

3. The API allows a user to "sign in" which gives them a token that they can use for subsequent authenticated requests

4. The API allows the users to "sign out" which invalidates their token automatically or the users' can do it themselves.

5. The API allows a signed-in user to use their token to create a new "check" a given url to see if its up <b>(maybe receive a 200 response or anything that is not 500 - server error)</b>or down.

6. The API allows a signed-in user to edit or delete any of their checks.

7. In the background, workers perform all the checks at the appropriate time, and send alerts to the users when a check changes its state from "up" to "down", or vise versa.

<b>NB: The maximum amount of checks the API allows is 6.

Also, the API writes to the filesystem as a key-value store of JSON docs instead of a database.</b>

Third Party API used

1. For sending SMS the twilio API was choosen