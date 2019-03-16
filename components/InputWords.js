import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Style from '../style/Style';
export default class InputWords extends React.Component {

    state = {
        palavra1: '',
        palavra2: '',
        palavra3: ''
    }

    confirmWords = () => {
        this.props.changeState({
            showInputWords: false,
            showResults: true,
            results: {
                palavra1: this.state.palavra1,
                palavra2: this.state.palavra2,
                palavra3: this.state.palavra3
            }
        });
    }
    render() {
        return (
            <View>
                <Text style={{ marginVertical: 10 }}>
                    Lembra as 3 palavras?
                </Text>
                <Text>Palavra 1</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginVertical: 10
                    }}
                    value={this.state.palavra1}
                    onChangeText={(palavra1) => this.setState({ palavra1 })}
                />
                <Text>Palavra 2</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginVertical: 10
                    }}
                    value={this.state.palavra2}
                    onChangeText={(palavra2) => this.setState({ palavra2 })}
                />

                <Text>Palavra 3</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginVertical: 10
                    }}
                    value={this.state.palavra3}
                    onChangeText={(palavra3) => this.setState({ palavra3 })}
                />
                <Button
                    onPress={this.confirmWords}
                    title="Conferir palavras"
                    style={Style.btnOk}
                />
            </View>
        )
    }
}