import GoogleAuthButton from "../GoogleAuthButton/GoogleAuthButton"
import useAuthStore from "../../stores/auth.store"

export function Auth() {


    const authStore = useAuthStore()

    return (
        <div>
            <h2>LogIn with Google</h2>
            <GoogleAuthButton onHandleClick={authStore.googleAuth}/>
        </div>
    );
}
