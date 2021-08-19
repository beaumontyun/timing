<template>
  <div id="masterContainer" class="w-screen h-screen bg bg-yellow-100">
    <div id="headerTitle" class="container w-screen h-24 flex justify-center items-center text-xl">timing</div>
    <ClockTable />
  </div>
</template>

<script>
// @ is an alias to /src
import ClockTable from '@/components/ClockTable';

export default {
  name: 'Home',
  components: {
    ClockTable,
  }
}
</script>
