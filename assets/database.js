import PouchDB from 'pouchdb'
const remoteUsername = "ed356ce5-932a-4357-91b9-452718aa46ba-bluemix"
const remotePass = "8d670900cec398689ee8f258e4e83161c389595fd4753d9f468013fbd529c466"
const remoteHost = "ed356ce5-932a-4357-91b9-452718aa46ba-bluemix.cloudant.com"
const accountsDb = 'accounts'
const transactionsDb = 'transactions'
const accountsURL = `https://${remoteUsername}:${remotePass}@${remoteHost}/${accountsDb}`
const transactionsURL = `https://${remoteUsername}:${remotePass}@${remoteHost}/${transactionsDb}`
export const accountsLocal = new PouchDB(accountsDb)
export const accountsRemote = new PouchDB(accountsURL)
export const transactionsLocal = new PouchDB(transactionsDb)
export const transactionsRemote = new PouchDB(transactionsURL)

