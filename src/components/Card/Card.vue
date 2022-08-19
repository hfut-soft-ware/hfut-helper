<template>
  <div class="overflow-hidden z-[0] px-4 py-5 bg-[#283593] rounded-2xl flex-col text-white relative">
    <div class="relative z-[9999]">
      <slot />
    </div>
    <div class="absolute top-[30px] right-[-50px] w-[210px] h-[210px] rounded-full bg-[#3949AB] opacity-50" />
    <div class="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-[#3949AB] opacity-80" />
  </div>
</template>
