import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE5NjQ3MTcwRmFjZkQ1MTIwOTc3MTdhYjZDNzJiYzExZjMxMjcxNEEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY2Mjc4OTY4NDQsIm5hbWUiOiJ3b3JrZXp6In0.PUonrHRjnmDMBfo0A3xIiGOGAxCtVDCj9Npp7vTDY2A'
}

function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
  }
  
  async function retrieve (cid) {
      const client = makeStorageClient()
        console.log(cid)
      const res = await client.get(cid)
      console.log(`Got a response! [${res.status}] ${res.statusText}`)
      
      if (!res.ok) {
        throw new Error(`failed to get ${cid}`)
      }
      const files = await res.files()
      console.log(files)
      for (const file of files) {
        console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
      }
      return files
      
    }
  
    async function storeFiles (files) {
      const client = makeStorageClient()
      const cid = await client.put([files])
      console.log('stored files with cid:', cid)
      return cid
    }
  
  export {storeFiles,retrieve};