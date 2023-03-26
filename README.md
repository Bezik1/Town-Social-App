# Town Social App :earth_africa:
The purpose of this application is to make communication between residents easier. This product also is having functions like map with option to add marker to inform users about your company, accident, or nice location. Another valuable function of this app is creating announcements, like, comment and reply to them.

## :dart: Install Dependencies
Type in console `yarn install`

## :hammer_and_wrench: Commands
To run application type `yarn start` or `yarn expo` \
To build application type:  
* For app file `yarn build`
* Or for apk file `eas build -p android --profile preview`

## :test_tube: Tests
To run tests type:
* For unit tests: `yarn test:unit`

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

## Home View
<img src="/assets/README/home.jpg" width="77vw" alt="App Home View" /> \

In the home view application fetch announcments from API \
and shows them as posts. Each component has comment section, \
profile image, author, content. If you are author of the post \
you can delete post and as normal user you can like it.


## Map section
<img src="/assets/README/map.jpg" width="77vw" alt="App Map View" /> \

In this section user can mark the point in the map and add \
description and type of the point. This functionality is for \
share with other users interesting locations or inform them about \
your company center, workplace or traffic jam.

## Options section
<img src="/assets/README/options.jpg" width="77vw" alt="App Options View" /> \

In this view user can edit his email, or profile picture.

## Comment section
<img src="/assets/README/options.jpg" width="77vw" alt="App Options View" /> \

In the comment section user can add comment to choosen post and \
reply or like other comments within the post. 