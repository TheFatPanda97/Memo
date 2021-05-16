import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameBoard from "@components/GameBoard";
import RestartBoard from "@components/RestartBoard";
import Settings from "@components/Settings";
import PlayerBar from "@components/PlayerBar";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser1, selectUser2, selectGameOver } from "../store/gameStateSlice";

export default function Game() {
	const navigation = useNavigation();
	const [showSettings, setShowSettings] = useState(false);
	const gameOver = useSelector(selectGameOver);
	const user1 = useSelector(selectUser1);
	const user2 = useSelector(selectUser2);
	const ws = new WebSocket("ws://10.0.2.2:8001");

	ws.onopen = () => {
		ws.send(JSON.stringify({ type: "name", name: user1.name }));
	};

	ws.onmessage = (e) => {
		// a message was received
		console.log(e.data);
	};

	ws.onerror = (e) => {
		// an error occurred
		console.log(e.message);
	};

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
							navigation.dispatch(action);
						},
					},
				]
			);
		});
	}, [navigation]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Settings showSettings={showSettings} setShowSettings={setShowSettings}></Settings>
			<PlayerBar name={user2.name} score={user2.score}></PlayerBar>
			{!gameOver ? <GameBoard></GameBoard> : <RestartBoard></RestartBoard>}
			<PlayerBar
				currPlayer
				name={user1.name}
				score={user1.score}
				setShowSettings={setShowSettings}
			></PlayerBar>
		</SafeAreaView>
	);
}
