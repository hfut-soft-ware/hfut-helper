export function useLoverPoem() {
  const LoverPoem = {
    canceled: [
      '愿得一心人，白头不相离。',
      '只愿君心似我心，定不负相思意。',
      '两情若是久长时，又岂在朝朝暮暮。',
      '执子之手，与子偕老。',
      '我觉得，爱情就像生命的诞生，是无数个偶然交织成的必然，无数个也许导致的注定。一旦发生，就没有如果，只有结果。',
    ],
    confirmed: [
      '似此星辰非昨夜，为谁风露立中宵。',
      '这佛光闪闪的高原，三步两步便是天堂，却仍有那么多人，因心事过重，而走不动。',
      '陌上花开，可缓缓归矣。',
      '花儿不会因为明日枯萎，今日就不开花。\n不要因为担心明日的我，拒绝今日的我。',
      '浩瀚的星空中，有万千星辰在闪耀。',
    ],
  }

  const getPoemOnCanceled = () => {
    return LoverPoem.canceled[Math.floor(Math.random() * LoverPoem.canceled.length)]
  }

  const getPoemOnConfirm = () => {
    return LoverPoem.confirmed[Math.floor(Math.random() * LoverPoem.confirmed.length)]
  }

  return {
    getPoemOnCanceled,
    getPoemOnConfirm,
  }
}
