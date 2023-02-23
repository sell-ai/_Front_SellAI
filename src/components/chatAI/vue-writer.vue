<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "VueWriter",
  props: {
    array: {
      type: Array,
      required: true,
    },
    eraseSpeed: {
      type: Number,
      default: 100,
    },
    typeSpeed: {
      type: Number,
      default: 200,
    },
    delay: {
      type: Number,
      default: 2000,
    },
    intervals: {
      type: Number,
      default: 500,
    },
    start: {
      type: Number,
      default: 0,
    },
    caret: {
      type: Boolean,
      default: true,
    },
    iterations: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      typeValue: "",
      count: 0,
      typeStatus: false,
      arrayIndex: 0,
      charIndex: 0,
    };
  },
  methods: {
    typewriter() {
      let loop = 0;
      if (this.charIndex < this.array[this.arrayIndex].length) {
        if (!this.typeStatus) {
          this.typeStatus = true;
        }

        this.typeValue += this.array[this.arrayIndex].charAt(this.charIndex);
        this.charIndex += 1;
        setTimeout(this.typewriter, this.typeSpeed);
      } else {
        this.count += 1;

        if (this.count === this.array.length) {
          loop += 1;
          if (loop === this.iterations) {
            this.$emit('finish');
            this.convert_to_list();
            return (this.typeStatus = false);
          }
        }

        this.typeStatus = false;

        setTimeout(this.eraser, this.delay);
      }
    },
    eraser() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.array[this.arrayIndex].substring(
          0,
          this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraser, this.eraseSpeed);
      } else {
        this.typeStatus = false;
        this.arrayIndex += 1;
        if (this.arrayIndex >= this.array.length) this.arrayIndex = 0;
        setTimeout(this.typewriter, this.typeSpeed + this.intervals);
      }
    },
    convert_to_list() {
      const inputText = this.typeValue;
      if (inputText.indexOf("~")> -1) {
        const splittedText = inputText.split("~");
        console.log(splittedText);
        const fragment = document.createDocumentFragment();
        let divMainUL = document.createElement("div");
        divMainUL.classList.add("bg-gradient-to-tl", "from-blue-400", "to-cyan-100",
          "text-gray-900", "border", "border-cyan-200", "rounded-lg");
        let ulfrag = document.createElement("ul");
        ulfrag.classList.add("ml-8","list-disc");
        splittedText.forEach((text, index) => {
          if (index === 0) {
            const divItem = document.createElement("div");
            divItem.classList.add("underline", "underline-offset-8", "decoration-white-500");
            divItem.textContent = text;
            fragment.appendChild(divItem);
          }
          else {
            const listItem = document.createElement("li");
            listItem.textContent = text;
            ulfrag.appendChild(listItem);
          }
        });
        divMainUL.appendChild(ulfrag);
        fragment.appendChild(divMainUL)
        this.$refs.textInput.innerHTML = "";
        this.$refs.textInput.appendChild(fragment);
      }
    }
  },
  created() {
    setTimeout(this.typewriter, this.start);
  },
  mounted: function () {
    this.$nextTick(function () {
      
    })
  }
});
</script>

<template>
  <div :class="{'cursor-progress': typeStatus}">
    <slot />
    <span ref="textInput" class="whitespace-pre-line" :class="{'cursor-progress': typeStatus, 'cursor-text': !typeStatus}">{{ typeValue }}</span>
    <span :class="{typing: typeStatus }">&nbsp;</span>
  </div>
</template>
