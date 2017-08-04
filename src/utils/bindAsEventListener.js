const bindAsEventListener = function (func, object) {
  return function(event) {
		return func.call(object, event || window.event);
	};
}

export default bindAsEventListener;
