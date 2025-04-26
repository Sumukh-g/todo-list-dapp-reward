import Todos from './contracts/Todos.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'http',
      url: 'http://127.0.0.1:8545'
    }
  },
  contracts: [Todos],
  events: {
    Todos: ['LogTasksUpdated']
  },
  polls: {
    accounts: 1500
  },
  syncAlways: true
}

export default options
