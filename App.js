import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import Logo from './components/Logo';
import Loader from './components/Loader';
import ReadWords from './components/ReadWords';
import TimeCounter from './components/TimeCounter';
import InputWords from './components/InputWords';
import Results from './components/Results';
import { If } from './components/If';

export default class App extends React.Component {

  state = {
    minutesToWait: 0, // tempo ate o usuário informar as palavras
    minutesToShow: 0, // representa quanto tempo falta para exibir as palavras
    showLogo: true,
    showLoader: true,
    showReadWords: false,
    showTimeCounter: false,
    showInputWords: false,
    showResults: false,
    palavra1: '',
    palavra2: '',
    palavra3: '',
    results: ''
  }

  changeState = (newState) => this.setState(newState)

  storeData = async (data) => {
    try {
      await AsyncStorage.setItem('ALICEWORDS', JSON.stringify(data))
    } catch (error) {
      console.log('Erro no storeData');
    }
  }

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('ALICEWORDS')
      return (value !== null) ? JSON.parse(value) : false
    } catch (error) {
      console.log('Erro de getData')
    }
  }

  getEndDate = () => {
    dt = new Date
    dt.setMinutes(dt.getMinutes() + this.state.minutesToWait)
    return dt
  }

  loadWords = async () => {
    fetch('https://alice-words-v1.herokuapp.com/get-words')
      .then((response) => response.json())
      .then((words) => {
        // armazena as palavras no localStorage
        this.storeData({
          generatedAt: new Date,
          showAt: this.getEndDate(),
          words
        });
        // ajusta a visibilidade dos elementos
        this.changeState({
          showLoader: false,
          showReadWords: true,
          showTimeCounter: false,
          showInputWords: false,
          showResults: false,
          palavra1: words[0],
          palavra2: words[1],
          palavra3: words[2]
        })
      })
  }

  componentDidMount() {
    AsyncStorage.removeItem('ALICEWORDS')
    this.getData().then((data) => {
      if (data === false) {
        // significa que ainda nao temos AsyncStorage
        this.loadWords();
      } else {
        // temos AsyncStorage, vamos verificar
        // se o usuário deve informar as palavras
        // ou aguardar mais algum tempo
        // pega a data atual
        let actualDate = new Date;
        // data em que o usuario pode relembrar as palavras
        let showDate = new Date(data.showAt)
        if (actualDate < showDate) {
          // usuario ainda deve aguardar
          this.changeState({
            showLoader: false,
            showTimeCounter: true
          });
        } else {
          // usuario deve informar as palavras
          this.changeState({
            showLoader: false,
            showInputWords: true
          })
        }
      }
    })
  }

  reset = () => {
    AsyncStorage.removeItem('ALICEWORDS').then(() => {
      this.componentDidMount()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <If test={this.state.showLogo}>
          <Logo />
        </If>

        <If test={this.state.showLoader}>
          <Loader />
        </If>

        <If test={this.state.showReadWords}>
          <ReadWords
            changeState={this.changeState}
            state={this.state}
          />
        </If>

        <If test={this.state.showTimeCounter}>
          <TimeCounter
            getData={this.getData}
            changeState={this.changeState}
          />
        </If>

        <If test={this.state.showInputWords}>
          <InputWords
            changeState={this.changeState}
          />
        </If>

        <If test={this.state.showResults}>
          <Results
            changeState={this.changeState}
            state={this.state}
            getData={this.getData}
            reset={this.reset}
          />
        </If>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
