import * as React from "react"
import { AppRegistry } from "react-native"
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import { name as appName } from "./app.json"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import store from "./store/store"
import { Provider } from "react-redux"
import Home from "./pages/Home"
import Game from "./pages/Game"

const { Navigator, Screen } = createStackNavigator()
const theme = {
	...DefaultTheme,
	roundness: 5,
	colors: {
		...DefaultTheme.colors,
		primary: "#5BC0DE",
		secondary: "#337AB7",
	},
}

export default function App() {
	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<NavigationContainer>
					<Navigator screenOptions={{ headerShown: false }}>
						<Screen name="Home" component={Home} />
						<Screen name="Game" component={Game} />
					</Navigator>
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	)
}

AppRegistry.registerComponent(appName, () => Main)
