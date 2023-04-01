import { RouteProp } from "@react-navigation/native";
import { Rang } from ".";
import { AnnouncementsScreenRouteProps, Comment } from "../types";

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

export const TEST_COMMENT: Comment = {
    author: 'test_author',
    content: 'test',
    likes: [],
    responses: [
        {
            author: 'test_author2',
            content: 'response',
            likes: [],
            responses: [],
        },
    ],
}