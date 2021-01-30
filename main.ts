namespace SpriteKind {
    export const bonus = SpriteKind.create()
    export const gun = SpriteKind.create()
    export const boss = SpriteKind.create()
}
// Boss + Hero contact
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    game.over(false, effects.dissolve)
})
// Hero fire-ball
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (loaded > 0) {
        if (direction == 1) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . 4 4 4 5 5 4 4 4 . . . . 
                . . . 3 3 3 3 4 4 4 4 4 4 . . . 
                . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
                . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
                . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
                . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
                . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . . 4 2 3 3 2 4 4 3 4 4 2 4 . . 
                . . 4 2 2 3 2 2 4 3 4 2 4 4 . . 
                . . . 4 2 2 2 2 2 2 2 2 4 . . . 
                . . . . 4 4 2 2 2 2 4 4 . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, Sebastian, 120, 0)
        } else if (direction == 0) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . 4 4 4 5 5 4 4 4 . . . . 
                . . . 3 3 3 3 4 4 4 4 4 4 . . . 
                . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
                . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
                . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
                . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
                . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
                . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
                . . . 4 2 2 2 2 2 2 2 2 4 . . . 
                . . . . 4 4 2 2 2 2 4 4 . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, Sebastian, -120, 0)
        }
        loaded += -1
    }
})
// Fire-ball
sprites.onOverlap(SpriteKind.Player, SpriteKind.gun, function (sprite, otherSprite) {
    fireball.destroy(effects.confetti, 100)
    loaded = 5
})
// All Levels make 
function make_tilmap (levels: number) {
    // levels remember to ask how to do more levels
    if (levels == 1) {
        tiles.setTilemap(tilemap`level1`)
        wall = tiles.getTilesByType(sprites.dungeon.stairNorth)
        bat = sprites.create(img`
            . . f f f . . . . . . . . . . . 
            f f f c c . . . . . . . . f f f 
            f f c c c . c c . . . f c b b c 
            f f c 3 c c 3 c c f f b b b c . 
            f f c 3 b c 3 b c f b b c c c . 
            f c b b b b b b c f b c b c c . 
            c c 1 b b b 1 b c b b c b b c . 
            c b b b b b b b b b c c c b c . 
            c b 1 f f 1 c b b c c c c c . . 
            c f 1 f f 1 f b b b b f c . . . 
            f f f f f f f b b b b f c . . . 
            f f 2 2 2 2 f b b b b f c c . . 
            . f 2 2 2 2 2 b b b c f . . . . 
            . . f 2 2 2 b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(bat, sprites.dungeon.collectibleBlueCrystal)
        bat.x += 14
        monster = sprites.create(img`
            ................
            ..aaaaaaaaaaaaa.
            ..af2222222aa2a.
            ..aff2222ff222a.
            ..a2f2222f2f22a.
            ..aff2222f2f22a.
            ..a2222222f222a.
            ..a22222222222a.
            ..a222222222222.
            ..a222222222222.
            ..a22222222222a.
            2222222222222222
            ..a11122229999a.
            ..a91111199999a.
            ..a99111999999a.
            .aa99919999999a.
            .aa99999999999a.
            .a999999999999a.
            .a999999999999a.
            .a999911999999a.
            .a999119999999a.
            .9999119199999aa
            .a9999155555555a
            .a55555555555555
            a555555555555555
            a555555555555555
            5555555555555555
            a55555555555555a
            555555555555555a
            55555555555555aa
            55555555555555aa
            a5555555555555aa
            `, SpriteKind.boss)
        tiles.placeOnTile(monster, tiles.getTileLocation(106, 2))
        boss_life = 3
    } else if (levels == 2) {
        tiles.setTilemap(tilemap`level2`)
        bat = sprites.create(img`
            . . f f f . . . . . . . . . . . 
            f f f c c . . . . . . . . f f f 
            f f c c c . c c . . . f c b b c 
            f f c 3 c c 3 c c f f b b b c . 
            f f c 3 b c 3 b c f b b c c c . 
            f c b b b b b b c f b c b c c . 
            c c 1 b b b 1 b c b b c b b c . 
            c b b b b b b b b b c c c b c . 
            c b 1 f f 1 c b b c c c c c . . 
            c f 1 f f 1 f b b b b f c . . . 
            f f f f f f f b b b b f c . . . 
            f f 2 2 2 2 f b b b b f c c . . 
            . f 2 2 2 2 2 b b b c f . . . . 
            . . f 2 2 2 b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(bat, sprites.dungeon.collectibleBlueCrystal)
        bat.x += 14
    } else {
        tiles.setTilemap(tilemap`final_boss`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.bonus, function (sprite, otherSprite) {
    chest.setImage(img`
        . b b b b b b b b b b b b b b . 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e e 4 4 4 4 4 4 4 4 4 4 e e b 
        b b b b b b b d d b b b b b b b 
        . b b b b b b c c b b b b b b . 
        b c c c c c b c c b c c c c c b 
        b c c c c c c b b c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b b b b b b b b b b b b b b b b 
        b e e e e e e e e e e e e e e b 
        b e e e e e e e e e e e e e e b 
        b c e e e e e e e e e e e e c b 
        b b b b b b b b b b b b b b b b 
        . b b . . . . . . . . . . b b . 
        `)
    pause(500)
    chest.destroy(effects.fountain, 500)
    for (let value of wall) {
        tiles.setTileAt(value, assets.tile`transparency16`)
        tiles.setWallAt(value, false)
    }
})
// Hero jump
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Sebastian.vy == 0) {
        Sebastian.vy = -200
    }
})
// Boss + projectile interaction
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 500)
    boss_life += -1
})
// Scene change
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonOrange, function (sprite, location) {
    level += 1
    make_tilmap(level)
    tiles.placeOnRandomTile(Sebastian, assets.tile`tile1`)
})
// Levels 1 + 2
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (level == 1 || level == 2) {
        if (sprite == bat) {
            chest = sprites.create(img`
                . . b b b b b b b b b b b b . . 
                . b e 4 4 4 4 4 4 4 4 4 4 e b . 
                b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
                b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
                b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
                b e e 4 4 4 4 4 4 4 4 4 4 e e b 
                b e e e e e e e e e e e e e e b 
                b e e e e e e e e e e e e e e b 
                b b b b b b b d d b b b b b b b 
                c b b b b b b c c b b b b b b c 
                c c c c c c b c c b c c c c c c 
                b e e e e e c b b c e e e e e b 
                b e e e e e e e e e e e e e e b 
                b c e e e e e e e e e e e e c b 
                b b b b b b b b b b b b b b b b 
                . b b . . . . . . . . . . b b . 
                `, SpriteKind.bonus)
            tiles.placeOnTile(chest, tiles.getTileLocation(60, 0))
            fireball = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . 4 4 4 5 5 4 4 4 . . . . 
                . . . 3 3 3 3 4 4 4 4 4 4 . . . 
                . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
                . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
                . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
                . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
                . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
                . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
                . . . 4 2 2 2 2 2 2 2 2 4 . . . 
                . . . . 4 4 2 2 2 2 4 4 . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.gun)
            tiles.placeOnTile(fireball, tiles.getTileLocation(95, 4))
        }
    }
})
// Destroy enemy + fire-ball
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
})
// destroy enemy + jump
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.fire, 100)
    } else {
        game.over(false, effects.dissolve)
    }
})
// starting the game
let chest: Sprite = null
let boss_life = 0
let monster: Sprite = null
let bat: Sprite = null
let wall: tiles.Location[] = []
let fireball: Sprite = null
let projectile: Sprite = null
let direction = 0
let loaded = 0
let Sebastian: Sprite = null
let level = 0
level = 1
Sebastian = sprites.create(img`
    ........................
    ....ffffff..............
    ..ffeeeef2f.............
    .ffeeeef222f............
    .feeeffeeeef...cc.......
    .ffffee2222ef.cdc.......
    .fe222ffffe2fcddc.......
    fffffffeeeffcddc........
    ffe44ebf44ecddc.........
    fee4d41fddecdc..........
    .feee4dddedccc..........
    ..ffee44e4dde...........
    ...f222244ee............
    ...f2222e2f.............
    ...f444455f.............
    ....ffffff..............
    .....fff................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
controller.moveSprite(Sebastian, 100, 0)
Sebastian.ay = 300
scene.cameraFollowSprite(Sebastian)
loaded = 0
direction = 1
make_tilmap(level)
tiles.placeOnRandomTile(Sebastian, assets.tile`tile1`)
// Hero moves
game.onUpdate(function () {
    if (Sebastian.y > 470) {
        game.over(false, effects.dissolve)
    }
    if (controller.right.isPressed()) {
        direction = 1
        Sebastian.setImage(img`
            . . . . . f f f f f f . . . . . 
            . . . f f e e e e f 2 f . . . . 
            . . f f e e e e f 2 2 2 f . . . 
            . . f e e e f f e e e e f . . . 
            . . f f f f e e 2 2 2 2 e f . . 
            . . f e 2 2 2 f f f f e 2 f . . 
            . f f f f f f f e e e f f f . . 
            . f f e 4 4 e b f 4 4 e e f . . 
            . f e e 4 d 4 1 f d d e f f . . 
            . . f e e e 4 d d d d f d d f . 
            . . . f f e e 4 e e e f b b f . 
            . . . . f 2 2 2 4 d d e b b f . 
            . . . . e 2 2 2 e d d e b f . . 
            . . . . f 4 4 4 f e e f f . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . f f f . . . . . . . 
            `)
    } else if (controller.left.isPressed()) {
        direction = -1
        Sebastian.setImage(img`
            . . . . . f f f f f f . . . . . 
            . . . . f 2 f e e e e f f . . . 
            . . . f 2 2 2 f e e e e f f . . 
            . . . f e e e e f f e e e f . . 
            . . f e 2 2 2 2 e e f f f f . . 
            . . f 2 e f f f f 2 2 2 e f . . 
            . . f f f e e e f f f f f f f . 
            . . f e e 4 4 f b e 4 4 e f f . 
            . . f f e d d f 1 4 d 4 e e f . 
            . f d d f d d d d 4 e e e f . . 
            . f b b f e e e 4 e e f f . . . 
            . f b b e d d 4 2 2 2 f . . . . 
            . . f b e d d e 2 2 2 e . . . . 
            . . . f f e e f 4 4 4 f . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f f . . . . . . 
            `)
    }
})
// Level 1 + 2
game.onUpdate(function () {
    // enemy
    // 
    if (bat.tileKindAt(TileDirection.Left, sprites.dungeon.collectibleBlueCrystal)) {
        bat.vx = 50
    } else if (bat.tileKindAt(TileDirection.Right, sprites.dungeon.doorLockedWest)) {
        bat.vx = -50
    }
    if (loaded > 0) {
        Sebastian.say(loaded)
    } else {
        Sebastian.say("")
    }
    if (boss_life <= 0) {
        monster.destroy(effects.disintegrate, 500)
    }
    if (monster.top <= 32) {
        monster.vy = 50
    } else if (monster.bottom >= 110) {
        monster.vy = -50
    }
})
