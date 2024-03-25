import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"

import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
import { Colors } from "./constants/styles"
import AuthContextProvider, { AuthContext } from "./store/auth-context"
import { useContext, useEffect, useState } from "react"
import IconButton from "./components/Ui/IconButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from "expo-splash-screen"

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticate && <AuthStack />}
      {authCtx.isAuthenticate && <AuthenticatedStack />}
    </NavigationContainer>
  )
}
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token") //asyncstorage return a promise so we use fetchtoken fundtion

      if (storedToken) {
        authCtx.authenticate(storedToken)
      }
      setIsTryingLogin(false)
    }
    fetchToken()
  }, [])

  if (isTryingLogin) {
  }

  return <Navigation />
}
export default function App() {
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token") //asyncstorage return a promise so we use fetchtoken fundtion

      if (storedToken) {
      }
    }
    fetchToken()
  }, [])

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  )
}
