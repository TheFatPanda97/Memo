import React, { useState, useEffect } from "react"
import { Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import GameBoard from "../components/GameBoard"
import Settings from "../components/Settings"
import PlayerBar from "../components/PlayerBar"
import { useNavigation } from "@react-navigation/native"

export default function Game() {
	const navigation = useNavigation()
	const [showSettings, setShowSettings] = useState(false)

	useEffect(() => {
		navigation.addListener("beforeRemove", (e) => {
			const action = e.data.action

			e.preventDefault()

			Alert.alert(
				"Leave the Game?",
				"You are in the middle of a game right now, are you sure you want to quit?",
				[
					{ text: "Don't leave", onPress: () => {} },
					{
						text: "Quit",
						onPress: () => {
							setShowSettings(false)
							navigation.dispatch(action)
						},
					},
				]
			)
		})
	}, [navigation])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Settings
				showSettings={showSettings}
				setShowSettings={setShowSettings}
			></Settings>
			<PlayerBar name="PetitPanda" score="1000"></PlayerBar>
			<GameBoard></GameBoard>
			<PlayerBar
				currPlayer
				name="TheFatPanda"
				score="1000"
				setShowSettings={setShowSettings}
			></PlayerBar>
		</SafeAreaView>
	)
}
