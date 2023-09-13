const mapOffer = (domain) => {
  if (domain.raffleStart  === undefined) {
    domain.raffleStart = null;
  }
  if (domain.raffleEnd  === undefined) {
    domain.raffleEnd = null;
  }
  if (domain.releaseTime  === undefined) {
    domain.releaseTime = null;
  }
  return domain;
}

module.exports = {
  mapOffer
}
