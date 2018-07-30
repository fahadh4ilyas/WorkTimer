<template>
  <div id="app">
    <header>
      <b-container class="pt-3 pb-3 bg-dark">
        <b-row align-h=center>
          <b-col cols=6>
            <h1 class="display-1 text-center text-white font-weight-bold">Work Timer</h1>
          </b-col>
        </b-row>
      </b-container>
    </header>
    <main>
      <b-container class="pt-3 pb-3 bg-light">
        <b-row align-h="center">
          <b-col cols="6">
            <b-button-group>
              <b-button @click="changePlayState"><font-awesome-icon :icon="playState"></font-awesome-icon></b-button>
              <b-button @click="changeStopState"><font-awesome-icon icon=stop></font-awesome-icon></b-button>
            </b-button-group>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols="6">
            <p class="display-4">{{ minute | leftpad }}:{{ second | leftpad }}</p>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols="6">
            <p class="display-3" v-show="showText">{{ msg }}</p>
            <p class="display-4" v-show="!showText">Click Play Button to Start!</p>
          </b-col>
        </b-row>
        <b-row align-h="center" v-show="timerState == 'Resting'">
          <b-col cols="6">
            <p class="h4 my-1">Here's a cat image for you:</p>
          </b-col>
          <div class="w-100"></div>
          <b-col cols="6">
            <img class="mx-auto d-block img-fluid" :src="'http://thecatapi.com/api/images/get?format=src&type=gif&size=med&ts='+timestamp" alt="Cat Image">
          </b-col>
        </b-row>
      </b-container>
    </main>
    <footer>
      <b-container class="pt-3 pb-3 bg-dark">
        <b-row align-h="center">
          <b-col cols="6" v-show="!showForm">
            <b-button class="float-right" :disabled="playState == 'pause'" variant=primary @click="showForm=true">Change Duration</b-button>
          </b-col>
          <b-col cols="6" v-show="showForm">
            <b-form @submit="onSubmit">
              <b-form-group class="text-white" id="workGroup" label="Minutes to Work:" label-for="workInput">
                <b-form-select id="workInput" v-model="WORKING_TIME_LENGTH_IN_MINUTES">
                  <option v-for="i in 56" :key="i" :value="i+4">{{ i+4 }}</option>
                </b-form-select>
              </b-form-group>
              <b-form-group class="text-white" id="restGroup" label="Minutes to Rest:" label-for="restInput">
                <b-form-select id="restInput" v-model="RESTING_TIME_LENGTH_IN_MINUTES">
                  <option v-for="i in 56" :key="i" :value="i+4">{{ i+4 }}</option>
                </b-form-select>
              </b-form-group>
              <b-button class="float-right" type="submit" variant="primary">Submit</b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
const TIMER_STATES = {
WORK: 'Working',
REST: 'Resting'
};

export default {
  name: 'app',
  data () {
    return {
      playState: "play",
      WORKING_TIME_LENGTH_IN_MINUTES: 25,
      RESTING_TIME_LENGTH_IN_MINUTES: 5,
      minute: 25,
      second: 0,
      timerState: TIMER_STATES.WORK,
      timestamp: 0,
      showForm: false,
      showText: false
    }
  },
  methods: {
    changePlayState: function () {
      this.showText = true;
      if(this.playState == "play") {
        this.playState = "pause";
        this._tick();
        this.interval = setInterval(this._tick, 1000);
      } else {
        this.playState = "play";
        clearInterval(this.interval);
      }
    },
    _tick: function() {
      if (this.second % 30 === 0 && this.timerState == "Resting") {
        this.timestamp = new Date().getTime();
      }

      if (this.second !== 0) {
        this.second--;
        return;
      }
      if (this.minute !== 0) {
        this.minute--;
        this.second = 59;
        return;
      }

      this.timerState = this.timerState === TIMER_STATES.WORK ? TIMER_STATES.REST : TIMER_STATES.WORK;

      if (this.timerState === TIMER_STATES.WORK) {
        this.minute = this.WORKING_TIME_LENGTH_IN_MINUTES;
      } else {
        this.minute = this.RESTING_TIME_LENGTH_IN_MINUTES;
      }
    },
    changeStopState: function () {
      this.showText = false;
      this.playState = "play";
      clearInterval(this.interval);
      this.timerState = TIMER_STATES.WORK;
      this.minute = this.WORKING_TIME_LENGTH_IN_MINUTES;
      this.second = 0;
    },
    onSubmit: function(evt) {
      evt.preventDefault();
      this.showForm = false;
      this.showText = false;
      this.playState = "play";
      clearInterval(this.interval);
      this.timerState = TIMER_STATES.WORK;
      this.minute = this.WORKING_TIME_LENGTH_IN_MINUTES;
      this.second = 0;
    }
  },
  computed: {
    msg: function() {
      return "It's "+this.timerState+" Time!";
    }
  }
}
</script>
