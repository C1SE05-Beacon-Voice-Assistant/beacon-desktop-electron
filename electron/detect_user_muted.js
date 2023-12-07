const loudness = require("loudness");
const detectUserIsMuted =  async () => {
  const userIsMuted = await loudness.getMuted();
  if(userIsMuted) {
     await loudness.setMuted(false)
  }
}
detectUserIsMuted()
module.exports = {
  detectUserIsMuted
}
