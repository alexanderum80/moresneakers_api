const moment = require('moment')

module.exports = () => {
  const raffleIsAlive = (offer)=>{
    if(!offer.raffle)return false;
    const today = moment().utc()
    const q1 = moment(offer.raffleStart).isSameOrBefore(today) 
    const q2 = moment(offer.raffleEnd).isSameOrAfter(today)
    return q1 && q2
  }
  const raffleIsCommingSoon = (offer)=>{
    if(!offer.raffle)return false;
    const today = moment().utc()
    const q1 = moment(offer.raffleStart).isAfter(today) 
    return q1
  }
  const raffleIsClosed = (offer)=>{
    if(!offer.raffle)return false;
    const q1 = !raffleIsCommingSoon(offer)
    const q2 = !raffleIsAlive(offer)
    return q1 && q2;
  }

  const set_release_status = (release) => {
 
    const getStatusOffers = () =>{
      const statusPriority = ['on_sale','available','restock','coming_soon','sold_out']
      const status = [...new Set(release.offers.map(o=>o.status))]
      for(let i=0;i<statusPriority.length;i++){
        const idx = status.findIndex(s=>statusPriority[i]==s)
        if(idx >=0){
          return status[idx]
        }
      }
      return '';
    }
  
    const getStatusOffersRaffle = () => {
      const statusPriority = ['alive','coming_soon','closed']
      let status = release.offers.reduce((p,o)=>{
        if(raffleIsCommingSoon(o))p.push('coming_soon')
        else if(raffleIsAlive(o))p.push('alive')
        else if(raffleIsClosed(o))p.push('closed')
        return p;
      },[])
      status = [...new Set(status)]
      if(status.length){
        for(let i=0;i<statusPriority.length;i++){
          const idx = status.findIndex(s=>statusPriority[i]==s)
          if(idx >=0){
            return status[idx]
          }
        }
      }
      return ''
    }
  
    const hasAnyOfferInMarketplaces = ()=>{
      const s = 'Marketplaces';
      const q = release.offers.findIndex(o=>o.shop?.showOnRegion==s) >= 0;
      return q;
    }
  
    if(release.offers){
      const offerStatus = getStatusOffers()
      release.status = offerStatus
      const offersStatusRaffle = getStatusOffersRaffle()
      const offersHasAnyOfferInMarketplaces = hasAnyOfferInMarketplaces()
      // offers status ['on_sale','available','restock','coming_soon','sold_out'] 
      // raffles status ['alive','coming_soon','closed']
      // sections status ['upcoming','in_stock]
  
      const handlerRaffleWithOfferStatusAndMarketplaces = ()=>{
        if(offersStatusRaffle=='alive'){
          if(['on_sale','available','restock'].includes(offerStatus)){
            release.showIn ={
              section:'in_stock'
            }
          }
          else{
            release.showIn ={
              section:'upcoming'
            }
            if(offerStatus=='sold_out'){
              release.status = 'resell_only'
            }
          }
        }
        else if(offersStatusRaffle=='coming_soon'){
          if(['on_sale','available','restock'].includes(offerStatus)){
            release.showIn ={
              section:'in_stock'
            }
          }
          else{
            release.showIn ={
              section:'upcoming'
            }
          }
        }
        else if(!offersStatusRaffle || offersStatusRaffle=='closed'){
          if(['on_sale','available','restock'].includes(offerStatus)){
            release.showIn ={
              section:'in_stock'
            }
          }
          else if(offerStatus=='coming_soon'){
            release.showIn ={
              section:'upcoming'
            }
          }
          else if(offerStatus=='sold_out'){
            release.status = 'resell_only'
            release.showIn ={
              section:"resell_only"
            }
          }
        }
      }
      const handlerRaffleWithOutOfferStatusAndMarketplaces = ()=>{
        if(['alive','coming_soon'].includes(offersStatusRaffle)){
          release.showIn ={
            section:'upcoming'
          }
        }
        else if(!offersStatusRaffle || offersStatusRaffle=='closed'){
          release.status = 'resell_only';
          release.showIn ={
            section:'resell_only'
          }
        }
      }
      const handlerRaffleWithOfferStatusAndWithoutMarketplaces = ()=>{
        if(['alive','coming_soon'].includes(offersStatusRaffle)){
          release.showIn ={
            section:'in_stock'
          }
          if(offerStatus=='sold_out'){
            release.showIn ={
              section:'upcoming'
            }
          }
        }
        else if(!offersStatusRaffle || offersStatusRaffle=='closed'){
          if(['on_sale','available','restock'].includes(offerStatus)){
            release.showIn={
              section:'in_stock'
            }
          }
          else if(offerStatus=='coming_soon'){
            release.showIn={
              section:'upcoming'
            }
          }
          else {
            release.status = 'sold_out'
            release.showIn ? delete release.showIn : undefined
          }
        }
      }
      const handlerRaffleWithoutOfferStatusAndWithoutMarketplaces = ()=>{
        if(['alive','coming_soon'].includes(offersStatusRaffle)){
          release.showIn={
            section:'upcoming'
          }
        }
        else{
          release.showIn ? delete release.showIn : undefined
        }
      }
      if(!offerStatus && !offersStatusRaffle && !offersHasAnyOfferInMarketplaces){
        release.showIn = {
          page:'release-calendar',
          section:'upcoming'
        }
      }
      else if(offerStatus && offersHasAnyOfferInMarketplaces){
        handlerRaffleWithOfferStatusAndMarketplaces()
      }
      else if(offersHasAnyOfferInMarketplaces){
        handlerRaffleWithOutOfferStatusAndMarketplaces()
      }
      else if(offerStatus){
        handlerRaffleWithOfferStatusAndWithoutMarketplaces()
      }
      else{//not offer status neigther marketplaces
        handlerRaffleWithoutOfferStatusAndWithoutMarketplaces()
      }
    }
    else{
      release.showIn = {
        page:'release-calendar',
        section:'upcoming'
      }
    }
  }
  return set_release_status
}
