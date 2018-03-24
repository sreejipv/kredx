import React, { Component } from 'react';
import '../shared/App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class CreateInvoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: null,
      issueddate: null,
      repaymentdate:null,
      invoicefields: {},
      formstep: 1,
      errors: {},
      dealfields: {},
      invoicename: '',
      invoiceamount: '',
      successmessage : ''
    };
    this.handleErrors = this.handleErrors.bind(this);
    this.formNextstep = this.formNextstep.bind(this);
    this.formPreviousstep = this.formPreviousstep.bind(this);
  }
  submit() {
    this.handleValidation();
  }

  formPreviousstep() {
    console.log(this.state.dealfields);
    this.props.formNextstep(this.state.formstep, this.state.dealfields, this.state.invoicefields);
  }

  previousstep() {
    this.setState({formstep : 1},this.formPreviousstep);

  }

  componentWillMount() {
      this.props.onRef(this);
      this.setState({
        dealfields: this.props.fields
      });

      if (Object.keys(this.props.invoicefields).length === 0 && this.props.invoicefields.constructor === Object) {
        console.log('111');
        console.log(this.props.invoicefields);
      }else {
        this.setState({
          invoicefields:this.props.invoicefields,
          invoicename:this.props.invoicefields.invoicename,
          invoiceamount:this.props.invoicefields.invoiceamount,
          issueddate:this.props.invoicefields.issueddate,
          repaymentdate:this.props.invoicefields.repaymentdate,
        });
      }
  }
  formNextstep() {
    localStorage.setItem('dealfields', this.state.dealfields);
    localStorage.setItem('invoicedetails', this.state.invoicefields);
    this.props.formNextstep(this.state.formstep, this.state.dealfields);
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  handleErrors() {

    if (Object.keys(this.state.errors).length === 0 && this.state.errors.constructor === Object) {
      this.setState({
        formstep : 2,
        successmessage: 'Successfully submitted'
      },this.formNextstep);

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
      errors["issueddate"] = "Listing date should be greater than Issued date";
    }

    if (this.state.dealfields.dealamount > invoicefields["invoiceamount"]) {
      console.log(this.state.dealfields.dealamount);
      console.log(invoicefields["invoiceamount"]);
      console.log(this.state.dealfields.dealamount);
      console.log('success');
      formIsValid = false;
      errors["invoiceamount"] = "Invoice Amount should be greater than Deal amount";
    }

    if (invoicefields["repaymentdate"] === invoicefields["issueddate"]) {
      console.log('success');
      formIsValid = false;
      errors["repaymentdate"] = "Repayment Date is invalid";
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
    }else if (field === 'invoicename') {
      let invoicefields = this.state.invoicefields;
      invoicefields[field] = e.target.value;
      this.setState({
        invoicefields,
        invoicename: e.target.value
      });
    }else if (field === 'invoiceamount') {
      let invoicefields = this.state.invoicefields;
      invoicefields[field] = e.target.value;
      this.setState({
        invoicefields,
        invoiceamount: e.target.value
      });
    }


    console.log(this.state.invoicefields);

  }

  render() {
    return (
        <div>
          <h3>CREATE AN INVOICE</h3>
        <div className="createinvoice">
        <div className = "createinvoice_left">
              <label>
                Invoice Name *
                <input ref="invoicename" type="text" size="30" value={this.state.invoicename}
                onChange={this.handleChangeinput.bind(this, "invoicename")}
               />
              {this.state.errors  ? <span className="errorfield">{this.state.errors.invoicename}</span> : <span> </span> }

              </label>

              <label>
                Repayment Date *
                <DatePicker
                    minDate={moment()}
                    dateFormat="YYYY/MM/DD"
                    showDisabledMonthNavigation
                    id="repaymentdate"
                    readOnly={true}
                    ref="repaymentdate"
                    selected={this.state.repaymentdate}
                    onChange={this.handleChangeinput.bind(this, "repaymentdate")}
                />
                {this.state.errors  ? <span className="errorfield">{this.state.errors.repaymentdate}</span> : <span> </span> }

              </label>

              </div>

              <div className = "createinvoice_right">

                <label>
                  Issued Date *
                  <DatePicker
                      maxDate={moment()}
                      dateFormat="YYYY/MM/DD"
                      showDisabledMonthNavigation
                      id="issueddate"
                      readOnly={true}
                      ref="issueddate"
                      selected={this.state.issueddate}
                      onChange={this.handleChangeinput.bind(this, "issueddate")}
                  />
                  {this.state.errors  ? <span className="errorfield">{this.state.errors.issueddate}</span> : <span> </span> }

                </label>

                <label>
                  Amount *
                  <input ref="invoiceamount" type="text" size="30" value={this.state.invoiceamount}
                  onChange={this.handleChangeinput.bind(this, "invoiceamount")} />
                  {this.state.errors  ? <span className="errorfield">{this.state.errors.invoiceamount}</span> : <span> </span> }
                </label>
              </div>
        </div>

        {this.state.successmessage ?
          <p className="successmessage">{this.state.successmessage}</p>:
          <span></span>
        }
        </div>

    );
  }
}

export default CreateInvoice;
