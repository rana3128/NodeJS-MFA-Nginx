This is demo project for protecting your nginx private route with MFA server (nodejs + express + speakeasy )

clone this repo and run 
$ npm i
$ node server.js


Copy nginx.conf file into your nginx config folder
restart you nginx

open 'http://localhost:5000' in any browser

It will a web page with QR code / secret code for setting up MFA devide
Setup your MFA devices and 

Now copy current MFA code and replace in in blow curl with <mfa-code>. If MFA code is matched then you will see message "Hello from MFA protected API " else 403 unauthrised error msg.

curl --location --request GET 'localhost/private/api' \
--header 'mfatoken: <mfa-code>'
