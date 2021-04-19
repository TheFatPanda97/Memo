import React, { useState } from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import FlipCard from "react-native-flip-card"
import car from "../assets/car.png"
import unknown from "../assets/unknown.png"

export default function CFlipCard() {
	return (
		<FlipCard
			style={{
				margin: 2,
				backgroundColor: "#90a4ae",
				padding: 3,
				borderRadius: 5,
			}}
			friction={10}
			flipHorizontal={true}
			flipVertical={false}
			flip={false}
			clickable={true}
			onFlipEnd={(isFlipEnd) => {
				console.log("isFlipEnd", isFlipEnd)
			}}
		>
			<Image
				source={unknown}
				resizeMode="contain"
				style={{ flex: 1, alignSelf: "center", width: "100%", height: "100%" }}
			/>
			<Image
				source={car}
				resizeMode="contain"
				style={{ flex: 1, alignSelf: "center", width: "100%", height: "100%" }}
			/>
		</FlipCard>
	)
}
