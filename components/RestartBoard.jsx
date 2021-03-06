import React from 'react';
import { Surface, Title, Button, useTheme } from 'react-native-paper';
import { Text, StyleSheet, Image } from 'react-native';
import won from '@assets/won.jpg';
import lost from '@assets/lost.jpg';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { wsSend as wsSendFn } from '@store/socketSlice';

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    flex: 15,
    margin: 5,
    flexDirection: 'column',
  },
});

const RestartBoard = ({ gameWon, gameId, wsSend }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Surface style={styles.surface}>
      <Title style={{ marginBottom: 10 }}>
        {gameWon ? 'Game Over: You won!' : 'Game Over: You lost :('}
      </Title>
      <Image source={gameWon ? won : lost} resizeMode="contain" style={{ height: '50%' }}></Image>
      {gameWon ? (
        <Button
          style={{ marginTop: 10 }}
          contentStyle={{ width: 150 }}
          mode="contained"
          onPress={() => wsSend({ type: 'restart', gameId })}
        >
          Restart
        </Button>
      ) : (
        <Text>Waiting for opponent to restart the game...</Text>
      )}
      <Button
        style={{ marginTop: 10 }}
        contentStyle={{ width: 150 }}
        mode="contained"
        color={colors.error}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        Quit
      </Button>
    </Surface>
  );
};

const mapStateToProps = (state) => ({
  gameWon: state.gameState.gameWon,
  gameId: state.gameState.gameId,
});

const mapDispatchToProps = (dispatch) => ({
  wsSend: (message) => dispatch(wsSendFn(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestartBoard);
