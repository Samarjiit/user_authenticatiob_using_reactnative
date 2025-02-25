import { useState } from "react"
import { Alert } from "react-native"
import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/Ui/LoadingOverlay"
import { login } from "../utils/Auth"

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      await login(email, password)
    } catch (error) {
      Alert.Alert(
        "authenticate failed!",
        "could not log u in. please check your credentials!!"
      )
    }
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen
