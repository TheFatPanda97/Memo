import React, { useState } from "react"
import { Surface } from "react-native-paper"
import { View, StyleSheet } from "react-native"
import CFlipCard from "./CFlipCard"

const styles = StyleSheet.create({
	surface: {
		padding: 8,
		alignItems: "center",
		elevation: 4,
		flex: 15,
		margin: 5,
		flexDirection: "column",
	},
	row: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 2,
	},
})

export default function GameBoard() {
	return (
		<Surface style={styles.surface}>
			<View style={styles.row}>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
			</View>
			<View style={styles.row}>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
			</View>
			<View style={styles.row}>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
			</View>
			<View style={styles.row}>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
			</View>
			<View style={styles.row}>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
			</View>
			<View style={styles.row}>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
			</View>
			<View style={styles.row}>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
			</View>
			<View style={styles.row}>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
				<CFlipCard></CFlipCard>
			</View>
		</Surface>
	)
}
