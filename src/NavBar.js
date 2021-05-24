import React from 'react';
import styled, {css} from 'styled-components'

import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";

const providerOptions = {
  portis: {
    package: Portis, // required
    options: {
      id: "8e23465f-c9a7-410a-92df-18b2e3d1c38f",
      network: "maticMumbai"
    }
  }
};

let provider = null;
let web3 = null;
let accounts = null;

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});


const Logo = styled.div`
  font-size:1.5em;
`
const ControlButton = styled.div`
  cursor: pointer;
  line-height: 30px;
${props=>props.active && css`
  text-shadow: 0px 0px 60px #03ff03;
`}
`
const NavBar = styled.div`
  margin-bottom:40px;
  display:grid;
  grid-template-columns:180px auto 100px 100px;
`
  
class NavBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address : null,
      btnText : 'Sign In'
    }
  }

  showModal = async () => {
    web3 = await this.connect(web3Modal);
    if (this.state.btnText === 'Sign In') {
      if (!provider) {
      }
  
      if (!accounts) {
        accounts = await web3.eth.getAccounts();
        console.log(accounts)
        this.setState({
          address : `Wallet address: ${accounts[0].toLowerCase()}`,
          btnText : "Signed Out"
        })
        alert("Signed In automatically")
      } else {
        alert("Something went wrong!")
      }
    } else {
      await provider.close();
      await web3Modal.clearCachedProvider();
      provider = null;
    }
  }

  connect = async (web3Modal) => {
    provider = await web3Modal.connect();
    return new Web3(provider);
  }
  render() {
    return <NavBar>
      <Logo>
        CryptoDash
      </Logo>
      <div></div>
        {!this.props.parent.state.firstVisit && this.props.parent.state.favorites && this.props.parent.state.favorites.length >0 &&<ControlButton onClick={()=>{this.props.parent.setState({page:'dashboard'})}} active={this.props.parent.displayingDashboard()}>
        Dashboard
      </ControlButton>}
      <ControlButton onClick={()=>{this.props.parent.setState({page:'settings'})}} active={this.props.parent.displayingSettings()}>
        Settings
      </ControlButton>

      <ControlButton onClick={ () => {
        this.showModal()
      }}>{this.state.btnText}</ControlButton>
      <h5>{this.state.address}</h5>
    </NavBar>
  }
}

export default NavBarComponent;