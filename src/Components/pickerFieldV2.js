//Dependencies
import React, { Component } from 'react';

import {
    View,
    Text,
    Picker,
    StyleSheet
} from 'react-native';

class PickerFieldV2 extends Component {

    constructor(props) {
        super(props);
    }


    error() {
        if (this.props.error) {
            return <Text style={styles.error}>{this.props.error}</Text>
        }
    }

    items = () => {
        if(this.props.items) {
            return this.props.items.map(item => {
                return <Picker.Item key={item.id} label={item.name} value={item.id} />
            })
        } else {
            return <Picker.Item label="" value="" />
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.label}>{this.props.label}</Text>
                <View style={this.props.error ? styles.pickerError: null}>
                    <Picker
                        style={[styles.picker, {width: this.props.width}]}
                        selectedValue={this.props.selectedValue}
                        onValueChange={(itemValue, itemIndex) => this.props.onValueChange(itemValue, itemIndex)}
                        prompt="select"
                        mode='dropdown'>
                        {this.items()}
                    </Picker>
                </View>
                {this.error()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    pickerError: {
        borderColor: 'red',
        borderRightWidth: 2
    },
    picker: {
        height: 40,
    },
    input: {
        paddingVertical: 0,
    },
    label: {
        color: '#000'
    },
    error: {
        color: 'red',
        paddingLeft: 5,
        fontSize: 13
    },
});

export default PickerFieldV2;