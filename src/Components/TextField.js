//Dependencies
import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

class TextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textValue: ''
        }
    }

    error() {
        if (this.props.error) {
            return <Text style={styles.error}>{this.props.error}</Text>
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.label}>{this.props.labelName}</Text>
                <TextInput
                    style={[
                        this.props.error ? styles.inputError: null,
                        styles.input,
                        {
                            width: this.props.width,
                            height: this.props.height ?  this.props.height: 40}
                    ]}
                    onChangeText={(value) => {
                        this.props.onChangeText(value);
                        this.setState({textValue: value});
                    }}
                    ref="text"
                    onBlur={() => this.props.onBlur(this.state.textValue)}
                    underlineColorAndroid={this.props.error ? 'red': '#000'}
                    multiline={this.props.multiline}/>
                {this.error()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    error: {
        color: 'red',
        paddingLeft: 5,
        fontSize: 13
    },
    input: {
        height: 40,
        paddingVertical: 0,
    },
    label: {
        color: '#000'
    }
});

export default TextField;