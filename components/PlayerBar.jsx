import React, { useState } from "react"
import { Surface, Avatar, IconButton } from "react-native-paper"
import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
	surface: {
		padding: 8,
		alignItems: "center",
		elevation: 4,
		flex: 1,
		margin: 5,
		flexDirection: "row",
	},
	avatar: {
		marginRight: 10,
	},
	usernameTxt: {
		fontSize: 17,
	},
	row: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 2,
	},
})

export default function PlayerBar({ currPlayer, name, score, setShowSettings }) {
	return (
		<Surface style={styles.surface}>
			<Avatar.Image style={styles.avatar} size={50}></Avatar.Image>
			<View style={{ flex: 1 }}>
				<Text style={styles.usernameTxt}>{name}</Text>
				<Text>Score: {score}</Text>
			</View>
			{currPlayer && (
				<IconButton
					icon="cog-outline"
					size={30}
					onPress={() => setShowSettings(true)}
				/>
			)}
		</Surface>
	)
}
