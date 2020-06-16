import interact from 'interactjs'

function createDragMoveListener(current) {
  return function dragMoveListener(event) {
    const target = current
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform = `translate(${x}px, ${y}px)`
    target.style.transform = `translate(${x}px, ${y}px)`

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
}

export default function createDraggableHeader() {
  const ref = (_) => {
    ref.current = _ ? _.offsetParent : null
    if (ref.current) {
      const header = ref.current.getElementsByClassName('ant-modal-header')[0]
      const { current } = ref

      interact(header).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'body',
            endOnly: true,
          }),
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
          // call this function on every dragmove event
          move: createDragMoveListener(current),

          // call this function on every dragend event
          // end(event) {},
        },
      })
    }
  }
  ref(null)
  return ref
}
