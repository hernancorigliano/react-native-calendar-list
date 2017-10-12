/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ExampleA from './ExampleA';
import ExampleB from './ExampleB';
import ExampleC from './ExampleC';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    container2: {
        flex: 1,
    },
    bar: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#fff'
    },
    barButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
    },
    barText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {selected: 2};

        this.changeExample = this.changeExample.bind(this);
    }

    changeExample() {
        switch (this.state.selected) {
            case 0:
                return <ExampleA/>;
            case 1:
                return <ExampleB />;
            case 2:
                return <ExampleC />;
        }
    }

    render() {
        return (
            <View style={[styles.container, {paddingTop: Platform.select({ios: 20, android: 0})}]}>
                <View style={styles.container2}>
                    {this.changeExample()}
                </View>

                <View style={{backgroundColor: 'black'}}>
                    <Text style={styles.barText}>Choose an example</Text>
                    <View style={styles.bar}>
                        <TouchableOpacity style={styles.barButton} onPress={() => this.setState({selected: 0})}>
                            <Text style={styles.barText}>Light</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.barButton} onPress={() => this.setState({selected: 1})}>
                            <Text style={styles.barText}>Dark</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.barButton} onPress={() => this.setState({selected: 2})}>
                            <Text style={styles.barText}>Pastel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
