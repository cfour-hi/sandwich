let $mask = null; // 一次只能出现一个 mask？

const eventsRegister = (el, events) => {
  Object.keys(events).forEach(eventName => {
    el.addEventListener(eventName, events[eventName]);
  });
};

export default {
  inserted(el, binding) {
    if (!$mask) {
      $mask = document.createElement('div');
      $mask.classList = ['fixed-mask'];
      if (binding.value) {
        eventsRegister($mask, binding.value);
      }
      el.insertAdjacentElement('afterbegin', $mask);
    }
  },
  unbind() {
    $mask.remove();
    $mask = null;
  },
};
