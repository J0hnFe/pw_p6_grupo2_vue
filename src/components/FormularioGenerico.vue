<template>
  <div class="inputlabel">
    <label>{{ etiqueta }}</label>
    <InputText v-bind="$attrs" :value="modelValue" @input="updateModelValue" />
  </div>
</template>

<script>
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
export default {
  name: "FormularioGenerico",
  components: {
    FloatLabel,
    InputText,
  },

  props: {
    etiqueta: {
      type: String,
      required: true,
    },
    
    modelValue: {
      type: [String, Number, Date, null],
      required: true,
    },
  },
  methods: {
    updateModelValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style></style>