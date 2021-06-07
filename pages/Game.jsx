import React, { useState, useEffect } from "react";
import { Alert, Text } from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import GameBoard from "@components/GameBoard";
import RestartBoard from "@components/RestartBoard";
import Settings from "@components/Settings";
import PlayerBar from "@components/PlayerBar";
import { useNavigation } from "@react-navigation/native";
import { wsDisconnect } from "@store/socketSlice";
import { Dialog, Portal } from "react-native-paper";

const Game = ({
	player1Name,
	player2Name,
	player1Score,
	player2Score,
	gameOver,
	gameId,
	wsDisconnectFn,
	currTurn,
}) => {
	const navigation = useNavigation();
	const [showSettings, setShowSettings] = useState(false);

	useEffect(() => {
		navigation.addListener("beforeRemove", (e) => {
			const action = e.data.action;

			e.preventDefault();

			Alert.alert(
				"Leave the Game?",
				"You are in the middle of a game right now, are you sure you want to quit?",
				[
					{ text: "Don't leave", onPress: () => {} },
					{
						text: "Quit",
						onPress: () => {
							setShowSettings(false);
							wsDisconnectFn();
							navigation.dispatch(action);
						},
					},
				]
			);
		});
	}, [navigation]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Portal>
				<Dialog dismissable={false} visible={player2Name === ""}>
					<Dialog.Content>
						<Text>Waiting for Player 2...</Text>
						<Text>Game Id: {gameId || "Loading ..."}</Text>
					</Dialog.Content>
				</Dialog>
			</Portal>
			<Settings showSettings={showSettings} setShowSettings={setShowSettings}></Settings>
			<PlayerBar
				currTurn={currTurn === null ? currTurn : !currTurn}
				name={player2Name}
				score={player2Score}
			></PlayerBar>
			{!gameOver ? <GameBoard></GameBoard> : <RestartBoard></RestartBoard>}
			<PlayerBar
				currPlayer
				currTurn={currTurn === null ? currTurn : currTurn}
				name={player1Name}
				score={player1Score}
				setShowSettings={setShowSettings}
			></PlayerBar>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	player1Name: state.gameState.player1.name,
	player1Score: state.gameState.player1.score,
	player2Name: state.gameState.player2.name,
	player2Score: state.gameState.player2.score,
	gameId: state.gameState.gameId,
	gameOver: state.gameState.gameOver,
	currTurn: state.gameState.currTurn,
});

const mapDispatchToProps = (dispatch) => ({
	wsDisconnectFn: () => dispatch(wsDisconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
