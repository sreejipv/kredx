import React, { Component } from 'react';
import '../shared/App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class EditDeal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: null,
      issueddate: null,
      repaymentdate:null,
      invoicefields: {},
      formstep: 1,
      errors: {},
      dealfields: {}
    };
    this.handleErrors = this.handleErrors.bind(this);
    this.formNextstep = this.formNextstep.bind(this);
    this.formPreviousstep = this.formPreviousstep.bind(this);
  }
  submit() {
    this.handleValidation();
  }

  formPreviousstep() {
    this.props.formNextstep(this.state.formstep, this.state.dealfields, this.state.invoicefields);
  }

  previousstep() {
    this.setState({formstep : 1},this.formPreviousstep);

  }

  componentWillMount() {
      this.props.onRef(this);
      this.setState({
        dealfields: this.props.fields
      })
  }
  formNextstep() {
    console.log(this.state.dealfields);
    this.props.formNextstep(this.state.formstep, this.state.dealfields);
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  handleErrors() {
    if (Object.keys(this.state.errors).length === 0 && this.state.errors.constructor === Object) {
      this.setState({formstep : 2},this.formNextstep);
      console.log('proceed');
    }else {
      console.log('dont proceed');
    }
  }

  handleValidation(){

    let invoicefields = this.state.invoicefields;
    let errors = {};
    let formIsValid = true;

    if(!invoicefields["invoicename"] ){
       formIsValid = false;
       errors["invoicename"] = "Invoice Name Cannot be empty";
    } if (!invoicefields["invoiceamount"]) {
      formIsValid = false;
      errors["invoiceamount"] = "Invoice Amount Cannot be empty";
    } if (!invoicefields["repaymentdate"]) {
      formIsValid = false;
      errors["repaymentdate"] = "Repayment Date Cannot be empty";
    }
    if (!invoicefields["issueddate"]) {
      formIsValid = false;
      errors["issueddate"] = "Issued Date Cannot be empty";
    }
    if(typeof invoicefields["invoicename"] !== "undefined"){
         if(!invoicefields["invoicename"].match(/^[a-zA-Z]+$/)){
             formIsValid = false;
             errors["invoicename"] = "Invalid Name";
         }
    }
    if (this.state.dealfields.listingdate < invoicefields["issueddate"]) {
      console.log('success');
      formIsValid = false;
      errors["issueddate"] = "Issued Date is invalid";
    }
    if (typeof invoicefields["invoiceamount"] !== "undefined") {

      if(!invoicefields["invoiceamount"].match(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/)){
          formIsValid = false;
          errors["invoiceamount"] = "Invalid amount";
      }
    }
   this.setState({  errors: errors},this.handleErrors);
   return formIsValid;

}


  handleChangeinput(field, e){

   if (field === 'repaymentdate' ) {
      let invoicefields = this.state.invoicefields;
      invoicefields[field] = e;
      this.setState({
        invoicefields,
        repaymentdate: invoicefields[field],

      });
    }else if (field === 'issueddate') {
      let invoicefields = this.state.invoicefields;
      invoicefields[field] = e;
      this.setState({
        invoicefields,
        issueddate: invoicefields[field],

      });
    }
    else {
      let invoicefields = this.state.invoicefields;
      invoicefields[field] = e.target.value;
      this.setState({invoicefields});
    }
    console.log(this.state.invoicefields);

  }

  render() {
    return (
        <div>
        <div className="createinvoice">
              <div className = "createinvoice_left">
                <h3>CREATE A DEAL</h3>
                <div className="createdeal">
                      <label>
                        Deal Name *
                        <input ref="dealname" type="text" size="30" value={this.state.dealfields.dealname}
                        onChange={this.handleChangeinput.bind(this, "dealname")}
                       />
                      {this.state.errors  ? <span className="errorfield">{this.state.errors.dealname}</span> : <span> </span> }

                      </label>

                      <label>
                        Date *
                        <DatePicker
                            maxDate={moment()}
                            dateFormat="DD/MM/YYYY"
                            showDisabledMonthNavigation
                            id="issuedate"
                            readOnly={true}
                            ref="listingdate"
                            selected={this.state.dealfields.listingdate}
                            onChange={this.handleChangeinput.bind(this, "listingdate")}
                        />
                        {this.state.errors  ? <span className="errorfield">{this.state.errors.listingdate}</span> : <span> </span> }

                      </label>

                      <label>
                        Amount *
                        <input ref="dealamount" type="text" size="30" value={this.state.dealfields.dealamount}
                        onChange={this.handleChangeinput.bind(this, "dealamount")} />
                        {this.state.errors  ? <span className="errorfield">{this.state.errors.dealamount}</span> : <span> </span> }


                      </label>

                </div>

              </div>

              <div className = "createinvoice_right">
                <h3>VALUES IN INVOICE FORM</h3>
                <label>
                  Issued Date *
                </label>
                <label>
                  Repayment Date *
                </label>
              </div>
        </div>
        </div>

    );
  }
}

export default EditDeal;
