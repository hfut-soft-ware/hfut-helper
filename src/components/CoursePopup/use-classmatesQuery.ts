export function useClassmateQuery() {
  const handleClassmatesQueryClick = (couresId: number) => {
    uni.navigateTo({
      url: `/sub1/pages/classmates/classmates?couresId=${couresId}`,
    })
  }
  return {
    handleClassmatesQueryClick,
  }
}
