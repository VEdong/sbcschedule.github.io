export function waitUntilAnimationsFinish(element) {
  const animations = element.getAnimations().filter(animation => animation.playState !== "finished");
  
  if (animations.length === 0) {
    return Promise.resolve();
  }

  return Promise.allSettled(animations.map(animation => animation.finished));
}
