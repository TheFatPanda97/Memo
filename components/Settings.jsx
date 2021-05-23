import React, { useState } from "react";
import {
	Portal,
	Modal,
	Button,
	Divider,
	Surface,
	Title,
	useTheme,
	TextInput,
} from "react-native-paper";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setPlayerName } from "@store/gameStateSlice";
import { wsSend } from "@store/socketSlice";

const Settings = ({
	showSettings,
	setShowSettings,
	player1,
	gameId,
	setPlayerNameFn,
	wsSendFn,
}) => {
	const { colors } = useTheme();
	const navigation = useNavigation();
	const [name, setName] = useState(player1.name);
	const [invalidName, setInvalidName] = useState(false);
	return (
		<Portal>
			<Modal
				visible={showSettings}
				dismissable={true}
				onDismiss={() => setShowSettings(false)}
			>
				<Surface style={{ margin: 20, borderRadius: 5, padding: 10 }}>
					<Title
						style={{
							textAlign: "center",
						}}
					>
						Settings
					</Title>
					<Divider style={{ backgroundColor: "#90a4ae" }}></Divider>
					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 18 }}>Game id: {gameId}</Text>
						<TextInput
							mode="outlined"
							label="Name"
							error={invalidName}
							value={name}
							onChangeText={(text) => {
								setName(text);
								setInvalidName(text === "");
							}}
						/>
						<Button
							style={{ marginTop: 10 }}
							icon="content-save"
							mode="contained"
							color={colors.primary}
							onPress={() => {
								if (!invalidName) {
									wsSendFn({ type: "updateName", name });
									setPlayerNameFn({ player: 1, name });
									setShowSettings(false);
								}
							}}
							contentStyle={{ height: 50 }}
						>
							Save
						</Button>
						<Button
							style={{ marginTop: 10 }}
							icon="close-circle-outline"
							mode="contained"
							color={colors.error}
							onPress={() => navigation.navigate("Home")}
							contentStyle={{ height: 50 }}
						>
							Quit Game
						</Button>
					</View>
				</Surface>
			</Modal>
		</Portal>
	);
};

const mapStateToProps = (state) => ({
	player1: state.gameState.player1,
	gameId: state.gameState.gameId,
});

const mapDispatchToProps = (dispatch) => ({
	setPlayerNameFn: (name) => dispatch(setPlayerName(name)),
	wsSendFn: (message) => dispatch(wsSend(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
