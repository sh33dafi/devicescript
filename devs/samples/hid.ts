import * as ds from "@devicescript/core"

const btn = new ds.Button()
const rot = new ds.RotaryEncoder()
const kbd = new ds.HidKeyboard()

btn.down.subscribe(async () => {
    // kbd.key(HidKeyboardSelector.UpArrow, HidKeyboardModifiers.None, HidKeyboardAction.Press)
    // kbd.key(HidKeyboardSelector.VolumeUp, HidKeyboardModifiers.None, HidKeyboardAction.Press)
    await kbd.key(
        ds.HidKeyboardSelector.V,
        ds.HidKeyboardModifiers.LeftGUI,
        ds.HidKeyboardAction.Press
    )
})

async function press(k: number) {
    await kbd.key(k, ds.HidKeyboardModifiers.None, ds.HidKeyboardAction.Down)
    await ds.sleep(20)
    await kbd.key(k, ds.HidKeyboardModifiers.None, ds.HidKeyboardAction.Up)
    await ds.sleep(20)
}

let prevV = await rot.reading.read()
rot.reading.subscribe(async () => {
    const v = await rot.reading.read()
    while (prevV < v) {
        prevV = prevV + 1
        await press(ds.HidKeyboardSelector.RightArrow)
    }
    while (prevV > v) {
        prevV = prevV - 1
        await press(ds.HidKeyboardSelector.LeftArrow)
    }
})
