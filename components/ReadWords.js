import React from 'react'
import { View, Text, Button } from 'react-native'
import Style from '../style/Style'

export default class ReadWords extends React.Component {

    changeState = () => {
        this.props.changeState({
            showReadWords: false,
            showTimeCounter: true
        })
    }

    render() {
        return (
            <View>
                <Text style={Style.textCenter}>
                    Memorize as palavras abaixo:
                </Text>
                <Text style={Style.readMorePanelText}>{this.props.state.palavra1}</Text>
                <Text style={Style.readMorePanelText}>{this.props.state.palavra2}</Text>
                <Text style={Style.readMorePanelText}>{this.props.state.palavra3}</Text>
                <Button
                    onPress={this.changeState}
                    title="Memorizei!"
                    style={Style.btnOk}
                />
            </View>
        )
    }
}