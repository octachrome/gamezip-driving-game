function draw_obstacle () {
    display.setMatrixColor(track[obstacle_y] + 1, obstacle_y, GAME_ZIP64.colors(ZipLedColors.Blue))
    display.setMatrixColor(track[obstacle_y] + 2, obstacle_y, GAME_ZIP64.colors(ZipLedColors.Blue))
    display.setMatrixColor(track[obstacle_y] + 3, obstacle_y, GAME_ZIP64.colors(ZipLedColors.Blue))
}
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Fire1, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    if (game_ended == 0) {
        paused = 0
    } else {
        new_game()
    }
})
function collision_check () {
    hit_wall = car_x == track[6] || car_x == track[6] + 4
    hit_obstacle = obstacle_y == 6 && jumping == 0
    if (hit_wall || hit_obstacle) {
        paused = 1
        game_ended = 1
        music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    }
}
function draw () {
    display.clear()
    draw_track()
    draw_obstacle()
    if (jumping > 0) {
        display.setMatrixColor(car_x, 6, GAME_ZIP64.colors(ZipLedColors.Orange))
    } else {
        display.setMatrixColor(car_x, 6, GAME_ZIP64.colors(ZipLedColors.Red))
    }
    display.setBrightness(10)
    display.show()
}
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Fire2, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    paused = 1
})
function create_track () {
    track[7] = randint(-1, 4)
    update_track_line(6)
    update_track_line(5)
    update_track_line(4)
    update_track_line(3)
    update_track_line(2)
    update_track_line(1)
    update_track_line(0)
}
function update_track_line (line: number) {
    previous = track[line + 1]
    if (previous == 4) {
        next_track = previous + randint(-1, 0)
    } else if (previous == -1) {
        next_track = previous + randint(0, 1)
    } else {
        next_track = previous + randint(-1, 1)
    }
    track[line] = next_track
}
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Left, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    if (car_x > track[6] + 1 && paused == 0) {
        car_x += -1
        draw()
        collision_check()
    }
})
function move_track () {
    line = 7
    for (let index = 0; index < 7; index++) {
        track[line] = track[line - 1]
        line += -1
    }
    score += 1
    update_track_line(0)
}
function draw_track () {
    for (let line = 0; line <= 7; line++) {
        display.setMatrixColor(track[line], line, GAME_ZIP64.colors(ZipLedColors.Green))
        display.setMatrixColor(track[line] + 4, line, GAME_ZIP64.colors(ZipLedColors.Green))
    }
}
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Right, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    if (car_x < track[6] + 3 && paused == 0) {
        car_x += 1
        draw()
        collision_check()
    }
})
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Up, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    jumping = 2
})
function new_game () {
    create_track()
    jumping = 0
    paused = 1
    game_ended = 0
    car_x = track[6] + 2
    obstacle_y = randint(-5, 3)
    score = 0
    draw()
}
let score = 0
let line = 0
let next_track = 0
let previous = 0
let jumping = 0
let hit_obstacle = false
let car_x = 0
let hit_wall = false
let paused = 0
let game_ended = 0
let obstacle_y = 0
let track: number[] = []
let display: GAME_ZIP64.ZIP64Display = null
GAME_ZIP64.setBuzzerPin()
display = GAME_ZIP64.createZIP64Display()
new_game()
basic.forever(function () {
    if (paused == 0) {
        move_track()
        obstacle_y += 1
        if (obstacle_y == 8) {
            obstacle_y = randint(-5, 0)
        }
        if (jumping > 0) {
            jumping += -1
        }
        draw()
        collision_check()
    }
    basic.pause(250)
})
basic.forever(function () {
    basic.showNumber(Math.trunc(score / 14))
})
