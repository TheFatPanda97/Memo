import React from "react";
import { connect } from "react-redux";
import { wsConnect as wsConnectFn } from "@store/socketSlice";
import { resetGame as resetGameFn } from "@store/gameStateSlice";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import panda from "@assets/panda.png";
import { Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	title: {
		fontSize: 25,
	},
	image: {
		width: "90%",
		flex: 2,
	},
	btn: {
		margin: 5,
	},
});

const Home = ({ wsConnect, resetGame }) => {
	const { colors } = useTheme();
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Text style={styles.title}>Memo</Text>
			</View>
			<Image source={panda} style={styles.image} resizeMode="contain" />
			<View style={{ flex: 2, justifyContent: "center" }}>
				<Button
					style={styles.btn}
					icon="flag-plus-outline"
					mode="contained"
					color={colors.primary}
					onPress={() => {
						resetGame();
						wsConnect({ host: "ws://10.0.2.2:8001", init: true });
						navigation.navigate("Game");
					}}
					contentStyle={{ height: 50 }}
				>
					Start a Game
				</Button>
				<Button
					style={styles.btn}
					icon="flag-checkered"
					mode="contained"
					color={colors.secondary}
					onPress={() => {
						navigation.navigate("Join");
					}}
					contentStyle={{ height: 50 }}
				>
					Join a Game
				</Button>
			</View>
		</SafeAreaView>
	);
};

const mapStateToDispatch = (dispatch) => ({
	wsConnect: (message) => dispatch(wsConnectFn(message)),
	resetGame: () => dispatch(resetGameFn()),
});

export default connect(null, mapStateToDispatch)(Home);
