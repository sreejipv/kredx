import React, { Component } from 'react';
import '../shared/App.css';
import CreateDeal from './CreateDeal.js';
import CreateInvoice from './CreateInvoice.js';
import Icon from 'react-icons-kit';
import { arrowCircleLeft } from 'react-icons-kit/fa/arrowCircleLeft';
import { arrowCircleRight } from 'react-icons-kit/fa/arrowCircleRight';


class FormInvoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formstep: 1,
      fields: {},
      invoicefields: {}

    };
    this.formSubmit = this.formSubmit.bind(this);
    this.formFinalsubmit = this.formFinalsubmit.bind(this);
    this.formPrevious = this.formPrevious.bind(this);
    this.formNextstep = this.formNextstep.bind(this);
  }

  formSubmit(e) {
    this.deal.submit();
    e.preventDefault();
  }

  formFinalsubmit(e) {
    this.invoice.submit();
    e.preventDefault();
  }

  formPrevious(e) {
    this.invoice.previousstep();
    e.preventDefault();
  }

  formNextstep(formstep, fields, invoicefields) {
    console.log(formstep);
    console.log(fields);
    console.log(invoicefields);
      this.setState({
        fields: fields,
        formstep:formstep,
        invoicefields: invoicefields
      })
  }



  render() {
      console.log(this.state.fields);
    return (

        <div className="forminvoice">
          <div className="forminvoice_steps">

            <div className={this.state.formstep === 1? "forminvoice_steps_child active":"forminvoice_steps_child "} >
              <span>Step 1</span>
            </div>

            <div className={this.state.formstep === 2? "forminvoice_steps_child active":"forminvoice_steps_child "} >
              <span>Step 2</span>
            </div>

          </div>
          <form>
              {this.state.formstep === 1 ?
                        <CreateDeal onRef={ref => (this.deal = ref)}
                          fields={this.state.fields}
                          formstep={this.state.formstep}
                          invoicefields={this.state.invoicefields}
                          formNextstep= {this.formNextstep}/>:
                        <CreateInvoice onRef={ref => (this.invoice = ref)}
                          fields={this.state.fields}
                          invoicefields={this.state.invoicefields}
                          formstep={this.state.formstep}
                          formNextstep= {this.formNextstep}/>
                }

                {this.state.formstep === 1 ?
                  <label className="stepone_next_label">
                    <button type="submit" id="stepone_next_submit" className="stepone_next"
                            onClick={this.formSubmit}>
                            Next
                    <Icon className="next_icon" icon={arrowCircleRight} />
                    </button>
                  </label>:
                  <div className="steptwo">
                    <label className="stepone_next_label">
                      <button type="submit" id="stepone_next_submit" className="stepone_next"
                              onClick={this.formPrevious}>
                              Previous
                      </button>
                      <Icon className="next_icon" icon={arrowCircleLeft} />

                    </label>

                    <label className="stepone_next_label">
                      <button type="submit" id="stepone_next_submit" className="stepone_next"
                              onClick={this.formFinalsubmit}>
                              Submit
                      </button>
                    </label>
                  </div>

                }


          </form>
        </div>

    );
  }
}

export default FormInvoice;
