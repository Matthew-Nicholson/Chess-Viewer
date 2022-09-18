<template>
  <div class="eval-bar eval-bar__black" :class="{ rounded: props.rounded }">
    <span
      v-if="showNumericEvalBlack"
      class="eval-bar__text eval-bar__text_black"
    >
      {{ evaluation }}
    </span>
    <div class="eval-bar__white">
      <span
        v-if="showNumericEvalWhite"
        class="eval-bar__text eval-bar__text_white"
      >
        {{ evaluation }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  width: {
    type: String,
    default: "20px",
  },
  height: {
    type: String,
    default: "100%",
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  numericEval: {
    type: Boolean,
    default: false,
  },
  transitionDuration: {
    type: String,
    default: "2s",
  },
  whiteColor: {
    type: String,
    default: "#F7F7FF",
  },
  blackColor: {
    type: String,
    default: "#131112",
  },
  evalRange: {
    type: [Number, String],
    default: 5, //ie. -5 shows all black and +5 shows all white eval.
    validator: (value) => {
      return value >= 1 && value < 100;
    },
  },
  evaluation: {
    type: [Number, String],
    default: 0.0,
  },
});
const evalBarHeight = computed(() => {
  const evaluation = +props.evaluation;
  const maxEval = +props.evalRange;
  const minEval = +props.evalRange * -1;
  if (evaluation < minEval) return 0;
  if (evaluation > maxEval) return 100;
  const evalAsPercentage = (evaluation / (maxEval * 2) + 0.5) * 100;
  return evalAsPercentage + "%";
});
const showNumericEvalBlack = computed(() => {
  return props.numericEval && props.evaluation && props.evaluation < 0;
});
const showNumericEvalWhite = computed(() => {
  return props.numericEval && props.evaluation && props.evaluation >= 0;
});
const evaluation = computed(() => {
  if (props.evaluation) {
    const intEval = +props.evaluation;
    return intEval.toFixed(1);
  }
});
</script>

<style>
.eval-bar {
  width: v-bind(width);
  max-width: v-bind(width);
  min-width: v-bind(width);
  height: v-bind(height);
  max-height: v-bind(height);
  position: relative;
}

.eval-bar__black {
  background-color: v-bind(blackColor);
  width: 100%;
}

.eval-bar__white {
  background-color: v-bind(whiteColor);
  height: v-bind(evalBarHeight);
  position: absolute;
  bottom: 0;
  width: 100%;
  transition: height v-bind(transitionDuration);
  overflow: hidden;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  display: flex;
}

.eval-bar__text {
  text-align: center;
  margin-bottom: 4px;
  margin-top: 4px;
  font-size: 0.69em;
  width: 100%;
  user-select: none;
}

.eval-bar__text_white {
  color: v-bind(blackColor);
  align-self: flex-end;
}

.eval-bar__text_black {
  color: v-bind(whiteColor);
  padding-left: 2px;
}

.rounded {
  border-radius: 1rem;
}
</style>
