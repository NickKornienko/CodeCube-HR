# HRCubicle Web Application
#### Powered by Code Cube <br>
<img width="764" alt="Screenshot 2023-12-14 at 11 12 20 PM" src="https://github.com/NickKornienko/CodeCube-HR/assets/80297074/17ffd4f5-1282-4506-bc10-fa971900ee9e">




## Abstract
HRCubicle is a multifaceted HR application portal, currently implemented for employees to do typical tasks such as viewing timesheets, requesting PTO, and viewing Payments. Furthermore we implemented twitter as our social media integration for teams to actively shoutout eachother and boost social media presence and engagement.

## Installation
### Secrets.json
```
{
  "employees": {
    "ENGINE": "",
    "NAME": "",
    "USER": "",
    "PASSWORD": "",
    "HOST": "",
    "PORT": ""
  },
  "jwtSecret": "",
  "twitter": {
    "appKey": "",
    "appSecret": "",
    "accessToken": "",
    "accessSecret": ""
  },
  "GOOGLE_CLIENT_ID": ""
}
```
Add two secrets.json files to the overall directory (outside backend and hrcube) and one under the hrcube directory.

### Running the React Application
```
## Running the backend
cd backend
npm install ## install neccessary updates/node modules
npm start ## starting the application
```
```
## Running the frontend
cd hrcube
npm install ## install neccessary updates/node modules
npm start ## starting the application
```
<br>
<br>
<br>
<br>




Copyright © 2023 <br>
Kelly Nguyen <br>
Nick Kornienko<br>
Neel Desai<br>
Mansi Vekariya<br>
ALL RIGHTS RESERVED

