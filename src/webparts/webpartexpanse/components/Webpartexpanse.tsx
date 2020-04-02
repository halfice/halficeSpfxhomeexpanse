import * as React from 'react';
import styles from './Webpartexpanse.module.scss';
import { IWebpartexpanseProps } from './IWebpartexpanseProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Label, TextField, DefaultButton, PrimaryButton } from 'office-ui-fabric-react';

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';


import { default as pnp, ItemAddResult, Web, ConsoleListener } from "sp-pnp-js";


export default class Webpartexpanse extends React.Component<IWebpartexpanseProps, {}> {
  public state: IWebpartexpanseProps;
  constructor(props, context) {
    super(props);
    this.state = {
      description: "",
      Amount: "0",
      siteurl: this.props.siteurl,
      currentMesage: "",
    };
    this.OnchangeRemarks = this.OnchangeRemarks.bind(this);
    this.handleamount = this.handleamount.bind(this);
    this.AddingProject = this.AddingProject.bind(this);
    this.AddingCart = this.AddingCart.bind(this);
  }

  public AddingProject() {
    if (this.state.Amount == "0") {
      alert("Enter Amount!!");
      return;
    }
    var NewISiteUrl = this.props.siteurl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);

    webx.lists.getByTitle("HomeExpanse").items.add({
      Title: this.state.Amount,
      Desc: this.state.description,
      Amount: this.state.Amount
    }).then((iar: ItemAddResult) => {
      alert("Item Added / Succefull!!!")
      this.setState({ description: "", Amount: "0", });
    });
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {
    var NewISiteUrl = this.props.siteurl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);
    var TempMessage = "";
    webx.lists.getByTitle("message").items.filter("ID gt 0").get().then((items: any[]) => {
      if (items.length > 0) {
        TempMessage = items[0].Title;
        this.setState({
          currentMesage: TempMessage
        });
      }
    });
  }

  public addmount(param) {
    var TempAmount = this.state.Amount;
    var Temp3 = parseFloat(TempAmount);
    var newAmount = param;
    var Newtotal = Temp3 + newAmount;
    var strAmount = Newtotal.toString();
    this.setState({ Amount: strAmount });
  }

  public AddingCart() {
  }

  public handleamount(event: any): void {

    this.setState({ Amount: event.target.value });
  }

  public OnchangeRemarks(event: any): void {
    this.setState({ description: event.target.value });
  }



  public render(): React.ReactElement<IWebpartexpanseProps> {

    return (
      <div className={styles.webpartexpanse}>
        <div className={styles.container}>
          <div >
            <div><p><h2>Message:</h2><h5>{this.state.currentMesage}</h5></p></div>
            <hr></hr>
            <div>
              <p><h1>Home Expanse</h1></p>
              <p>
                <h3>Total:{this.state.Amount}</h3>
              </p>
            </div>
            <div>
              <input type="text" id="txtPropkjectName" className={styles.myinput} value={this.state.Amount} onChange={this.handleamount.bind(this)} />

            </div>
            <p>Enter Description:</p>
            <div >


              <textarea value={this.state.description} className={styles.myinputTextArea} onChange={this.OnchangeRemarks.bind(this)} >
                ENTER DESCRIPTION
                        </textarea>



            </div>

            <div>
              <h1> Tap notes</h1>

              <div>
                <DefaultButton text="100" onClick={this.addmount.bind(this, 100)} />
                <PrimaryButton text="200" onClick={this.addmount.bind(this, 200)} />
                <DefaultButton text="300" onClick={this.addmount.bind(this, 300)} />
                <PrimaryButton text="400" onClick={this.addmount.bind(this, 400)} />

              </div>
              <hr></hr>

              <div>
                <DefaultButton text="500" onClick={this.addmount.bind(this, 500)} />
                <PrimaryButton text="600" onClick={this.addmount.bind(this, 600)} />
                <PrimaryButton text="700" onClick={this.addmount.bind(this, 700)} />
                <PrimaryButton text="1000" onClick={this.addmount.bind(this, 1000)} />
              </div>
             
            </div>
            <div className={styles.mydivfooter}  >
              <PrimaryButton text="Submit" onClick={this.AddingProject.bind(this)} />
            </div>
            <hr></hr>
            <div>
<p className={styles.praps}>
  <span> This is the copy right Abdul aziz</span>
</p>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
