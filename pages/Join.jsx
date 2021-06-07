import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { wsConnect as wsConnectFn } from "@store/socketSlice";
import { resetGame as resetGameFn } from "@store/gameStateSlice";
import { connect } from "react-redux";

const Join = ({ wsConnect, resetGame }) => {
	const [gameId, setGameId] = useState("");
	const { colors } = useTheme();
	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ justifyContent: "center", flex: 1, padding: 15 }}>
			<TextInput
				mode="outlined"
				label="Game id"
				placeholder="Enter game id..."
				value={gameId}
				onChangeText={(id) => setGameId(id)}
			/>
			<Button
				style={{ marginTop: 15 }}
				icon="flag-checkered"
				mode="contained"
				color={colors.primary}
				onPress={() => {
					resetGame();
					wsConnect({ host: "ws://10.0.2.2:8001", gameId });
					navigation.navigate("Game");
				}}
				contentStyle={{ height: 50 }}
			>
				Join a Game
			</Button>
			<Button
				style={{ marginTop: 10 }}
				icon="arrow-left"
				mode="contained"
				color={colors.error}
				onPress={() => {
					navigation.navigate("Home");
				}}
				contentStyle={{ height: 50 }}
			>
				Back
			</Button>
		</SafeAreaView>
	);
};

const mapDispatchToProps = (dispatch) => ({
	wsConnect: (message) => dispatch(wsConnectFn(message)),
	resetGame: () => dispatch(resetGameFn()),
});

export default connect(null, mapDispatchToProps)(Join);
