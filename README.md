[![Build Status](https://travis-ci.com/CPSC319-2017w1/ae.s-a-d-b-o-y-s.svg?token=No6Wf7GrzeXsRiivy14y&branch=master)](https://travis-ci.com/CPSC319-2017w1/ae.s-a-d-b-o-y-s)
# Integrated Paper File Management System

### Setup
Ensure you have:
+ npm 2.7+
+ node": "^4.5 || 6.* || >= 7.
+ ember 2.15

Call npm install to install dependencies

### Configuration
#### /app/adapters/application/js
 You will need to change the host url to where the backend is located
 
#### /config/environment.js
Under the production environment section, you will likely need to change the rootURL. Currently, we’re hosting our site as a Tomcat app named ipfms-app, so the rootURL is set to’ /ipfms-app/’

### To build for production:
Call ‘ember build --environment=production’ in the command line
The build can then be found inside /dist/

### To run locally:
Call ‘ember serve’ in the command line
After it boots up, the site can be found at localhost:4200/

