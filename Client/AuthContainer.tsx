import * as React from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import {changeFirstName,changeSecondName} from './Store/first/Actions';
class AuthContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return  <Auth firstName={this.props.firstName} secondName={this.props.secondName} changeFirstName={this.props.changeFirstName} changeSecondName={this.props.changeSecondName}/>;


    }
}

const mapStateToProps = state => {
    return {
        firstName: state.first.firstName,
        secondName: state.first.secondName
    };
};
const mapDispatchToProps = {
    changeFirstName,
    changeSecondName
};
export default connect(mapStateToProps,mapDispatchToProps)(AuthContainer);