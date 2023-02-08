import { StyleSheet, ViewStyle } from "react-native";
import { announcementsHeader, COLORS } from "../consts";

export const basicContainerStyles: ViewStyle = {
    backgroundColor: COLORS.gray,
    width: '100%',
    height: '100%',
}

export const flexCenterStyles: ViewStyle  = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

export const styles = StyleSheet.create({
    home: {
        ...basicContainerStyles
    },
    homeHeader: {
        fontSize: 30,
        fontWeight: "bold",
        color: COLORS.white
    },
    loginView: {
        ...flexCenterStyles,
        flexDirection: 'column',
        ...basicContainerStyles,
    },
    loginLogoView: {
        width: 220,
        height: 200,
        ...flexCenterStyles,
        borderRadius: 100,
    },
    loginLogoText: {
        color: COLORS.white,
        fontSize: 20
    },
    loginRegisterTexts: {
        marginTop: 20,
        ...flexCenterStyles,
    },
    login: {
        width: '85%',
        height: '50%',
        ...flexCenterStyles,
    },
    loginBtn: {
        borderRadius: 50,
        width: '90%',
        height: 60,
        ...flexCenterStyles,
        marginTop: '15%',
        backgroundColor: COLORS.purple
    },
    loginError: {
        width: '60%',
        marginTop: 20,
        textAlign: 'center',
        ...flexCenterStyles,
        height: 100,
        backgroundColor: COLORS.lightRed
    },
    loginErrorText: {
        color: COLORS.white
    },
    loginInpt: {
        width: '75%',
        textAlign: 'center',
        height: 50,
        margin: 5,
        borderRadius: 20,
        color: COLORS.white,
        backgroundColor: COLORS.lightGray
    },
    announcements:{
        backgroundColor: COLORS.gray,
        width: '100%',
        height: '100%',
    },
    navbar: {
        zIndex: 2,
        width: '100%',
        display: "flex",
        alignItems: "flex-end",
        justifyContent: 'center',
        height: 100,
        backgroundColor: COLORS.purple,
        color: COLORS.white
    },
    navbarText: {
        color: COLORS.white,
        fontSize: 20,
    },
    navbarBtns: {
        width: '75%',
        top: '30%',
        position: 'absolute',
        left: '10%',
        ...flexCenterStyles,
        flexDirection: 'column',
        zIndex: 2
    },
    navbarHeaderBtn: {
        color: COLORS.white,
        marginTop: 20,
        fontSize: 25,
    },
    navbarBtn: {
        width: 45,
        height: 45,
        position: 'absolute',
        bottom: -40,
        right: 10,
        fontSize: 25,
        color: COLORS.white,
    },
    navbarLogoView: {
        position: 'absolute',
        left: 10,
        bottom: 8,
        width: 60,
        height: 50,
    },
    announcment:{
        marginTop: 20,
        backgroundColor: COLORS.lightGray,
        width: '100%',
        height: 'auto',
        paddingBottom: 10,
    },
    announcementBack: { 
        ...flexCenterStyles,
        position: 'absolute', 
        bottom: 20, 
        left: 20, 
        width: 50, 
        height: 50,
        borderRadius: 100
    },
    createAnnouncement: {
        marginTop: 40,
        flexDirection: 'column', 
        width: '100%', 
        height: 200,
        backgroundColor: COLORS.lightGray
    },
    createAnnouncementInput: {
        fontSize: 16,
        width: '65%',
        padding: 10,
        color: COLORS.white,
        paddingBottom: '22%',
    },
    announcementComment: {
        marginTop: 20,
        marginLeft: 10,
        backgroundColor: COLORS.gray,
        paddingBottom: 20, 
        width: '95%',
    },
    announcementCommentResponsesView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
    },
    announcementCommentResponseLine: {
        width: 10,
        opacity: 0.75,
        height: '100%',
        marginRight: '5%',
        backgroundColor: COLORS.purple
    },
    announcementCommentResponseLineConnect: {
        width: '10%',
        opacity: 0.75,
        height: 10,
        position: 'absolute',
        left: 10,
        top: '50%',
        backgroundColor: COLORS.purple
    },
    announcementCommentResponse: {
        marginTop: 20,
        marginRight: 10,
        backgroundColor: COLORS.gray,
        paddingBottom: 10, 
        width: '85%',
    },
    addPhotoImage: { 
        width: 50, 
        height: 50, 
        position: 'absolute', 
        right: 0, 
        bottom: 20,
        borderRadius: 100,
        backgroundColor: COLORS.gray,
        borderColor: COLORS.white,
        borderWidth: 1,
        padding: 5
    },
    profileImage: {
        borderRadius: 100, 
        padding: 10
    }
})