import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { wsConnect } from "@store/socketSlice";
import { useDispatch } from "react-redux";

const Join = () => {
	const [gameId, setGameId] = useState("");
	const { colors } = useTheme();
	const navigation = useNavigation();
	const dispatch = useDispatch();

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
					dispatch(wsConnect({ host: "ws://10.0.2.2:8001", gameId }));
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

export default Join;
