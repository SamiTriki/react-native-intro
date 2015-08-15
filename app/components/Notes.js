var React = require('react-native');
var api = require('../utils/api');
var Badge = require('./Badge');
var Separator = require('./helpers/Separator');

var {
    View,
    Text,
    ListView,
    StyleSheet,
    TouchableHighlight,
    TextInput
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10,
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

class Notes extends React.Component {
    constructor(props){
        super(props);

        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.props.notes),
            note: '',
            error: ''
        }
    }
    handleChange(e){
        this.setState({
            note: e.nativeEvent.text
        });
    }
    handleSubmit(){
        var note = this.state.note;
        this.setState({
            note: ''
        })

        api.addNote(this.props.userInfo.login, note)
            .then((data) => {
                api.getNotes(this.props.userInfo.login)
                    .then((data) => {
                        this.setState({
                            dataSource: this.dataSource.cloneWithRows(data)
                        });
                    })
            }).catch((error) => {
                alert('request failed', error);
                this.setState({error}) // ES5 : this.setState({error: error}) shorthand if var are the same name
            });

    }
    renderRow(rowData) {
        return(
            <View>
                <View style={styles.rowContainer}>
                    <Text> {rowData}</Text>
                </View>
                <Separator />
            </View>

        )
    }
    footer(){
        return (
            <View style={styles.footerContainer}>
                <TextInput 
                    style={styles.searchInput}
                    value={this.state.note}
                    onChange={this.handleChange.bind(this)}
                    placeHolder="New Note"
                />
                <TouchableHighlight 
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor='#88D4F5'
                    >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.rowContainer}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={() => <Badge userInfo={this.props.userInfo} /> } 
                />
                    
                {this.footer()}
            </View>
        )
    }
}

Notes.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    notes: React.PropTypes.object.isRequired
}

module.exports = Notes;