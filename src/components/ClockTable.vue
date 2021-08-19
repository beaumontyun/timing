<template>
  <div id="masterContai" class="w-full h-full">
    <!-- Clock section -->
    <div
      id="clockContainer"
      class="container w-96 h-64 bg bg-indigo-100 rounded-lg"
    >
      <div id="addTrigger">
        <!-- TODO setDate to pass data to backend (no PUT/UPDATE, only POST), {{ date }} to be fetched -->
        <div v-if="clicked" @click="startTimer" class="pb-2 pt-2">
          add timer
        </div>

        <!-- TODO Timer container to be moved to a component file -->
        <div id="clockContainer">
          <!-- 1. Date -->
          <div id="dateContainer" class="container pb-2">Date: {{ date }}</div>
          <!-- 1. Title  -->
          <form action="" class="pb-2">
            <input
              type="text"
              v-model="title"
              title="title"
              placeholder="title"
              class="w-3/4 rounded"
            />
          </form>
          <div
            id="timerContainer"
            class="w-1/2 container flex justify-between items-center pb-2"
          >
            <!-- 2. minus sign -->
            <MinusIcon @click="minusSeconds" class="w-4 h-4" />
            <!-- 2. Timer -->
            {{ hour }} : {{ min }} : {{ sec }}
            <!-- 2. plus sign -->
            <PlusIcon @click="addSeconds" class="w-4 h-4" />
          </div>
          <!-- 3. hidden - show form for reason to amend time -->
          <div v-if="timerAmended" class="pb-2">
            <form action="">
              <input
                type="text"
                v-model="amendment"
                amendment="amendment"
                placeholder="Reason for amendment"
                class="w-3/4 rounded"
              />
            </form>
          </div>
          <!-- 4. work description -->
          <div class="pb-2">
            <form action="">
              <input
                type="text"
                v-model="description"
                description="description"
                placeholder="description"
                class="w-3/4 rounded"
              />
            </form>
          </div>
          <div
            id="submitContainer"
            class="w-1/2 container flex justify-between"
          >
            <!-- 5. delete timer -->
            <div @click="resetAttributes">
              <input type="submit" value="delete" />
            </div>
            <!-- 6. play/pause timer -->
            <div
              v-if="play"
              @click="
                play = !play;
                pauseTimer();
              "
            >
              Pause
            </div>
            <div
              v-else
              @click="
                play = !play;
                resumeTimer();
              "
            >
              Play
            </div>
            <!-- 7. submit timer -->
            <div><input type="submit" value="submit" /></div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <!-- TODO split into a separate component - use props to get data -->
    <!-- Report section -->
    <div
      id="reportContainer"
      class="container w-96 h-64 bg bg-indigo-100 rounded-lg"
    >
      <div>report cards</div>
    </div>
  </div>
</template>

<script>
import { PlusIcon, MinusIcon } from "@heroicons/vue/solid";
export default {
  name: "Clock",
  data: () => {
    return {
      clicked: true,
      date: null,
      timestamp: "",
      title: "",
      amendment: "",
      description: "",
      play: false,
      timeAdded: 0,
      timerAmended: false,
      unamendedTime: 0,
      totalSeconds: 0,
      hour: 0,
      min: 0,
      sec: 0,
    };
  },
  components: {
    PlusIcon,
    MinusIcon,
  },
  methods: {
    addSeconds: function (event) {
      if (this.totalSeconds == 0) {
        event.preventDefault();
        console.log("preventDefault triggered");
      } else {
        this.totalSeconds = this.totalSeconds + 10;
        if (this.unamendedTime !== this.totalSeconds) {
          this.timerAmended = true;
        } else {
          this.timerAmended = false;
        }
      }
    },
    minusSeconds: function (event) {
      if (this.totalSeconds == 0) {
        event.preventDefault();
        console.log("preventDefault triggered");
      } else if (this.totalSeconds <= 0) {
        // if totalSeconds is less then 0, reduce it to 0
        this.totalSeconds = 0;
      } else if (this.totalSeconds >= 0) {
        // if totalSeconds is greater than 0...
        // calculate totalSeconds minus 10...
        var reducer = Math.abs(this.totalSeconds - 10);
        // if calculated totalSeconds is less than current totalSeconds (i.e. negative number), set totalSeconds to 0
        if (reducer > this.totalSeconds) {
          this.totalSeconds = 0;
        } else {
          // else, set totalSeconds to the reducer's number
          this.totalSeconds = reducer;
        }
      }
      if (this.unamendedTime !== this.totalSeconds) {
        this.timerAmended = true;
      } else {
        this.timerAmended = false;
      }
    },
    // setDate to be called only inside startTimer() in order to encapsulate itself in preventDefault
    setDate: function () {
      var timestamp = Date.now();
      Date.prototype.getMonthName = function () {
        var monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[this.getMonth()];
      };
      var month_Name = new Date().getMonthName();
      this.timestamp = timestamp;
      var date = new Date(timestamp);
      this.date =
        date.getDate() +
        " " +
        // (date.getMonth() + 1) +
        month_Name +
        " " +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
    },
    startTimer: function (event) {
      var self = this;
      if (self.totalSeconds !== 0) {
        event.preventDefault();
        console.log("preventDefault triggered");
      } else {
        // calling setDate function here to encapsulate the function in preventDefault
        self.play = true;
        self.setDate();
        this.interval = setInterval(function () {
          self.totalSeconds += 1;
          self.unamendedTime += 1;

          self.hour = Math.floor(self.totalSeconds / 3600);
          self.min = Math.floor((self.totalSeconds / 60) % 60);
          self.sec = parseInt(self.totalSeconds % 60);
        }, 1000);
      }
    },
    // second counter to resolve bug caused by startTimer's preventDefaul.
    continueTimer: function () {
      var self = this;
      this.interval = setInterval(function () {
        self.totalSeconds += 1;
        self.unamendedTime += 1;

        self.hour = Math.floor(self.totalSeconds / 3600);
        self.min = Math.floor((self.totalSeconds / 60) % 60);
        self.sec = parseInt(self.totalSeconds % 60);
      }, 1000);
    },
    pauseTimer: function (event) {
      if (this.totalSeconds == 0) {
        event.preventDefault();
      } else {
        clearInterval(this.interval);
        delete this.interval;
      }
      console.log("TotalSeconds =" + this.totalSeconds);
      console.log("Original time =" + this.unamendedTime);
    },
    resumeTimer: function () {
      var self = this;
      if (!this.interval) this.continueTimer();
      if (this.date == null) {
        self.setDate();
      }
      console.log("TotalSeconds =" + this.totalSeconds);
      console.log("Original time =" + this.unamendedTime);
    },
    resetAttributes: function () {
      clearInterval(this.interval);
      delete this.interval;
      this.date = null;
      this.timestamp = "";
      this.title = "";
      this.description = "";
      this.play = false;
      this.timeAdded = 0;
      this.timerAmended = false;
      this.unamendedTime = 0;
      this.totalSeconds = 0;
      this.hour = 0;
      this.min = 0;
      this.sec = 0;
    },
  },
};
</script>
