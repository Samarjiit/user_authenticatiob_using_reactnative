import { useContext, useState } from "react"
import { Alert } from "react-native"
import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/Ui/LoadingOverlay"
import { createUser } from "../utils/Auth"
import { AuthContext } from "../store/auth-context"
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        "authenticate failed!",
        "could not create users. please check your inputs and try later!!"
      )
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  }

  return <AuthContent onAuthenticate={signupHandler} />
}

export default SignupScreen
