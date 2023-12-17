# 335FinalProject

Members: Chris Giang (117937671), Ryan Zheng (117917512), Jordan Maggin (117796230)

Description: Our application mimics a club sign up page along with a filter current members functionality. It uses google oauth to
allow the server to interact with the clients google account. Additionally, we use the Google Places Api to find gyms near the users requested location. 
When a user applies on the website, it stores the users data in Mongo, to be queried later by the user. 

API Link:
we use google oauth as well as google places api
https://developers.google.com/maps/documentation/places/web-service/overview 



Youtube Video:

Database user info (Which is also in .env):
Username: user1
Password: TEpKplKG5rDE662U


to run, run npm i node start
if running locally, use http://localhost:3000/google/callback as callback url, else uncomment other url if in prod