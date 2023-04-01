# Town Social App :earth_africa:
The purpose of this application is to make communication between users easier. This product also is having functionalities like map with option to add marker to inform users about your company, accident, or nice location. Another valuable function of this app is creating announcements, like, comment and reply to them.

## :dart: Install Dependencies
Type in console `yarn install`

## :hammer_and_wrench: Commands
To run application type `yarn start` or `yarn expo` \
To build application type:  
* For app file `yarn build`
* Or for apk file `yarn build:apk`

## :test_tube: Tests
To run tests type:
* For unit tests: `yarn test:unit`
* For login as regular user write:
    * In email field: test@wp.pl
    * In password field: 12345678

## :warning: Project Status
Project is still in state of development \
Links to download app: 
* Android: [Link](https://expo.dev/artifacts/eas/e4wem5tjFxLkjZgowDTLPb.apk)
* IOS: None

## 	:telephone_receiver: API
This app is using REST API made in [Nest.js](https://github.com/nestjs/nest) framework. \
Link: [Town Social API](https://github.com/Bezik1/doc-api/) 

## 	:electron: Admin Panel
Data of this application is monitoring by app build by 
[Electron](https://github.com/electron/electron/) \
Link: [Doc Admin Panel](https://github.com/Bezik1/doc-admin-panel/)

# :iphone: App Review
## :derelict_house: Home View
In the home view application fetch announcments from API \
and shows them as posts. Each component has comment section, \
profile image, author, content. If you are author of the post \
you can delete post and as normal user you can like it.


## :world_map: Map section
In this section user can mark the point in the map and add \
description and type of the point. This functionality is for \
share with other users interesting locations or inform them about \
your company center, workplace or traffic jam.

## :gear: Options section
In this view user can edit his email, or profile picture.

## :envelope: Comment section
In the comment section user can add comment to choosen post and \
reply or like other comments within the post. 

<p align="center">
    <img src="/assets/README/home.jpg" width="150" alt="App Home View">
    <img src="/assets/README/map.jpg" width="150" alt="App Map View" />
    <img src="/assets/README/options.jpg" width="150" alt="App Options View" />
    <img src="/assets/README/comment.jpg" width="150" alt="App Options View" />
</p>
