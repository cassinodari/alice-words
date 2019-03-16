import React from 'react';
import { View, Text, Button } from "react-native";
import Style from '../style/Style';

export default class Results extends React.Component {
    state = {
        result: '',
    }

    componentDidMount() {
        this.props.getData().then((data) => {
            palavrasStorage = data.words
            let resultado = '';
            resultado = palavrasStorage[0] + ' - ' + this.props.state.results.palavra1 + '\n'
            resultado += palavrasStorage[1] + ' - ' + this.props.state.results.palavra2 + '\n'
            resultado += palavrasStorage[2] + ' - ' + this.props.state.results.palavra3
            this.setState({
                result: resultado
            });
        })
    }

    reset = () => {
        this.props.reset()
    }

    render() {
        return (
            <View>
                <Text style={Style.readMorePanelText}>
                    {this.state.result}
                </Text>
                <Button
                    onPress={this.reset}
                    title="Recomeçar">
                </Button>
            </View>
        )
    }
}