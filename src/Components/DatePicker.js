// Dependencies
import React, {
  Component,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      minDate: '01-05-2016',
      today: moment(new Date()).format('DD-MM-YYYY'),
    };
  }

  componentDidMount() {
    this.changeDate(this.state.today);
  }

    changeDate = (date) => {
      this.setState({ date });
      this.props.handleDate(date);
    }

    render() {
      return (
        <View>
          <Text style={{ color: 'black' }}>Fecha</Text>
          <DatePicker 
            style={{ width: this.props.width }}
            date={this.state.date}
            mode="date"
            placeholder=""
            format="DD-MM-YYYY"
            minDate={this.state.minDate}
            maxDate={this.state.today}
            confirmBtnText="Ok"
            cancelBtnText="Cancelar"
            showIcon={false}
            customStyles={
              {
                dateInput: {
                  alignItems: 'flex-start',
                  borderWidth: 0,
                  marginLeft: 3,
                },
              }
            }
            onDateChange={(date) => this.changeDate(date)}
          />
        </View>
      );
    }
}

MyDatePicker.defaultProps = {
  width: 200,
};

export default MyDatePicker;
