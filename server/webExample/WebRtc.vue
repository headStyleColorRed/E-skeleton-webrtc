<template>
  <div class="rtcWrapper">
  </div>
</template>

<script>

// Things to do in order to use this file
// 1. Fill the publicKey
// 2. Pass the itemId
// 3. Total amount prop is optional

let publicKey = "YOUR PUBLIC KEY"
let stripe = Stripe(publicKey)
let elements = stripe.elements()
let card = undefined

export default {
  name: "WebRtc",
  props: {
    itemId: String,
    totalAmount: String,
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style >

</style>
