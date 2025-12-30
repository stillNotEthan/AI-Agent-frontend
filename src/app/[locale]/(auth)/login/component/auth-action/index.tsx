import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ForgetPwd from "./forget-pwd";

export type AuthActionState = "login" | "register" | "forget-pwd";

interface Props {
    state: AuthActionState;
    setState: (state: AuthActionState) => void;
}

const AuthAction = ({ state, setState }: Props) => {
    if (state === "login") {
        return <LoginForm setState={setState} />;
    }

    if (state === "register") {
        return <RegisterForm setState={setState} />;
    }

    return <ForgetPwd setState={setState} />;
}

export default AuthAction;