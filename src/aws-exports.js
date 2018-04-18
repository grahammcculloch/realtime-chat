export default {
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: "ap-southeast-1:b3bd9e60-e721-43d2-a03b-d19f88b9162c",
    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_OB3xtfdaJ",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "bjvff4q5mf2kohk15t4ojrhk8",
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false
    // OPTIONAL - Configuration for cookie storage
    // cookieStorage: {
    // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    // OPTIONAL - Cookie path
    //     path: '/',
    // OPTIONAL - Cookie expiration in days
    //    expires: 365,
    // OPTIONAL - Cookie secure flag
    //    secure: true
    // }
  }
};
