import { useState } from "react"
import { Alert } from "react-native"
import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/Ui/LoadingOverlay"
import { createUser } from "../utils/Auth"
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      await createUser(email, password)
    } catch (error) {
      Alert.Alert(
        "authenticate failed!",
        "could not create users. please check your inputs and try later!!"
      )
    }
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  }

  return <AuthContent onAuthenticate={signupHandler} />
}

export default SignupScreen
