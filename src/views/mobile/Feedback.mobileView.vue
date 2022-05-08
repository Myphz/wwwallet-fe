<template>
  <h1>Feedback</h1>
  <h4>
    Do you have anything to share regarding the website? Have you found a bug, or just want to leave a comment?<br>
    You can fill the text area below to send a message to the maintainer of the website.<br>
    Any feedback is highly appreciated!
  </h4>
  <textarea placeholder="Share your ideas or comments..." v-model="text" />
  <div>
    <Button @click="submit" class="btn" btnClass="h3 bg-primary rounded">Submit</Button>
  </div>

  <Popup :success="popup.success" :message="popup.msg" @endAnimation="popup.success = null" mobile />
</template>

<script setup>
import Button from "U#/Button.vue";
import Popup from "U#/Popup.vue";
import { ref } from "vue";
import { useAuthStore } from "S#/auth.store";

const text = ref("");
const popup = ref({ success: null, msg: "" });

const submit = async () => {
  if (!text.value) return;
  popup.value = await useAuthStore().feedback(text.value);
}
</script>

<style lang="sass" scoped>
  h4
    font-weight: normal

  textarea
    margin: 2em 0
    width: calc(100% - 2em)
    min-height: 20em
    border: none
    outline: none
    padding: 1em
    border-radius: .5em
    background-color: $bg-paper
    color: $text-primary
    font-size: nth($font-sizes, 4)
    font-family: $font-base

    &::placeholder
      color: $text-secondary
    
</style>