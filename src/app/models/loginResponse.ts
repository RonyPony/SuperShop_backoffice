export interface LoginResponse {
    result:     Result;
    token:      string;
    expiration: Date;
}

export interface Result {
    isSuccess: boolean;
    message:   string;
    exception: null;
    data:      null;
}
