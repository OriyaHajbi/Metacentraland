import React from "react";



function NavBar(props){
    return  <div>
                <nav class="navbar  ">
                    <span class="navbar-brand mb-0 h1">{props.userMail}</span>
                    <span class="navbar-brand mb-0 h1 mynft">my NFT</span>
                    <span class="navbar-brand mb-0 h1 park">Park</span>
                    <span class="navbar-brand mb-0 h1 road">Road</span>
                    <span class="navbar-brand mb-0 h1 nftsale">NFT-for sale</span>
                    <span class="navbar-brand mb-0 h1 nftnotsale">NFT-not for sale</span>
                    <span class="navbar-brand mb-0 h1">Coins: {props.userBalance} <i class="fab fa-btc"></i></span>
                </nav>
            </div>
}




export default NavBar;