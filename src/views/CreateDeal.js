import React, { Component } from 'react';
import '../shared/App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class CreateDeal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dealDate: null,
      fields: {},
      formstep: 1,
      errors: {},
      dealname: '',
      dealamount: '',
      invoicefields: {},
      showinvoice: false,
      invoiceamount: '',
      invoicename: '',
      issueddate: null,
      repaymentdate: null
    };
    this.handleErrors = this.handleErrors.bind(this);
    this.formNextstep = this.formNextstep.bind(this);
  }
  submit() {
    this.handleValidation();
  }
  componentWillMount() {
      this.props.onRef(this);
      if (Object.keys(this.props.fields).length === 0 && this.props.fields.constructor === Object) {
        console.log('111');
      }else {
        this.setState({
          fields:this.props.fields,
          dealname: this.props.fields.dealname,
          dealDate: this.props.fields.listingdate,
          dealamount: this.props.fields.dealamount
        });
      }
      if(Object.keys(this.props.invoicefields).length === 0 && this.props.invoicefields.constructor === Object) {
        this.setState({
          invoicefields:this.props.invoicefields,
          showinvoice: false
        });

      }else{
        let invoicefields = this.props.invoicefields;
          if (invoicefields.invoicename || invoicefields.invoiceamount || invoicefields.repaymentdate || invoicefields.issueddate ) {
            console.log(invoicefields);
            if (invoicefields.invoiceamount) {
              this.setState({
                invoiceamount: invoicefields.invoiceamount,
              });
            }
            if (invoicefields.issueddate) {
              this.setState({
                issueddate: invoicefields.issueddate.format().substring(0, 10),
              });
            }
            if (invoicefields.repaymentdate) {
              this.setState({
                repaymentdate: invoicefields.repaymentdate.format().substring(0, 10),
              });
            }
            this.setState({
              invoicefields:invoicefields,
              showinvoice: true,
            });
          }
      }
  }
  formNextstep() {
    this.props.formNextstep(this.state.formstep, this.state.fields, this.state.invoicefields);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  handleErrors() {

    if (Object.keys(this.state.errors).length === 0 && this.state.errors.constructor === Object) {
      this.setState({formstep : 2},this.formNextstep);
    }else {
      console.log('dont proceed');
    }
  }

  handleValidation(){

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields["dealname"] ){
       formIsValid = false;
       errors["dealname"] = "Deal Name Cannot be empty";
    } if (!fields["dealamount"]) {
      formIsValid = false;
      errors["dealamount"] = "Deal Amount Cannot be empty";
    } if (!fields["listingdate"]) {
      formIsValid = false;
      errors["listingdate"] = "Listing Date Cannot be empty";

    }

    if(typeof fields["dealname"] !== "undefined"){
         if(!fields["dealname"].match(/^[a-zA-Z]+$/)){
             formIsValid = false;
             errors["dealname"] = "Invalid Name";
         }
    }
    if (typeof fields["dealamount"] !== "undefined") {

      if(!fields["dealamount"].match(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/)){
          formIsValid = false;
          errors["dealamount"] = "Invalid amount";
      }
    }
   this.setState({  errors: errors},this.handleErrors);
   return formIsValid;

}


  handleChangeinput(field, e){
    if (field === 'dealname') {
      let fields = this.state.fields;
      fields[field] = e.target.value;
      this.setState({
        fields,
        dealname: e.target.value
      });
    }else if (field === 'listingdate') {
      console.log(e.format());
      console.log(e);
      let fields = this.state.fields;
      fields[field] = e;
      this.setState({
        fields,
        dealDate: fields[field]
      });
    }else if (field ==='dealamount') {
      let fields = this.state.fields;
      fields[field] = e.target.value;
      this.setState({
        fields,
        dealamount: e.target.value
      });
    }

     localStorage.setItem('dealdetails', JSON.stringify(this.state.fields));
  }

  render() {
    return (
        <div className={this.state.showinvoice ?"createdeal_parent": "createdeal_parent center" }>
            <div className="createdeal">
                  <h3>CREATE A DEAL</h3>

                  <label>
                    Deal Name *
                    <input ref="dealname" type="text" size="30" value={this.state.dealname}
                    onChange={this.handleChangeinput.bind(this, "dealname")}
                   />
                  {this.state.errors  ? <span className="errorfield">{this.state.errors.dealname}</span> :
                  <span> </span>
                  }
                  </label>

                  <label>
                    Listing Date *
                    <DatePicker
                        maxDate={moment()}
                        dateFormat="YYYY/MM/DD"
                        showDisabledMonthNavigation
                        id="issuedate"
                        readOnly={true}
                        ref="listingdate"
                        selected={this.state.dealDate}
                        onChange={this.handleChangeinput.bind(this, "listingdate")}
                    />
                    {this.state.errors  ? <span className="errorfield">{this.state.errors.listingdate}</span> :
                     <span> </span>
                    }
                  </label>

                  <label>
                    Amount *
                    <input ref="dealamount" type="text" size="30" value={this.state.dealamount}
                    onChange={this.handleChangeinput.bind(this, "dealamount")} />
                    {this.state.errors  ? <span className="errorfield">{this.state.errors.dealamount}</span> :
                    <span> </span>
                    }
                  </label>
            </div>

            {this.state.showinvoice ?
              <div className = "createinvoice_right">
                <h3>VALUES IN INVOICE FORM</h3>
                <label>Issued Date *
                  <p>{this.state.issueddate}</p>
                </label>
                <label>Repayment Date *
                  <p>{this.state.repaymentdate}</p>
                </label>
                <label>Amount *
                  <p>{this.state.invoiceamount}</p>
                </label>
              </div> :
              <span></span>
            }

        </div>

    );
  }
}

export default CreateDeal;
