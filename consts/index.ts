export const SCREENS_NAMES = [
    'Home',
    'Register',
    'Options',
    'Login',
]

export enum Rang {
    Emergency = 'Emergency',
    Casual = 'Casual',
    Job = 'Job',
    Party = 'Party',
    Help = 'Help',
}

export const IMAGES_URLS = {
    LOGO: require('../assets/logo.svg')
}

export enum COLORS {
    black = '#000',
    lightGray = '#3f4e5a',
    white = '#fff',
    lightRed = '#ff3333',
    purple = '#e600ac',
    darkPurple = '#66004d',
    lightPurple = '#ff66d9',
    gray =  '#323E48'
}

export const USERS_URL = 'http://192.168.1.60:3000/users'
export const ANNOUNCMENTS_URL = 'http://192.168.1.60:3000/announcments'

export const API_URLS = {
    Users: `${USERS_URL}/get`,
    Login: `${USERS_URL}/login`,
    CreateUser: `${USERS_URL}/create`,
    CreateAnnouncment: `${ANNOUNCMENTS_URL}/create`,
    IfLoggined: `${USERS_URL}/ifLoggined`,
    Logout: `${USERS_URL}/logout`,
    AddPhoto: `${USERS_URL}/addPhoto`,
    GetPhoto: `${USERS_URL}/getPhoto`,
    ChangePhoto: `${USERS_URL}/changePhoto`,
    GetAnnouncments: `${ANNOUNCMENTS_URL}/get`,
    LikeAnnouncments: `${ANNOUNCMENTS_URL}/like`,
    DisLikeAnnouncments: `${ANNOUNCMENTS_URL}/disLike`,
    LikeComment: `${ANNOUNCMENTS_URL}/likeComment`,
    DisLikeComment: `${ANNOUNCMENTS_URL}/disLikeComment`,
    AddCommentToAnnouncments: `${ANNOUNCMENTS_URL}/addComment`,
    RemoveCommentToAnnouncments: `${ANNOUNCMENTS_URL}/removeComment`,
}

export const homeHeader = `Witam Polkowiczanie`
export const announcementsHeader = `Ogłoszenia`
