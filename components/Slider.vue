<script setup>
const config = useRuntimeConfig();

// API
const { data: images } = await useLazyFetch(config.apiUrl + "/api/slides?populate=*");

const timer = ref(0);
const progress = ref(0);
const currentIndex = ref(0);
const loading = ref(true);

const setLoader = () => {
  setTimeout(() => {
    loading.value = false;
    startSlider();
  }, 1500);
};

const startSlider = () => {
  if (loading.value === false) {
    timer.value = setInterval(function () {
      progress.value += 2;
      if (progress.value >= 100) {
        progress.value = 0;
        nextSlide();
      }
    }, 100);
  }
};

const nextSlide = () => {
  currentIndex.value += 1;
  if (currentIndex.value > images.value.data.length - 1) {
    currentIndex.value = 0;
  }
  clearInterval(timer.value);
  progress.value = 0;
  startSlider();
};

const prevSlide = () => {
  currentIndex.value -= 1;
  if (currentIndex.value < 0) {
    currentIndex.value = images.value.data.length - 1;
  }
  clearInterval(timer.value);
  progress.value = 0;
  startSlider();
};

const setSlide = (index) => {
  currentIndex.value = index;
  clearInterval(timer.value);
  progress.value = 0;
  startSlider();
};

const currentSlide = computed(() => {
  return images.value.data[Math.abs(currentIndex.value) % images.value.data.length];
});

onMounted(() => {
  setLoader();
  startSlider();
});
</script>

<template>
  <Loading v-if="loading" />

  <section class="relative w-full h-screen overflow-hidden bg-black">
    <TransitionGroup name="fade" tag="ul" class="absolute w-full h-full overflow-hidden">
      <li v-for="i in [currentIndex]" :key="i" class="inline-flex w-full h-full">
        <img
          :src="config.apiUrl + currentSlide.attributes.Image.data.attributes.url"
          :alt="currentSlide.attributes.Text"
          class="object-cover object-center w-full h-full"
        />
      </li>
    </TransitionGroup>

    <div
      class="absolute bottom-0 z-20 w-full py-10 md:py-20 bg-gradient-to-b from-transparent to-black"
    >
      <ul
        class="flex flex-col justify-between px-6 space-y-2 md:px-10 md:space-y-0 md:space-x-6 md:flex-row"
      >
        <li
          v-for="(nav, index) in images.data"
          :key="nav.id"
          class="relative flex-1 py-2 border-t-2 cursor-pointer border-white/50 md:hover:border-white md:hover:text-white"
          :class="[images.data.length > 1 ? 'text-white/80' : 'text-white']"
          @click="setSlide(index)"
        >
          <span
            class="absolute top-[-2px] left-0 block z-50 bg-white h-[2px] transition-all"
            :style="[images.data.length > 1 ? { width: progress + '%' } : { width: '100%' }]"
            v-if="index === currentIndex"
          ></span>
          <span v-html="nav.attributes.Title" class="font-semibold uppercase lg:text-lg"></span>
        </li>
      </ul>
    </div>

    <div class="absolute z-10 grid items-center w-full h-full grid-cols-6">
      <div
        class="w-full h-full col-span-1 col-start-1 transition-all opacity-0 cursor-pointer hover:opacity-100 bg-gradient-to-l from-transparent to-black"
      >
        <button class="w-full h-full" @click="prevSlide">
          <span class="sr-only">Next</span>
        </button>
      </div>
      <div
        class="w-full h-full col-span-1 col-start-6 transition-all opacity-0 cursor-pointer hover:opacity-100 bg-gradient-to-r from-transparent to-black"
      >
        <button class="w-full h-full" @click="nextSlide">
          <span class="sr-only">Next</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
  opacity: 100;
}
.fade-enter,
.fade-leave-to {
  transition: all 0.2s;
  opacity: 0;
}
.fade-enter-active {
  transition-delay: 0.2s;
}
</style>
