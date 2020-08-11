import {AUTHENTICATION_FAILURE, AUTHENTICATION_REQUEST, AUTHENTICATION_SUCCESS, LOGOUT} from "./types";
import * as jwt from "jsonwebtoken";

const initialState = {
    token: undefined,
    user: undefined,
    isLoggedIn: false,
    error: undefined,
    isLoading: true
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_REQUEST:
            return {
                ...state,
                token: undefined,
                user: undefined,
                isLoggedIn: false,
                error: undefined,
                isLoading: true
            }
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: jwt.verify(action.payload.token, '1cb26f40-498b-4f72-a00a-e8633abc5957'), //TODO: PARSE JWT
                isLoggedIn: true,
                error: undefined,
                isLoading: false
            }
        case AUTHENTICATION_FAILURE:
            return {
                ...state,
                token: undefined,
                user: undefined,
                isLoggedIn: false,
                error: action.payload.error,
                isLoading: false
            }
        case LOGOUT:
            localStorage.removeItem("auth");
            return {
                ...state,
                token: undefined,
                user: undefined,
                isLoggedIn: false,
                error: undefined,
                isLoading: false
            }
        default:
            return state;
    }
}