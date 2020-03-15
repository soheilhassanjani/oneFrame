let oneFrame = undefined;
let children = undefined;
let lengthChildren = undefined;
let elementActive = 0;
let lastDirection = "up";

function init(idName) {
    if (document.querySelector(idName)) {
        oneFrame = document.querySelector(idName);
        children = oneFrame.children;
        lengthChildren = children.length;
        events(oneFrame);
    }
    else console.log(undefined);
}
// events
function events(oneFrame) {
    oneFrame.addEventListener("wheel", throttle(handler, 1000));
    window.addEventListener("resize", debounce(handler, 100));
}
// handler
function handler({ deltaY, type }) {
    if (type === 'wheel') {
        let direction = calDirection(deltaY);
        if (direction === "down") {
            if (!isChild(elementActive + 1)) return;
            elementActive = elementActive + 1;
        }
        else {
            if (!isChild(elementActive - 1)) return;
            elementActive = elementActive - 1;
        }
        lastDirection = direction;
    }
    oneFrame.style.transform = `translate3d(0px, -${calculateY(elementActive, lastDirection)}px, 0px)`;
}
// isChild
function isChild(num) {
    return num >= 0 && num <= lengthChildren - 1;
}
// calDirection
function calDirection(deltaY) {
    return Math.sign(deltaY) === 1 ? 'down' : 'up'
}
// calculateY
function calculateY(elementActive, direction) {
    let top = calculateTop(elementActive);
    if (direction === 'down') {
        const clientHeight = document.documentElement.clientHeight;
        const height = children[elementActive].getBoundingClientRect().height;
        return top + height - clientHeight;
    } else if (direction === 'up') {
        return top;
    }
}
// calculateTop
function calculateTop(element) {
    let top = 0;
    for (let index = 0; index < element; index++) {
        top += children[index].getBoundingClientRect().height;
    }
    return top;
}
// throttle
function throttle(callback, interval) {
    let enableCall = true;
    return function (...args) {
        if (!enableCall) return;
        enableCall = false;
        callback.apply(this, args);
        setTimeout(() => enableCall = true, interval);
    }
}
// debounce
function debounce(func, delay) {
    let inDebounce
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

export default { init }