const { google } = require('googleapis')
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

const CLIENT_EMAIL = process.env.ANALITYCS_CLIENT_EMAIL || 'moresneakers-analytics@morenseakers.iam.gserviceaccount.com'
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0kgLa9tk30aIO\nUp/CXX3zAKdRAR2xT2nun/fnxfTtushPupFy5R/MYO2ScHSjynseUxERGNUC5cq0\niFRjUTiou8HaeZMuXv5kUIgkyFEIzXdhZkQRSV/pvtkVRHH4CX5bvXvbwXwhWzNH\n/jck8Is8+OPMaE0CX1SilZaAvbmYaeKSTdcymkg+Ld6VqAS9eTOTUh5+KvtUOIfM\n/QtUt1MOBb6IvL9vgprIr2WkjO71aaPCmr+PIUXTAECSIjagSQhbEveudSGzGS2r\nEJrVhaOpyY4969ffyX0uiJie0naiJ/9ecdEBpFPKJMLXom83Ua+aElYjy22ynFzl\nXOqAxuCPAgMBAAECggEANwPrkco26V5aGTIMUdxJVQHkeHY2FUFEXbtofTnfg5Tu\nlfgae56anxsDFyRjLUoyU81sPEDMGatopLOKvo3PDP3TtNxovu6bZHXy3P4ZTmzH\njCnr4DZyXhXTLzsg3DkMQihLtetQBhuy1qL6KyuMyMFuKme22tuvvi+EYOotQ2Wu\ngd8MVdTvUCBLcNidXDzqy5hsBmXofZfgvEv29ldj1WLcWC73WZ4HucbawhzirIjN\nO+yEJLy5UJWjoF6zvo9BKcL+n9m/6fh9OPlFi5yFrkdbWyDPzYkcFduIkfZ5ZOMH\nXWzSvBtP1s/fmZdYfLRK8uaqnPTkHnflJpyJrXiNKQKBgQD+9w7IFXoVr5lDnteb\n2aRlmPyGNhOUe9o5vd6aNf3WI/sVt66hO49RCvQZxe/HNylTRR8/ZYYV8GyufwHI\nZdzrXGl3EfjxwwcmWCcg1c0Oafwi4rpsH4SfG8wUtWdw2WkVBSt1+oxlXZIuSrJ3\nvCUlLcHJI7sh182GOWn8rcZuVwKBgQC1TaXDm2ULI3YG2yViMWZxQ4uBQfhnAwgJ\nJRQUTlsZRgj4dYXyjacgvho3B5zySaisLOtkwtr2r/d/+LlweZPoAY0bDzbFmVUS\nm0+0Bwp1orb0ncNZOHI7gWQ4GIi3rM3CO6FyD60qorSw9J7CMNKHs93CXy5uQt/e\nmEkogUxMiQKBgQCenI9DhajXSNAtsukqeTC+S3f8/jMcEhhmB2otwRzSVLvkfMpU\nXzr/DbNhPTO3WOeKd9vCkqPhjhnuS/CN/GB8wpaRjkqyC8Os5PYihR71spU6FpYm\noUzdtms1Dsz09Stb+kVZNa6VeKpxxeJUfmUVRevh9yp5GUkwEROQL4LcLQKBgAPb\nPPVmLsYH4RDQRIFML7OlDiiXsKLwS5F2OnEcIY/uD27JgSnhnXZy1Lfq74mvy2iu\nI+umwWWR5J/SOI+N5nl+3vN+ZVnaoxacOxvHMo/CAEY/vNH/A18Ep48R5oaRpGbH\nQe3dK3/GqjVBXsceprvANa1WvPQXdA+WCahU57yRAoGAUOweNBlMaCPQVSU6Mp+P\nxvYl9OvsvWcKPkZJ+coNcrEs3HSRokgAmthMP4l82VDlO/5inrmGRfFGtlxtHhAb\nC2kxoCsEf+L/3tuW8s53KVpkU009UeKjrThOEXEC16QklEet+GcBEVH5F0X1QyNC\nBF4o4ttjUo3F4ofg9RBFuzA=\n-----END PRIVATE KEY-----\n'

const jwt = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, scopes)

const viewId = '124405241'

async function getData (eventName) {
  await jwt.authorize()
  const result = await google.analytics('v3').data.ga.get({
    'auth': jwt,
    'ids': 'ga:' + viewId,
    'start-date': 'today',
    'end-date': 'today',
    'metrics': 'ga:totalEvents',
    'filters': 'ga:eventAction==' + eventName
  })
  return {
    total: result.data['totalsForAllResults']['ga:totalEvents']
  }
}

module.exports = {
  getData
}
