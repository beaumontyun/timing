<template>
  <div id="masterContai" class="w-full h-full">
    <!-- Clock section -->
    <div
      id="clockContainer"
      class="container w-96 h-64 bg bg-indigo-100 rounded-lg"
    >
      <div id="addTrigger">
        <!-- TODO setDate to pass data to backend (no PUT/UPDATE, only POST), {{ date }} to be fetched -->
        <div v-if="clicked" @click="startTimer" class="mb-2">add timer</div>

        <!-- TODO Timer container to be moved to a component file -->
        <div id="clockContainer">
          <!-- 1. Date -->
          <div id="dateContainer" class="container mb-2">Date: {{ date }}</div>
          <!-- 1. Title  -->
          <form action="">
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
            class="w-1/2 container flex justify-between items-center mb-2"
          >
            <!-- 2. minus sign -->
            <MinusIcon @click="timerAmended = !timerAmended" class="w-4 h-4" />
            <!-- 2. Timer -->
            {{ hour }} : {{ min }} : {{ sec }}
            <!-- 2. plus sign -->
            <PlusIcon @click="timerAmended = !timerAmended" class="w-4 h-4" />
          </div>
          <!-- 3. hidden - show form for reason to amend time -->
          <div v-if="timerAmended" class="mb-2">
            <form action="">
              <input
                type="text"
                v-model="title"
                title="title"
                placeholder="Reason for amendment"
                class="w-3/4 rounded"
              />
            </form>
          </div>
          <!-- 4. work description -->
          <div class="mb-2">
            <form action="">
              <input
                type="text"
                v-model="description"
                title="title"
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
            <div><input type="submit" value="delete" /></div>
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
      date: "",
      timestamp: "",
      title: "",
      description: "",
      play: true,
      timeAdded: 0,
      timerAmended: false,
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
    addSeconds: function () {
      
    },
    minusSeconds: function () {

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
      } else {
        // calling setDate function here to encapsulate the function in preventDefault
        self.setDate();
        this.interval = setInterval(function () {
          self.totalSeconds += 1;

          self.hour = Math.floor(self.totalSeconds / 3600);
          self.min = Math.floor((self.totalSeconds / 60) % 60);
          self.sec = parseInt(self.totalSeconds % 60);
        }, 1000);
      }
    },
    pauseTimer: function () {
      clearInterval(this.interval);
      delete this.interval;
    },
    resumeTimer: function () {
      if (!this.interval) this.startTimer();
    },
  },
};
</script>
