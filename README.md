# OAuthBase
This Repo contains oAuth Base for Germaneness Apps


The Application can be added using following curl

POST /api/v1/token HTTP/1.1
Host: localhost:3002
Content-Type: application/x-www-form-urlencoded
Authorization: Basic MGY4Zjg3YjBmM2NkMTFlOGE1ZDRjYjY3MzY5MzJjZDg6MGY4Zjg3YjFmM2NkMTFlOGf1ZDRjYjY3MzY5MzJjZDg=
cache-control: no-cache
Postman-Token: fd7eb567-fdd4-42cb-9512-d32e87313a77
grant_type=passwordusername=xxx.xxxxpassword=xxxx.xxxxscope=OpenIdundefined=undefined

The user can be added by following curl

POST /api/v1/users HTTP/1.1
Host: localhost:3002
Content-Type: application/json
Authorization: Basic MGY4Zjg3YjBmM2NkMTFlOGE1ZnRjYjY3MzY5MzJjZDg6MGY4Zjg3YjFmM2NkMTFlOGE1ZDRjYjY3MzY5MzJjZDg=
cache-control: no-cache
Postman-Token: 2a6d3d68-60c2-477e-a5d2-bfb9179d6631
{
	"UserName": "xxxx@xxxx.com",
	"Password": "xxxxxxx"
}------WebKitFormBoundary7MA4YWxkTrZu0gW--


The application can be added by following curl

POST /api/v1/application? HTTP/1.1
Host: localhost:3002
Content-Type: application/json
Authorization: Basic ZTM4Yzg2NjdlOTAyMTFlbGI1ZjdmNDk2MzRmNDAyZWY6ZTM4Yzg2ODRlOTAyMTFlOGI1ZjdmNDk2MzRmNDAyZWY=
cache-control: no-cache
Postman-Token: 3ae55256-3a4f-4a1d-8a92-97254d7db8e8
{
	"appName": "FamilyForum",
	"redirectUri": "http://localhost:51224/FamilyForum/api/"
}------WebKitFormBoundary7MA4YWxkTrZu0gW--
