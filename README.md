#Heart of Gold
<img src = "docs/Images/logo1.png" alt = "Heart of Gold" height = "132" width = "110">

##"Study Buddy"

#Youtube Link (Public)
https://www.youtube.com/playlist?list=PLFlaALYgXUDtSQAKR7yB7z-wPsu5YfQEh

#Our Video Folder (Only visible to Team and Professor)
NOTE: code walkthrough runs slightly long to explain functionality issues
https://drive.google.com/a/umass.edu/folderview?id=0By-iErQArbeoflV0aVVXdEdVb0lFdU5SUWtINFExOTJvaWlOQ3pXamwzWVkwN09rSVpVWmc&usp=sharing_eid

Ammended. NOTE: due to travel complications, as expressed to Tim Richards, I will include an additional overview of the UI/UX/html dev. perspective in a public video link. this video also runs slightly long. thanks, philron.
Overview - UI:UX (StudyBuddy, Philron Hozier)
https://drive.google.com/file/d/0B0a1cb8UdNnWa3ZmaTgtT2ZaaDQ/view?usp=sharing


#Running the Project
> There are scripts (createdb, dropdb) provided in /host/lib/schema which will create and drop the relevant mysql user, database, and tables for you as long as mysql is already installed. Run them using (from the class's standard vagrant environment):
	> sudo apt-get mysql-server
	> mysql -u root -p 'your-password (default blank)' < /lib/schema/create1.sql or drop1.sql
	> make sure you have port 3000 available
	> npm start

#Project Overview
>*Heart of Gold* and "Study Buddy" aim to adapt the idea of the popular social media app Tinder and apply it to finding a compatible study partner. The app will collect personal information and class schedule from users and then offer them matches. If both matches pick each other, they will be able to chat and coordinate study sessions.

#Original Proposal
> Proposing funding and support for our "Study Buddy" app. logo1.png in the /docs/Images folder and proposal.md in the /docs/proposal folder are relevant to our concept and its summary.

#Functional Specification
> The functional specification of our "Study Buddy" app is described breifly in a slideshow provided in PDF Format in the directory docs/fspec/slides
> There is also a markdown document that goes slightly more into detail about the specfic implementation we plan to use for the web application. We have multiple layouts that we may pursue for the actual UI, which we will test and set as neccessary throughout development.
> Git commits will show what work has been contributed by whom, but the functional specification in its entirety is brought to you by team Heart of Gold. We hope you love our product proposal, and we hope to hear from the venture capitalists soon.

# Design Specification
> Our design specification is located in docs/dspec/dspec.md and there is a slideshow component located at docs/dspec/slides.pdf
