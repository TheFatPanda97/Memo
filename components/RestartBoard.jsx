import React, { useState } from "react"
import { Surface, Avatar, Title, Button, useTheme } from "react-native-paper"
import { Text, View, StyleSheet, Image } from "react-native"
import won from "@assets/won.jpg"
import lost from "@assets/lost.jpg"
import { useSelector, useDispatch } from "react-redux"
import { selectGameWon } from "@store/gameStateSlice"
import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
	surface: {
		padding: 8,
		alignItems: "center",
		justifyContent: "center",
		elevation: 4,
		flex: 15,
		margin: 5,
		flexDirection: "column",
	},
})

export default function RestartBoard() {
	const gameWon = useSelector(selectGameWon)
	const { colors } = useTheme()
	const navigation = useNavigation()

	return (
		<Surface style={styles.surface}>
			<Title style={{ marginBottom: 10 }}>
				{gameWon ? "Game Over: You won!" : "Game Over: You lost :("}
			</Title>
			<Image
				source={gameWon ? won : lost}
				resizeMode="contain"
				style={{ height: "50%" }}
			></Image>
			{gameWon ? (
				<Button
					style={{ marginTop: 10 }}
					contentStyle={{ width: 150 }}
					mode="contained"
				>
					Restart
				</Button>
			) : (
				<Text>Waiting for opponent to restart the game...</Text>
			)}
			<Button
				style={{ marginTop: 10 }}
				contentStyle={{ width: 150 }}
				mode="contained"
				color={colors.error}
				onPress={() => {
					navigation.navigate("Home")
				}}
			>
				Quit
			</Button>
		</Surface>
	)
}
