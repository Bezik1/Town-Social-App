import { RouteProp } from "@react-navigation/native";
import { Rang } from ".";
import { AnnouncementsScreenRouteProps } from "../types";

export const TEST_ANNOUNCEMENTS_SCREEN_ROUTE: any = {
    params: {
        announcment: {
            author: 'bezik', 
            comments: [], 
            content: 'test', 
            date: {
                hour: 12,
                day: 26,
                month: 7,
                year: 2000,
            }, 
            likes: [],
            _id: 'testID',
        }
    }
}