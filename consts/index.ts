import './test-consts'

export const SCREENS_NAMES = [
    'Ogłoszenia',
    'Mapa',
    'Opcje',
    'Zarejestruj',
    'Zaloguj',
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

export enum CoordinateRole {
    Home = 'Dom',
    WorkPlace = 'Miejsce Pracy',
    Pool = 'Basen',
    Accident = 'Wypadek',
    TrafficJam = 'Korek'
}

export const BASIC_API_URL =  /*'http://192.168.1.60:3000' */ 'https://doc-api-tiq6.onrender.com'
export const USERS_URL =  `${BASIC_API_URL}/users`
export const ANNOUNCMENTS_URL = `${BASIC_API_URL}/announcments`
export const COORDINATE_URL = `${BASIC_API_URL}/map`

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
    AddResponse: `${ANNOUNCMENTS_URL}/responseToComment`,
    LikeResponse: `${ANNOUNCMENTS_URL}/likeResponse`,
    DisLikeResponse: `${ANNOUNCMENTS_URL}/disLikeResponse`,
    DeleteResponse: `${ANNOUNCMENTS_URL}/deleteResponse`,
    AddCommentToAnnouncments: `${ANNOUNCMENTS_URL}/addComment`,
    RemoveCommentToAnnouncments: `${ANNOUNCMENTS_URL}/removeComment`,
    GetAllCoordinates: `${COORDINATE_URL}/getAll`,
    CreateCoordinates: `${COORDINATE_URL}/create`
}

export const mapMenuElements = [
    {
        url: require('../assets/company-map.png'),
        mode: CoordinateRole.WorkPlace
    },
    {
        url: require('../assets/home-map.png'),
        mode: CoordinateRole.Home
    },
    {
        url: require('../assets/traffic-jam-map.png'),
        mode: CoordinateRole.TrafficJam
    }
]