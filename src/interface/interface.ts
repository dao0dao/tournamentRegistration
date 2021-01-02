
export interface Environment {
    production: boolean,
    apiKey: string,
    fbUrlSignUp: string,
    fbUrlSendEmailVerify: string,
    fbUrlLogIn: string,
    fbUrlGetUserData: string,
    fbUrlDatabase: string,
    fbUrlResetPassword: string,
    fbUrlDeleteUser: string,
    adminUid: string
}

export interface FbRegister {
    email: string,
    password: string,
    returnSecureToken: true,
}

export interface SignUp {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

export interface EmailVerify {
    requestType: 'VERIFY_EMAIL',
    idToken: string,
}

export interface FbResEmailVer {
    email: string
}

export interface FbLogIn {
    email: string,
    password: string,
    returnSecureToken: true
}

export interface FbResLogin {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}

export interface FbResUserData {
    users: [{
        localId: string,
        email: string,
        emailVerified: boolean,
        displayName: string,
        validSince: string,
        disabled: boolean,
        lastLoginAt: string,
        createdAt: string,
        customAuth: boolean
    }]
}

export interface FbResetPassword {
    requestType: "PASSWORD_RESET",
    email: string
}

export interface FbResPost {
    name: string
}

export interface FbErrors {
    error: {
        error: {
            errors: [
                {
                    domain: string,
                    reason: string,
                    message: string
                }
            ],
            code: number,
            message: string
        }
    }
}

export interface Token {
    idToken: string,
    expiresIn: string
}

export interface User {
    id?: string,
    localId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    status: 'registered' | 'pending' | 'unregistered',
}

export interface Player {
    id?: string,
    localId: string,
    firstName: string,
    lastName: string,
    points?: number,
    round?: number,
    position?: number,
    isPlayed?: boolean,
    canCancel?: boolean
}

export interface Contestant {
    firstName : string,
    lastName : string,
    points : number
}

export interface TournamentResult {
    date: String,
    contestants: Contestant[]
}