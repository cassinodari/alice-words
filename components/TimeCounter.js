import React from 'react'
import { View, Text, Button, BackHandler } from 'react-native'
import Style from '../style/Style'
export default class TimeCounter extends React.Component {
    state = {
        timeToWait: 0,
        showAt: 0
    }
    calcTimeToWait = () => {
        // calcula quantos milisegundos o usuário ainda deve aguardar
        let actualDate = new Date
        let diffMs = this.state.showAt - actualDate
        let tmpTimeToWait = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        // transforma o tempo em minutos
        // 1 dia = 86400000 milisegundos ( 5 zeros )
        // 1 hora = 3600000 ( 5 zeros )
        // 1 minuto = 60000 ( 4 zeros )
        this.setState({ timeToWait: tmpTimeToWait })
        if (tmpTimeToWait < 1) {
            this.props.changeState({
                showTimeCounter: false,
                showInputWords: true
            })

        } else {
            setTimeout(this.calcTimeToWait, 15000);
        }
    }
    componentDidMount() {
        this.props.getData().then((data) => {
            this.setState({ showAt: new Date(data.showAt) });
            this.calcTimeToWait()
        });
    }
    waitTime = () => {
        BackHandler.exitApp();
    }
    render() {
        return (
            <View>
                <Text style={Style.waitText}>
                    Aguarde {this.state.timeToWait} minuto(s)!
                </Text>
                <Button
                    onPress={this.waitTime}
                    title="Ok, vou aguardar!"
                />
            </View>
        )
    }
}
