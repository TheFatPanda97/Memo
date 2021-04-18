import React, { useState } from "react"
import { Surface } from "react-native-paper"
import { View, StyleSheet } from "react-native"
import CFlipCard from "./CFlipCard"

const styles = StyleSheet.create({
	surface: {
		padding: 8,
		alignItems: "center",
		elevation: 4,
		flex: 1,
		margin: 5,
		flexDirection: "row",
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
		<Surface style={{ ...styles.surface, flex: 15, flexDirection: "column" }}>
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
