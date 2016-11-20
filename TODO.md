# Features to add

## Server

https://websockets-chatbot.herokuapp.com

- store conversation under session / date / human-bot / message (in postgres)
- two data types:
	- message
		- you / bot 
	- responses
		- clear
		- add()
		- remove()
		- "" to allow free form

- page to view all conversations: grouped per session, ordered by date/time (from old to new), styled for human-bot

## Client

- show & update responses
- show difference between you & bot / other

## Command line framework

- x = input([1, 2, 3])
- output(...)

## Serverside framework

- use same functions input / output