import { useContext, useState } from "react"
import { Alert } from "react-native"
import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/Ui/LoadingOverlay"
import { login } from "../utils/Auth"
import { AuthContext } from "../store/auth-context"

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authCtx = useContext(AuthContext)
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await login(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        "authenticate failed!",
        "could not log u in. please check your credentials!!"
      )
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen
