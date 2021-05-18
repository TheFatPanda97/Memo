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
import { setUserName } from "@store/gameStateSlice";

const Settings = ({ showSettings, setShowSettings, user1, gameId, setUserNameFn }) => {
	const { colors } = useTheme();
	const navigation = useNavigation();
	const [name, setName] = useState(user1.name);
	console.log(gameId);
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
						<Text style={{ fontSize: 18 }}>Game Code: {gameId}</Text>
						<TextInput
							mode="outlined"
							label="Name"
							value={name}
							onChangeText={(text) => setName(text)}
						/>
						<Button
							style={{ marginTop: 10 }}
							icon="content-save"
							mode="contained"
							color={colors.primary}
							onPress={() => {
								setUserNameFn({ user: 1, name });
								setShowSettings(false);
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
	user1: state.gameState.user1,
	gameId: state.gameState.gameId,
});

const mapDispatchToProps = (dispatch) => ({
	setUserNameFn: (name) => dispatch(setUserName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
