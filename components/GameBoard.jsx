import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Surface } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import CFlipCard from "./CFlipCard";
import { BOARD_WIDTH, BOARD_HEIGHT } from "@utils";

const styles = StyleSheet.create({
	surface: {
		padding: 2,
		alignItems: "center",
		elevation: 4,
		flex: 15,
		margin: 5,
		flexDirection: "column",
	},
	row: {
		flex: 1,
		flexDirection: "row",
	},
});

const GameBoard = ({ board }) => {
	useEffect(() => {
		// console.log("gameBoard", board);
	}, [board]);

	const Board = board.map((row, i) => (
		<View key={i} style={styles.row}>
			{row.map((flipped, j) => (
				<CFlipCard coord={{ row: i, col: j }} flipped={flipped} key={`${i}${j}`} />
			))}
		</View>
	));

	return <Surface style={styles.surface}>{Board}</Surface>;
};

const mapStateToProps = (state) => ({
	board: state.gameState.board,
});

export default connect(mapStateToProps)(GameBoard);
