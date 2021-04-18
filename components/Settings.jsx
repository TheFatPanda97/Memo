import React, { useState } from "react"
import {
	Portal,
	Modal,
	Button,
	Divider,
	Surface,
	Title,
	useTheme,
	TextInput,
} from "react-native-paper"
import { View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"


export default function Settings({ showSettings, setShowSettings }) {
	const { colors } = useTheme()
    const navigation = useNavigation()

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
						<Text style={{ fontSize: 18 }}>Game Code: 1234</Text>
						<TextInput mode="outlined" label="Name" />
						<Button
							style={{ marginTop: 10 }}
							icon="content-save"
							mode="contained"
							color={colors.primary}
							onPress={() => setShowSettings(false)}
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
	)
}
