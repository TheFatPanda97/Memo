import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { connect } from "react-redux";
import { TouchableRipple } from "react-native-paper";
import { wsSend as wsSendFn } from "@store/socketSlice";
import FlipCard from "react-native-flip-card-plus";
import car from "@assets/car.png";
import unknown from "@assets/unknown.png";

const CFlipCard = ({ flipped, coord, wsSend }) => {
	const [faceUp, setFaceUp] = useState(flipped);

	useEffect(() => {
		setFaceUp(flipped);
	}, [flipped, setFaceUp]);

	return (
		<FlipCard
			style={{
				margin: 2,
				backgroundColor: "#90a4ae",
				padding: 3,
				borderRadius: 5,
			}}
			friction={10}
			flipHorizontal
			flipVertical={false}
			flip={faceUp}
			pressable={true}
			onPressed={() => {
				if (!faceUp) {
					setFaceUp(!faceUp);
					console.log("isFlipEnd", faceUp, coord);
					wsSend({ type: "move", coord });
				}
			}}
		>
			<Image
				source={unknown}
				resizeMode="contain"
				style={{ width: "100%", height: "100%" }}
			/>

			<Image
				source={car}
				resizeMode="contain"
				style={{ width: "100%", height: "100%" }}
			/>
		</FlipCard>
	);
};

const mapDispatchToProps = (dispatch) => ({
	wsSend: (message) => dispatch(wsSendFn(message)),
});

export default connect(null, mapDispatchToProps)(CFlipCard);
