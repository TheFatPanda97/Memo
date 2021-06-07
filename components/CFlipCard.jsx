import React, { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { wsSend as wsSendFn } from "@store/socketSlice";
import {
	flipCard as flipCardFn,
	increaseActiveCard as increaseActiveCardFn,
	decreaseActiveCard as decreaseActiveCardFn,
	setBoardCard as setBoardCardFn,
} from "@store/gameStateSlice";
import FlipCard from "react-native-flip-card-plus";
import car from "@assets/car.png";
import unknown from "@assets/unknown.png";

const CFlipCard = ({
	currTurn,
	flipped,
	coord,
	wsSend,
	flipCard,
	increaseActiveCard,
	decreaseActiveCard,
	setBoardCard,
}) => {
	return (
		<FlipCard
			style={{
				margin: 2,
				backgroundColor: "#90a4ae",
				padding: 3,
				borderRadius: 5,
			}}
			pressableCustomFunc
			useNativeDriver
			friction={10}
			flipHorizontal
			flipVertical={false}
			flip={flipped}
			pressable={currTurn}
			onPressed={() => {
				if (!flipped) {
					flipCard(coord);
					wsSend({ type: "move", coord });
				}
			}}
			onFlipStart={() => {
				increaseActiveCard();
			}}
			onFlipEnd={() => {
				decreaseActiveCard();
				setBoardCard();
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

const mapStateToProps = (state) => ({
	currTurn: state.gameState.currTurn,
});

const mapDispatchToProps = (dispatch) => ({
	wsSend: (message) => dispatch(wsSendFn(message)),
	flipCard: (coord) => dispatch(flipCardFn(coord)),
	increaseActiveCard: () => dispatch(increaseActiveCardFn()),
	decreaseActiveCard: () => dispatch(decreaseActiveCardFn()),
	setBoardCard: () => dispatch(setBoardCardFn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CFlipCard);
