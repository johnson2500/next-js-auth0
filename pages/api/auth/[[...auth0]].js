import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

// This is the api we will use with the auth0
export default handleAuth(
    {
        signup: handleLogin({
            authorizationParams: { screen_hint: 'signup'}
        })
    }
)