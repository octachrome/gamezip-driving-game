GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Fire1, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    paused = 0
})
function draw () {
    display.clear()
    display.setMatrixColor(track_0, 0, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_1, 1, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_2, 2, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_3, 3, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_4, 4, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_5, 5, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_6, 6, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_7, 7, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_0 + 4, 0, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_1 + 4, 1, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_2 + 4, 2, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_3 + 4, 3, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_4 + 4, 4, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_7 + 4, 7, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_5 + 4, 5, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(track_6 + 4, 6, GAME_ZIP64.colors(ZipLedColors.Green))
    display.setMatrixColor(car_x, 6, GAME_ZIP64.colors(ZipLedColors.Red))
    display.setBrightness(10)
    display.show()
}
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Fire2, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    paused = 1
})
function set_next_track (previous_track: number) {
    if (previous_track == 4) {
        next_track = previous_track + randint(-1, 0)
    } else if (previous_track == -1) {
        next_track = previous_track + randint(0, 1)
    } else {
        next_track = previous_track + randint(-1, 1)
    }
}
function create_track () {
    track_0 = randint(-1, 4)
    set_next_track(track_0)
    track_1 = next_track
    set_next_track(track_1)
    track_2 = next_track
    set_next_track(track_2)
    track_3 = next_track
    set_next_track(track_3)
    track_4 = next_track
    set_next_track(track_4)
    track_5 = next_track
    set_next_track(track_5)
    track_6 = next_track
    set_next_track(track_6)
    track_7 = next_track
}
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Left, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    if (car_x > 0) {
        car_x += -1
    }
})
function move_track () {
    track_7 = track_6
    track_6 = track_5
    track_5 = track_4
    track_4 = track_3
    track_3 = track_2
    track_2 = track_1
    track_1 = track_0
    set_next_track(track_1)
    track_0 = next_track
}
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Right, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    if (car_x < 7) {
        car_x += 1
    }
})
let next_track = 0
let track_7 = 0
let track_5 = 0
let track_4 = 0
let track_3 = 0
let track_2 = 0
let track_1 = 0
let track_0 = 0
let paused = 0
let track_6 = 0
let car_x = 0
let display: GAME_ZIP64.ZIP64Display = null
display = GAME_ZIP64.createZIP64Display()
create_track()
car_x = track_6 + 2
draw()
basic.forever(function () {
    if (paused == 0) {
        move_track()
    }
    draw()
    basic.pause(300)
})
