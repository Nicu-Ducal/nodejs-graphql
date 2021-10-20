const fetch = require("node-fetch")

const url = "https://api.kanye.rest/"

const kanye = async () => {
  const res = await fetch(url)
  const data = await res.json()
  
  return data
}