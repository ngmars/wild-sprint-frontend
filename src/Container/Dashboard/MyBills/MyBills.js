import * as actions from "../../../store/Actions/Index";
import "./MyBills.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

class MyBills extends Component {
  state = {
    eventNameArr: [],
    changeFundId: null,
    loading: true,
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    this.props.onFetchBills(token);
  }
  render() {

    let Bills = <Spinner />;
    let billsArr = this.props.bills;
    if (this.props.loading === false) {
      let billsArr = this.props.bills;
      console.log("JUST CHECKING", billsArr);
      const len = billsArr.length;
      for (let i = 0; i < len; i++) {
        this.state.eventNameArr.push({
          billId: billsArr[i]._id,
          amount: billsArr[i].amount,
          fundId: billsArr[i].fundId,
          tax: billsArr[i].tax,
          total: billsArr[i].total,
        });
        console.log("EVENT NAME", this.state.eventNameArr);
      }

      Bills = this.state.eventNameArr.map((event) => (        
          <table class="each-bill">
            <tr class="bill-item">
              <td><p>Bill id</p></td>
              <td><p>{event.billId}</p></td>
            </tr>
            <tr class="bill-item">
              <td><p>Beneficiary id</p></td>
              <td><p>{event.fundId}</p></td>
            </tr>
            <tr class="bill-item">
              <td><p>Donated Amount</p></td>
              <td><p>{event.amount}</p></td>
            </tr>
          </table>
      ));
    }

    let TokenExpRedirect = null;
    if (!localStorage.getItem("token")) {
      TokenExpRedirect = <Redirect to="/" />;
    }

    return (
      
      <div className="row-bills">
        <h4 className="title-1 hover-underline-animation"> Your Bills </h4>
        <div className="row">{Bills}</div>
      </div>
    );
  }
}

const mapSignInDispatchToProps = (dispatch) => {
  return {
    onFetchBills: (token) => dispatch(actions.fetchBills(token)),
  };
};
const mapStatetoProps = (state) => {
  console.log("main page", state);
  console.log("loadingState", state.myBills.loading);
  return {
    bills: state.myBills.events,
    loading: state.myBills.loading,
  };
};

export default connect(mapStatetoProps, mapSignInDispatchToProps)(MyBills);
