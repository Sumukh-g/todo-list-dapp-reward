<template>
  <div v-if="isDrizzleInitialized" id="app">
    <div>
      <b-navbar type="dark" variant="dark" sticky>
        <div class="container">
        
          <b-navbar-brand href="#">
            <img src="./assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="Kitten">
            Todo List DApp
          </b-navbar-brand>

          <!-- <b-navbar-nav>
            <b-nav-item href="#">Home</b-nav-item>
          </b-navbar-nav> -->

          <b-navbar-nav>
            <b-nav-item href="#" disabled>
                Network<br>: {{ networkName }}
            </b-nav-item>
            <b-nav-item href="#" disabled>
                Punishment (sec)
                <drizzle-contract contractName="Todos" method="PUNISHMENT_TIME" />
            </b-nav-item>
            <b-nav-item href="#" disabled>
              <drizzle-account units="Ether" :precision="3" />
            </b-nav-item>
          </b-navbar-nav>

        </div>
      </b-navbar>
    </div>

    <div class="container py-3 my-4">

      <div class="row">
        <div class="col-lg-8 col-md-12">
          <h3>Add a Task</h3>
          <AddTaskForm />
        </div>
        <div class="col-lg-1 col-md-12"></div>
        <div class="col-lg-3 col-md-12 bg-warning bg-gradient text-light rounded-3 p-2">
          <h3>Claim Prize (wei)</h3>
          <Prizes />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <h3>Todos</h3>
          <Tasks />
        </div>
      </div>

    </div>

    <div class="b-divider"></div>
    
    <div class="container">
      <div class="row py-3 my-4">
        <h2 class="pb-2 border-bottom">Testing and Debugging</h2>
        <Debugs />
      </div>
    </div>

    <div class="b-divider"></div>

    <div class="container">
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
          <li class="nav-item"><a href="https://github.com/jahani/todo-list-dapp" class="nav-link px-2 text-muted">GitHub</a></li>
        </ul>
        <p class="text-center text-muted">© 2021 No Company, Inc</p>
      </footer>
    </div>

  </div>

  <div v-else>
    <p>Loading...</p>
    <p>Is <a href="https://metamask.io/" target="_blank">MetaMask</a> extension installed on your browser?</p>
    <p>Is proper network selected in MetaMask? (Rinkeby Test Network or Localhost on port 8545)</p>
  </div>
</template>

<script>
import Tasks from './Tasks'
import Prizes from './Prizes'
import AddTaskForm from './AddTaskForm'
import Debugs from './Debugs'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Tasks,
    Prizes,
    AddTaskForm,
    Debugs,
  },
  
  data() {
    return {
      networkName: 'Loading...'
    }
  },
  
  computed: {
    ...mapGetters('drizzle', ['isDrizzleInitialized', 'drizzleInstance'])
  },
  
  mounted() {
    if (this.isDrizzleInitialized) {
      this.getNetworkName();
    }
  },
  
  watch: {
    isDrizzleInitialized(initialized) {
      if (initialized) {
        this.getNetworkName();
      }
    }
  },
  
  methods: {
    async getNetworkName() {
      if (this.drizzleInstance && this.drizzleInstance.web3) {
        try {
          const networkId = await this.drizzleInstance.web3.eth.net.getId();
          switch (networkId) {
            case 1:
              this.networkName = 'Mainnet';
              break;
            case 3:
              this.networkName = 'Ropsten';
              break;
            case 4:
              this.networkName = 'Rinkeby';
              break;
            case 5:
              this.networkName = 'Goerli';
              break;
            case 42:
              this.networkName = 'Kovan';
              break;
            default:
              if (networkId > 1000000000) {
                this.networkName = 'Local (Ganache)';
              } else {
                this.networkName = `Network #${networkId}`;
              }
          }
        } catch (error) {
          console.error('Error getting network:', error);
          this.networkName = 'Unknown';
        }
      }
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.b-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}
</style>
