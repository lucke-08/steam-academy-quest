namespace SpriteKind {
    export const CorrectCoin = SpriteKind.create()
    export const WrongCoin = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const UI = SpriteKind.create()
}
function InitializeLvl2NPC() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 2.5
    info.setLife(0)
    MoveMode = 2
    PlayerSprite.setPosition(80, 60)
    scene.setBackgroundImage(assets.image`myImage24`)
    scene.centerCameraAt(80, 60)
    PlayerSprite.setStayInScreen(true)
    PlayerSprite.setPosition(80, 60)
    tiles.setCurrentTilemap(tilemap`level3`)
    controller.moveSprite(PlayerSprite)
    PlayerSprite.ay = 0
    Lvl2NPCsprite = sprites.create(assets.image`myImage27`, SpriteKind.NPC)
    Lvl2NPCsprite.setPosition(110, 60)
    Lvl2NPCsprite.sayText("...")
}
function NPCdialogLVL1(NPCsprite: Sprite) {
    controller.moveSprite(PlayerSprite, 0, 0)
    PlayerSprite.setPosition(160 - NPCsprite.x, NPCsprite.y)
    scelta = AskMultichoice(["Si, come le riconosco?", "Ok, cosa devo fare?"], NPCsprite, "Benvenuto nel laboratorio!|Stiamo conducendo un esperimento a gruppi|ma ci servono soluzioni di solfato di rame per completarlo. Puoi aiutarci?".split("|"))
    if (scelta == 0) {
        scelta = AskMultichoice(["Perchè azzurro?", "Se tocco altri colori?"], NPCsprite, "Sono dei liquidi dentro a delle beute|troverai soluzioni di vari colori|ma prendi solo quelle di colore azzurro!".split("|"))
        if (scelta == 0) {
            scelta = AskMultichoice(["Se tocco altri colori?", "Il rame è azzurro?"], NPCsprite, "Ci serve il solfato di rame|che è di colore azzurro.".split("|"))
            if (scelta == 0) {
                scelta = AskMultichoice(["Ok allora sono pronto!"], NPCsprite, "Non lo fare, rischi di perdere vite|ma non ti so dire bene, ogni liquido potrebbe avere effetti vari|non ti conviene scoprirlo.".split("|"))
                scelta = AskMultichoice(["Ah chiaro, ora cerco!"], NPCsprite, "Aspetta! Scusa dimenticavo di dirti che servono 4 beute|una per gruppo del esperimento.".split("|"))
                InitializeLvl1()
                return 0
            } else if (scelta == 1) {
                scelta = AskMultichoice(["E gli altri liquidi?", "Esploro l'aula allora"], NPCsprite, "Il solfato di rame dissolto in acqua si|comunque scoprirai tutta la chimica meglio il prossimo anno in classe.".split("|"))
                if (scelta == 0) {
                    scelta = AskMultichoice(["Ok allora sono pronto!"], NPCsprite, "Non ti so dire, non so cosa vedrai|ma per sicurezza stacci lontano per evitare inconvenienti|potresti subire effetti negativi.".split("|"))
                    scelta = AskMultichoice(["Ah chiaro, ora cerco!"], NPCsprite, "Aspetta! Scusa dimenticavo di dirti che servono 4 beute|una per gruppo del esperimento.".split("|"))
                    InitializeLvl1()
                    return 0
                }
            }
        } else if (scelta == 1) {
            scelta = AskMultichoice(["Ok allora sono pronto!"], NPCsprite, "Non lo fare, rischi di perdere vite|ma non ti so dire bene, ogni liquido potrebbe avere effetti vari|non ti conviene scoprirlo.".split("|"))
            scelta = AskMultichoice(["Ah chiaro, ora cerco!"], NPCsprite, "Aspetta! Scusa dimenticavo di dirti che servono 4 beute|una per gruppo dell'esperimento.".split("|"))
            InitializeLvl1()
            return 0
        }
    } else if (scelta == 1) {
        scelta = AskMultichoice(["Perché gli altri no?", "Il rame è azzurro?"], NPCsprite, "Cerca 4 beute di liquido azzurro, una per ogni gruppo|attenzione perché vedrai vari tipi di soluzioni|ma non toccare gli altri oggetti.".split("|"))
        if (scelta == 0) {
            scelta = AskMultichoice(["Ok allora sono pronto!"], NPCsprite, "Potrebbero essere pericolosi|potrebbero farti perdere vite o avere altri effetti imprevedibili|non ti consiglio di scoprirli.".split("|"))
            InitializeLvl1()
            return 0
        } else if (scelta == 1) {
            scelta = AskMultichoice(["E gli altri liquidi?", "Esploro l'aula allora"], NPCsprite, "Il solfato di rame dissolto in acqua si|comunque scoprirai tutta la chimica meglio l'anno prossimo in classe.".split("|"))
            if (scelta == 0) {
                scelta = AskMultichoice(["Ok allora sono pronto!"], NPCsprite, "Non ti so dire, non so cosa vedrai|ma per sicurezza stacci lontano per evitare inconvenienti|potresti subire effetti negativi.".split("|"))
                InitializeLvl1()
                return 0
            }
        }
    }
    controller.moveSprite(PlayerSprite)
    NPCsprite.sayText("...")
    while (game.runtime() - pauseTme < temp4) {
        pause(100)
        NPCsprite.sayText("...")
    }
    return 0
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MoveMode == 1) {
        simplified.gravity_jump(PlayerSprite)
    }
    lastButton = "up"
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (HiddenScore == 4 && PlayerSprite.x > 1590 && RunningLevel == 1) {
        InitializeLvl2NPC()
    } else if (HiddenScore == 4 && PlayerSprite.x > 1590 && RunningLevel == 2) {
        InitializeLvl3NPC()
    } else if (HiddenScore == 1 && PlayerSprite.x > 1590 && RunningLevel == 3) {
        InitializeLvl4NPC()
    } else if (HiddenScore >= 1 && PlayerSprite.x > 1590 && RunningLevel == 4) {
        InitializeLvl5NPC()
    } else if (HiddenScore == 10 && PlayerSprite.x > 1590 && RunningLevel == 5) {
        game.gameOver(true)
    } else if (HiddenScore != 4 && PlayerSprite.x > 1590 && RunningLevel == 1) {
        game.splash("Non hai preso tutte 4", "le beute azzurre")
    } else if (HiddenScore != 4 && PlayerSprite.x > 1590 && RunningLevel == 2) {
        game.splash("Non hai preso tutti 4", "i mattoncini di Lego rossi")
    } else if (HiddenScore != 1 && PlayerSprite.x > 1590 && RunningLevel == 3) {
        game.splash("Non hai trovato Pepper, al", "pNon hai trovato il disegno")
    } else if (HiddenScore < 1 && PlayerSprite.x > 1590 && RunningLevel == 4) {
        game.splash("Non hai trovato il disegno", "non vuoi prendere 4!")
    } else if (HiddenScore != 10 && PlayerSprite.x > 1590 && RunningLevel == 5) {
        game.splash("Non hai ancora preso", "tutti i numeri")
    }
})
function InitializeLvl3() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 3
    info.setLife(1)
    HiddenScore = 0
    MoveMode = 1
    temp5 = 0
    scene.cameraFollowSprite(PlayerSprite)
    scene.setBackgroundImage(assets.image`myImage`)
    tiles.setCurrentTilemap(tilemap`level 0`)
    temp6 = tiles.getTilesByType(tiles.util.arrow0)._pickRandom()
    CorrectCoinSprite = sprites.create(assets.image`myImage23`, SpriteKind.CorrectCoin)
    tiles.setTileAt(temp6, assets.tile`transparency16`)
    tiles.placeOnTile(CorrectCoinSprite, temp6)
    for (let value of tiles.getTilesByType(tiles.util.arrow0)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    sprites.destroy(LabelText)
    sprites.destroy(LabelText2)
    sprites.destroy(LabelText3)
    LabelText = textsprite.create("              RAGGIUNGI LA FINE              ", 15, 1)
    LabelText2 = textsprite.create("      DOPO AVER TROVATO PEPPER      ", 15, 1)
    LabelText3 = textsprite.create("", 1, 2)
    LabelText.setBorder(1, 15, 0)
    LabelText2.setBorder(1, 15, 0)
    LabelText3.setBorder(1, 3, 1)
    LabelText3.setIcon(img`
        2 2 . . . . . 2 2 
        2 2 2 . . . 2 2 2 
        . 2 2 2 . 2 2 2 . 
        . . 2 2 2 2 2 . . 
        . . . 2 2 2 . . . 
        . . 2 2 2 2 2 . . 
        . 2 2 2 . 2 2 2 . 
        2 2 2 . . . 2 2 2 
        2 2 . . . . . 2 2 
        `)
    PlayerSprite.setPosition(96, 264)
    controller.moveSprite(PlayerSprite, 100, 0)
    PlayerSprite.ay = 500
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    temp2 = 1
    lastButton = ""
    dialogButtonUI.setFlag(SpriteFlag.Invisible, false)
    pause(50)
    if (lastButton == "A" && RunningLevel == 1.5) {
        NPCdialogLVL1(otherSprite)
    } else if (lastButton == "A" && RunningLevel == 2.5) {
        NPCdialogLVL2(otherSprite)
    } else if (lastButton == "A" && RunningLevel == 3.5) {
        NPCdialogLVL3(otherSprite)
    } else if (lastButton == "A" && RunningLevel == 4.5) {
        NPCdialogLVL4(otherSprite)
    } else if (lastButton == "A" && RunningLevel == 5.5) {
        NPCdialogLVL5(otherSprite)
    }
})
function InitializeLvl1NPC() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 1.5
    info.setLife(0)
    MoveMode = 2
    scene.setBackgroundImage(assets.image`myImage25`)
    scene.centerCameraAt(80, 60)
    PlayerSprite.setStayInScreen(true)
    PlayerSprite.setPosition(80, 60)
    tiles.setCurrentTilemap(tilemap`level3`)
    controller.moveSprite(PlayerSprite)
    PlayerSprite.ay = 0
    Lvl1NPCsprite = sprites.create(assets.image`myImage26`, SpriteKind.NPC)
    Lvl1NPCsprite.setPosition(110, 60)
    Lvl1NPCsprite.sayText("...")
}
function InitializeLvl2() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 2
    info.setLife(5)
    HiddenScore = 0
    MoveMode = 1
    temp5 = 0
    scene.cameraFollowSprite(PlayerSprite)
    scene.setBackgroundImage(assets.image`myImage`)
    tiles.setCurrentTilemap(tilemap`level 2`)
    for (let value2 of tiles.getTilesByType(tiles.util.arrow0)) {
        CorrectCoinSprite = sprites.create(assets.image`myImage6`, SpriteKind.CorrectCoin)
        tiles.setTileAt(value2, assets.tile`transparency16`)
        tiles.placeOnTile(CorrectCoinSprite, value2)
    }
    for (let value22 of tiles.getTilesByType(tiles.util.object0)) {
        Item1Coin = sprites.create(assets.image`myImage10`, SpriteKind.WrongCoin)
        tiles.setTileAt(value22, assets.tile`transparency16`)
        tiles.placeOnTile(Item1Coin, value22)
    }
    for (let value3 of tiles.getTilesByType(tiles.util.object2)) {
        Item2Coin = sprites.create(assets.image`myImage9`, SpriteKind.WrongCoin)
        tiles.setTileAt(value3, assets.tile`transparency16`)
        tiles.placeOnTile(Item2Coin, value3)
    }
    for (let value4 of tiles.getTilesByType(tiles.util.object8)) {
        Item3Coin = sprites.create(assets.image`myImage8`, SpriteKind.WrongCoin)
        tiles.setTileAt(value4, assets.tile`transparency16`)
        tiles.placeOnTile(Item3Coin, value4)
    }
    for (let value5 of tiles.getTilesByType(tiles.util.object10)) {
        Item4Coin = sprites.create(assets.image`myImage7`, SpriteKind.WrongCoin)
        tiles.setTileAt(value5, assets.tile`transparency16`)
        tiles.placeOnTile(Item4Coin, value5)
    }
    sprites.destroy(LabelText)
    sprites.destroy(LabelText2)
    sprites.destroy(LabelText3)
    LabelText = textsprite.create("              RAGGIUNGI LA FINE              ", 15, 1)
    LabelText2 = textsprite.create("      CON TUTTI 4 I MATTONCINI      ", 15, 1)
    LabelText3 = textsprite.create("", 1, 2)
    LabelText.setBorder(1, 15, 0)
    LabelText2.setBorder(1, 15, 0)
    LabelText3.setBorder(1, 3, 1)
    PlayerSprite.setPosition(96, 264)
    controller.moveSprite(PlayerSprite, 100, 0)
    PlayerSprite.ay = 500
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    lastButton = "B"
})
function InitializeLvl4NPC() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 4.5
    info.setLife(0)
    MoveMode = 2
    scene.setBackgroundImage(assets.image`myImage24`)
    scene.centerCameraAt(80, 60)
    PlayerSprite.setStayInScreen(true)
    PlayerSprite.setPosition(80, 60)
    tiles.setCurrentTilemap(tilemap`level3`)
    controller.moveSprite(PlayerSprite)
    PlayerSprite.ay = 0
    Lvl2NPCsprite = sprites.create(assets.image`myImage29`, SpriteKind.NPC)
    Lvl2NPCsprite.setPosition(110, 60)
    Lvl2NPCsprite.sayText("...")
}
function InitializeLvl3NPC() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 3.5
    info.setLife(0)
    MoveMode = 2
    scene.setBackgroundImage(assets.image`myImage24`)
    scene.centerCameraAt(80, 60)
    PlayerSprite.setStayInScreen(true)
    PlayerSprite.setPosition(80, 60)
    tiles.setCurrentTilemap(tilemap`level3`)
    controller.moveSprite(PlayerSprite)
    PlayerSprite.ay = 0
    Lvl2NPCsprite = sprites.create(assets.image`myImage28`, SpriteKind.NPC)
    Lvl2NPCsprite.setPosition(110, 60)
    Lvl2NPCsprite.sayText("...")
}
function NPCdialogLVL5(NPCsprite: Sprite) {
    controller.moveSprite(PlayerSprite, 0, 0)
    PlayerSprite.setPosition(160 - NPCsprite.x, NPCsprite.y)
    scelta = AskMultichoice(["Ok, vado subito!"], NPCsprite, "Benvenuto! vai a prendere i numeri in ordine cresciente|se ne prendi uno nel momento sbagliato perdi una vita, attenzione!".split("|"))
    if (scelta == 0){
        InitializeLvl5()
    }
    controller.moveSprite(PlayerSprite)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    lastButton = "A"
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    info.changeLifeBy(-99)
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    lastButton = "right"
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    lastButton = "left"
})
function AskMultichoice(playerOptions: any[], NPCsprite: Sprite, NPCoptions: string[]) {
    controller.moveSprite(PlayerSprite, 0, 0)
    Temp3list = NPCoptions
    for (let value6 of Temp3list) {
        temp4 = value6.length * 80
        pauseTme = game.runtime()
        lastButton = ""
        temp1 = 1
        NPCsprite.sayText(value6, temp4, true)
        while (game.runtime() - pauseTme < temp4 && temp1 == 1) {
            pause(50)
            if (lastButton != "") {
                if (lastButton == "A") {
                    temp1 = 2
                }
                if (lastButton == "B") {
                    NPCsprite.sayText("")
                    controller.moveSprite(PlayerSprite)
                    return -1
                }
                lastButton = ""
            }
        }
    }
    playerOptionsSelected = 0
    NPCoptionsSelected = NPCoptions.length
    playerDialogUI.setFlag(SpriteFlag.Invisible, false)
    StartDialod(playerOptions, playerOptionsSelected)
    lastButton = ""
    temp1 = 1
    while (temp1 == 1) {
        pause(50)
        NPCsprite.sayText(NPCoptions[NPCoptionsSelected - 1])
        while (lastButton != "") {
            if (lastButton == "up") {
                if (playerOptionsSelected - 1 >= 0) {
                    playerOptionsSelected = playerOptionsSelected - 1
                    StartDialod(playerOptions, playerOptionsSelected)
                }
            }
            if (lastButton == "down") {
                if (playerOptionsSelected + 1 < playerOptions.length) {
                    playerOptionsSelected = playerOptionsSelected + 1
                    StartDialod(playerOptions, playerOptionsSelected)
                }
            }
            if (lastButton == "right") {
                if (NPCoptionsSelected + 1 <= NPCoptions.length) {
                    NPCoptionsSelected = NPCoptionsSelected + 1
                }
            }
            if (lastButton == "left") {
                if (NPCoptionsSelected - 1 >= 1) {
                    NPCoptionsSelected = NPCoptionsSelected - 1
                }
            }
            if (lastButton == "A") {
                temp1 = 2
            }
            if (lastButton == "B") {
                temp1 = 2
                playerOptionsSelected = -1
            }
            lastButton = ""
        }
    }
    controller.moveSprite(PlayerSprite)
    playerDialogUI.setFlag(SpriteFlag.Invisible, true)
    textSprite1.setFlag(SpriteFlag.Invisible, true)
    textSprite2.setFlag(SpriteFlag.Invisible, true)
    return playerOptionsSelected
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.WrongCoin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 200)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    lastButton = "right"
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    info.changeLifeBy(-99)
})
function InitializeLvl5() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 5
    info.setLife(2)
    HiddenScore = 0
    MoveMode = 1
    temp5 = 0
    scene.cameraFollowSprite(PlayerSprite)
    scene.setBackgroundImage(assets.image`myImage`)
    tiles.setCurrentTilemap(tilemap`level 4`)
    numberTextures = [
        assets.image`myImage13`,
        assets.image`myImage15`,
        assets.image`myImage16`,
        assets.image`myImage14`,
        assets.image`myImage17`,
        assets.image`myImage19`,
        assets.image`myImage20`,
        assets.image`myImage21`,
        assets.image`myImage22`,
        assets.image`myImage18`
    ]
    NumberLocations = []
    NumberLocationsCoords = []
    for (let index = 0; index <= 9; index++) {
        NumberLocations.push(tiles.getTilesByType(tiles.util.arrow0)._pickRandom())
        NumberLocationsCoords.push("" + NumberLocations[NumberLocations.length - 1].x + "," + NumberLocations[NumberLocations.length - 1].y)
        CorrectCoinSprite = sprites.create(numberTextures[index], SpriteKind.CorrectCoin)
        tiles.setTileAt(NumberLocations[NumberLocations.length - 1], assets.tile`transparency16`)
        tiles.placeOnTile(CorrectCoinSprite, NumberLocations[NumberLocations.length - 1])
    }
    for (let value622 of tiles.getTilesByType(tiles.util.arrow0)) {
        tiles.setTileAt(value622, assets.tile`transparency16`)
    }
    sprites.destroy(LabelText)
    sprites.destroy(LabelText2)
    sprites.destroy(LabelText3)
    LabelText = textsprite.create("      RACCOGLI I 10 NUMERI IN      ", 15, 1)
    LabelText2 = textsprite.create("   ORDINE E RAGGIUNGI LA FINE   ", 15, 1)
    LabelText3 = textsprite.create("", 1, 2)
    LabelText.setBorder(1, 15, 0)
    LabelText2.setBorder(1, 15, 0)
    LabelText3.setBorder(1, 3, 1)
    PlayerSprite.setPosition(96, 264)
    controller.moveSprite(PlayerSprite, 100, 0)
    PlayerSprite.ay = 500
}
function InitializeLvl5NPC() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 5.5
    info.setLife(0)
    MoveMode = 2
    scene.setBackgroundImage(assets.image`myImage25`)
    scene.centerCameraAt(80, 60)
    PlayerSprite.setStayInScreen(true)
    PlayerSprite.setPosition(80, 60)
    tiles.setCurrentTilemap(tilemap`level3`)
    controller.moveSprite(PlayerSprite)
    PlayerSprite.ay = 0
    Lvl1NPCsprite = sprites.create(assets.image`myImage30`, SpriteKind.NPC)
    Lvl1NPCsprite.setPosition(110, 60)
    Lvl1NPCsprite.sayText("...")
}
function NPCdialogLVL3(NPCsprite: Sprite) {
    controller.moveSprite(PlayerSprite, 0, 0)
    PlayerSprite.setPosition(160 - NPCsprite.x, NPCsprite.y)
    scelta = AskMultichoice(["Ok, come è fatto?"], NPCsprite, "Il nostro robot Pepper è sparito!|Senza di lui non possiamo fare lezione di informatica.|Puoi aiutarci a trovarlo?".split("|"))
    if (scelta == 0) {
        scelta = AskMultichoice(["Non posso morire?"], NPCsprite, "Pepper è alto e bianco, si fa riconoscere|appena vedrai un robot prendilo, è sicuramente Pepper".split("|"))
        if (scelta == 0) {
            scelta = AskMultichoice(["Ok sembra facile..."], NPCsprite, "Solo con la lava|non ci saranno altri oggetti pericolosi, per ora...".split("|"))
            if (scelta == 0) {
                scelta = AskMultichoice(["Grazie! Cerco Pepper"], NPCsprite, "Vedremo, buona fortuna allora!".split("|"))
                if (scelta == 0) {
                    InitializeLvl3()
                    return 0
                }
            }
        }
    }
    controller.moveSprite(PlayerSprite)
    NPCsprite.sayText("...")
    while (game.runtime() - pauseTme < temp4) {
        pause(100)
        NPCsprite.sayText("...")
    }
    return 0
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    lastButton = "down"
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    lastButton = "down"
})
function FormatDialog(options: any[], selectedindex: number) {
    tempOptions = []
    index2 = 0
    for (let value62 of options) {
        tempOptions.push("" + (index2 + 1) + ". " + value62)
        index2 += 1
    }
    return tempOptions
}
info.onLifeZero(function () {
    if (RunningLevel == 1) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        game.splash("Sei morto!", "Impara dagli errori")
        InitializeLvl1()
    } else if (RunningLevel == 2) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        game.splash("Sei morto!", "Impara dagli errori")
        InitializeLvl2()
    } else if (RunningLevel == 3) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        game.splash("Sei morto!", "Impara dagli errori")
        InitializeLvl3()
    } else if (RunningLevel == 4) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        game.splash("Sei morto!", "Impara dagli errori")
        InitializeLvl4()
    } else if (RunningLevel == 5) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        game.splash("Sei morto!", "Impara dagli errori")
        InitializeLvl5()
    }
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    lastButton = "A"
})
function InitializeLvl1() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 1
    info.setLife(5)
    HiddenScore = 0
    MoveMode = 1
    temp5 = 0
    scene.cameraFollowSprite(PlayerSprite)
    scene.setBackgroundImage(assets.image`myImage`)
    tiles.setCurrentTilemap(tilemap`level 1`)
    for (let value6222 of tiles.getTilesByType(tiles.util.arrow0)) {
        CorrectCoinSprite = sprites.create(assets.image`myImage1`, SpriteKind.CorrectCoin)
        tiles.setTileAt(value6222, assets.tile`transparency16`)
        tiles.placeOnTile(CorrectCoinSprite, value6222)
    }
    for (let value222 of tiles.getTilesByType(tiles.util.object0)) {
        Item1Coin = sprites.create(assets.image`myImage2`, SpriteKind.WrongCoin)
        tiles.setTileAt(value222, assets.tile`transparency16`)
        tiles.placeOnTile(Item1Coin, value222)
    }
    for (let value32 of tiles.getTilesByType(tiles.util.object2)) {
        Item2Coin = sprites.create(assets.image`myImage4`, SpriteKind.WrongCoin)
        tiles.setTileAt(value32, assets.tile`transparency16`)
        tiles.placeOnTile(Item2Coin, value32)
    }
    for (let value42 of tiles.getTilesByType(tiles.util.object8)) {
        Item3Coin = sprites.create(assets.image`myImage3`, SpriteKind.WrongCoin)
        tiles.setTileAt(value42, assets.tile`transparency16`)
        tiles.placeOnTile(Item3Coin, value42)
    }
    for (let value52 of tiles.getTilesByType(tiles.util.object10)) {
        Item4Coin = sprites.create(assets.image`myImage5`, SpriteKind.WrongCoin)
        tiles.setTileAt(value52, assets.tile`transparency16`)
        tiles.placeOnTile(Item4Coin, value52)
    }
    sprites.destroy(LabelText)
    sprites.destroy(LabelText2)
    sprites.destroy(LabelText3)
    LabelText = textsprite.create("              RAGGIUNGI LA FINE              ", 15, 1)
    LabelText2 = textsprite.create("            CON TUTTE 4 LE BEUTE            ", 15, 1)
    LabelText3 = textsprite.create("", 1, 2)
    LabelText.setBorder(1, 15, 0)
    LabelText2.setBorder(1, 15, 0)
    LabelText3.setBorder(1, 3, 1)
    PlayerSprite.setPosition(80, 248)
    controller.moveSprite(PlayerSprite, 100, 0)
    PlayerSprite.ay = 500
}
function StartDialod(playerChoices: any[], selectedIndex: number) {
    if (playerChoices.length == 2) {
        textSprite1.setFlag(SpriteFlag.Invisible, false)
        textSprite2.setFlag(SpriteFlag.Invisible, false)
        if (selectedIndex == 0) {
            sprites.destroy(textSprite1)
            textSprite1 = textsprite.create("", 1, 4)
            textSprite1.setIcon(img`
                . . . . . . . . 
                4 4 . . . . . . 
                4 4 4 4 . . . . 
                4 4 4 4 4 4 . . 
                4 4 4 4 4 4 . . 
                4 4 4 4 . . . . 
                4 4 . . . . . . 
                . . . . . . . . 
                `)
        } else {
            sprites.destroy(textSprite1)
            textSprite1 = textsprite.create("", 1, 15)
            textSprite1.setIcon(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                `)
        }
        if (selectedIndex == 1) {
            sprites.destroy(textSprite2)
            textSprite2 = textsprite.create("", 1, 4)
            textSprite2.setIcon(img`
                . . . . . . . . 
                4 4 . . . . . . 
                4 4 4 4 . . . . 
                4 4 4 4 4 4 . . 
                4 4 4 4 4 4 . . 
                4 4 4 4 . . . . 
                4 4 . . . . . . 
                . . . . . . . . 
                `)
        } else {
            sprites.destroy(textSprite2)
            textSprite2 = textsprite.create("", 1, 15)
            textSprite2.setIcon(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                `)
        }
        textSprite1.setPosition(13, 80)
        textSprite2.setPosition(13, 80)
        textSprite1.y += 10
        textSprite2.y += 20
        textSprite1.setText(playerChoices[0])
        textSprite2.setText(playerChoices[1])
    }
    if (playerChoices.length == 1) {
        textSprite1.setFlag(SpriteFlag.Invisible, false)
        sprites.destroy(textSprite1)
        textSprite1 = textsprite.create("", 1, 4)
        textSprite1.setIcon(img`
            . . . . . . . . 
            4 4 . . . . . . 
            4 4 4 4 . . . . 
            4 4 4 4 4 4 . . 
            4 4 4 4 4 4 . . 
            4 4 4 4 . . . . 
            4 4 . . . . . . 
            . . . . . . . . 
            `)
        textSprite1.setPosition(13, 92)
        textSprite1.setText(playerChoices[0])
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.CorrectCoin, function (sprite, otherSprite) {
    if (RunningLevel == 4) {
        sprites.destroy(otherSprite, effects.confetti, 200)
        sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin, effects.ashes, 100)
        HiddenScore = 1
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    } else if (RunningLevel == 5) {
        if (HiddenScore == NumberLocationsCoords.indexOf("" + otherSprite.x + "," + otherSprite.y)) {
            sprites.destroy(otherSprite, effects.confetti, 200)
            HiddenScore += 1
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        } else {
            info.changeLifeBy(-1)
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
            otherSprite.startEffect(effects.fire, 200)
            pauseUntil(() => !(PlayerSprite.overlapsWith(otherSprite)))
        }
    } else {
        sprites.destroy(otherSprite, effects.confetti, 200)
        HiddenScore += 1
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    }
})
function NPCdialogLVL2(NPCsprite: Sprite) {
    controller.moveSprite(PlayerSprite, 0, 0)
    PlayerSprite.setPosition(160 - NPCsprite.x, NPCsprite.y)
    scelta = AskMultichoice(["Sì, certo. Come?"], NPCsprite, "Benvenuto in aula di tecnologia!|Stiamo lavorando al nostro robot per la gara di robotica First LEGO League.|Ci mancano dei pezzi. Puoi aiutarci?".split("|"))
    if (scelta == 0) {
        scelta = AskMultichoice(["Perché rossi?", "Che succede se erro?"], NPCsprite, "Devi trovare i mattoncini rossi lungo il percorso.|Sono essenziali per la costruzione del robot!".split("|"))
        if (scelta == 0) {
            scelta = AskMultichoice(["Che succede se erro?", "Dove li trovo?"], NPCsprite, "Abbiamo scelto i mattoncini rossi per i pezzi strutturali|così li riconosci più facilmente dagli altri!".split("|"))
            if (scelta == 0) {
                scelta = AskMultichoice(["Dove li trovo?", "Devo evitare ostacoli?"], NPCsprite, "Se prendi mattoncini di altri colori, il robot non funzionerà|perderai una vita per ogni errore.".split("|"))
                if (scelta == 0) {
                    scelta = AskMultichoice(["Devo evitare ostacoli?", "Ok, vado subito!"], NPCsprite, "Troverai i mattoncini rossi lungo il percorso.|Alcuni sono in bella vista, altri nascosti vicino agli ostacoli.".split("|"))
                    if (scelta == 0) {
                        scelta = AskMultichoice(["Ok, vado subito!"], NPCsprite, "Attento agli ostacoli, i mattoncini possono trovarsi in posti difficili.|Ma non prendere quelli sbagliati!".split("|"))
                        InitializeLvl2()
                        return 0
                    } else if (scelta == 1) {
                        InitializeLvl2()
                        return 0
                    }
                } else if (scelta == 1) {
                    scelta = AskMultichoice(["Dove li trovo?", "Ok, vado subito!"], NPCsprite, "Attento agli ostacoli, i mattoncini possono trovarsi in posti difficili.|Ma non prendere quelli sbagliati!".split("|"))
                    if (scelta == 0) {
                        scelta = AskMultichoice(["Ok, vado subito!"], NPCsprite, "Troverai i mattoncini rossi lungo il percorso.|Alcuni sono in bella vista, altri nascosti vicino agli ostacoli.".split("|"))
                        InitializeLvl2()
                        return 0
                    } else if (scelta == 1) {
                        InitializeLvl2()
                        return 0
                    }
                }
            } else if (scelta == 1) {
                scelta = AskMultichoice(["Devo evitare ostacoli?", "Che succede se erro?"], NPCsprite, "Troverai i mattoncini rossi lungo il percorso.|Alcuni sono in bella vista, altri nascosti vicino agli ostacoli.".split("|"))
                if (scelta == 0) {
                    scelta = AskMultichoice(["Che succede se erro?", "Ok, vado subito!"], NPCsprite, "Attento agli ostacoli, i mattoncini possono trovarsi in posti difficili.|Ma non prendere quelli sbagliati!".split("|"))
                    if (scelta == 0) {
                        scelta = AskMultichoice(["Ok, vado subito!"], NPCsprite, "Se prendi mattoncini di altri colori, il robot non funzionerà|perderai una vita per ogni errore.".split("|"))
                        InitializeLvl2()
                        return 0
                    } else if (scelta == 1) {
                        InitializeLvl2()
                        return 0
                    }
                } else if (scelta == 1) {
                    scelta = AskMultichoice(["Devo evitare ostacoli?", "Ok, vado subito!"], NPCsprite, "Se prendi mattoncini di altri colori, il robot non funzionerà|perderai una vita per ogni errore.".split("|"))
                    if (scelta == 0) {
                        scelta = AskMultichoice(["Ok, vado subito!"], NPCsprite, "Attento agli ostacoli, i mattoncini possono trovarsi in posti difficili.|Ma non prendere quelli sbagliati!".split("|"))
                        InitializeLvl2()
                        return 0
                    } else if (scelta == 1) {
                        InitializeLvl2()
                        return 0
                    }
                }
            }
        } else if (scelta == 1) {
            scelta = AskMultichoice(["Dove li trovo?", "Devo evitare ostacoli?"], NPCsprite, "Se prendi mattoncini di altri colori, il robot non funzionerà|perderai una vita per ogni errore.".split("|"))
            if (scelta == 0) {
                scelta = AskMultichoice(["Devo evitare ostacoli?", "Ok, vado subito!"], NPCsprite, "Troverai i mattoncini rossi lungo il percorso.|Alcuni sono in bella vista, altri nascosti vicino agli ostacoli.".split("|"))
                if (scelta == 0) {
                    scelta = AskMultichoice(["Ok, vado subito!"], NPCsprite, "Attento agli ostacoli, i mattoncini possono trovarsi in posti difficili.|Ma non prendere quelli sbagliati!".split("|"))
                    InitializeLvl2()
                    return 0
                } else if (scelta == 1) {
                    InitializeLvl2()
                    return 0
                }
            } else if (scelta == 1) {
                scelta = AskMultichoice(["Dove li trovo?", "Ok, vado subito!"], NPCsprite, "Attento agli ostacoli, i mattoncini possono trovarsi in posti difficili.|Ma non prendere quelli sbagliati!".split("|"))
                if (scelta == 0) {
                    scelta = AskMultichoice(["Ok, vado subito!"], NPCsprite, "Troverai i mattoncini rossi lungo il percorso.|Alcuni sono in bella vista, altri nascosti vicino agli ostacoli.".split("|"))
                    InitializeLvl2()
                    return 0
                } else if (scelta == 1) {
                    InitializeLvl2()
                    return 0
                }
            }
        }
    } else if (scelta == 1) {
        return 0
    }
    controller.moveSprite(PlayerSprite)
    NPCsprite.sayText("...")
    while (game.runtime() - pauseTme < temp4) {
        pause(100)
        NPCsprite.sayText("...")
    }
    return 0
}
function NPCdialogLVL4(NPCsprite: Sprite) {
    controller.moveSprite(PlayerSprite, 0, 0)
    PlayerSprite.setPosition(160 - NPCsprite.x, NPCsprite.y)
    scelta = AskMultichoice(["Si ricordo"], NPCsprite, "Salve, ti ho chiamato qui oggi perché dobbiamo parlare|di un disegno che mi dovevi consegnare al exam week.".split("|"))
    if (scelta == 0) {
        scelta = AskMultichoice(["Un paesaggio solare"], NPCsprite, "Ho visto mentre lo facevi ed era molto bello|ma non lo ho più trovato quando lo dovevo valutare.|Mi ricordi cosa raffigurasse?".split("|"))
        if (scelta == 0) {
            scelta = AskMultichoice(["Sai altro a riguardo?"], NPCsprite, "Ahh ecco ora ricordo!|Certo, lo ha nascosto la Lucetta, ma ho dimenticato di farmelo restituire.|Il quadro è ben nascosoto, pensa fuori dagli schemi, pensa in modo creativo.".split("|"))
            if (scelta == 0) {
                scelta = AskMultichoice(["Grazie, vado a cercare"], NPCsprite, "Purtroppo no...|Hai raggiunto questo livello, so che ce la puoi fare|Buona fortuna!".split("|"))
                if (scelta == 0) {
                    InitializeLvl4()
                    return 0
                }
            }
        }
    }
    controller.moveSprite(PlayerSprite)
    NPCsprite.sayText("...")
    while (game.runtime() - pauseTme < temp4) {
        pause(100)
        NPCsprite.sayText("...")
    }
    return 0
}
function InitializeLvl4() {
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.CorrectCoin)
    sprites.destroyAllSpritesOfKind(SpriteKind.WrongCoin)
    RunningLevel = 4
    info.setLife(1)
    HiddenScore = 0
    MoveMode = 1
    temp5 = 0
    scene.cameraFollowSprite(PlayerSprite)
    scene.setBackgroundImage(assets.image`myImage`)
    tiles.setCurrentTilemap(tilemap`level 5`)
    for (let value72 of tiles.getTilesByType(tiles.util.arrow0)) {
        CorrectCoinSprite = sprites.create(assets.image`myImage11`, SpriteKind.CorrectCoin)
        tiles.setTileAt(value72, assets.tile`transparency16`)
        tiles.placeOnTile(CorrectCoinSprite, value72)
    }
    for (let value23 of tiles.getTilesByType(tiles.util.object0)) {
        tiles.setTileAt(value23, assets.tile`transparency16`)
    }
    for (let value33 of tiles.getTilesByType(tiles.util.object2)) {
        tiles.setTileAt(value33, assets.tile`transparency16`)
    }
    for (let value43 of tiles.getTilesByType(tiles.util.object8)) {
        tiles.setTileAt(value43, assets.tile`transparency16`)
    }
    for (let value53 of tiles.getTilesByType(tiles.util.object10)) {
        tiles.setTileAt(value53, assets.tile`transparency16`)
    }
    sprites.destroy(LabelText)
    sprites.destroy(LabelText2)
    sprites.destroy(LabelText3)
    LabelText = textsprite.create("              RAGGIUNGI LA FINE              ", 15, 1)
    LabelText2 = textsprite.create("      CON IL QUADRO PERDUTO      ", 15, 1)
    LabelText3 = textsprite.create("", 1, 2)
    LabelText.setBorder(1, 15, 0)
    LabelText2.setBorder(1, 15, 0)
    LabelText3.setBorder(1, 3, 1)
    LabelText3.setIcon(img`
        2 2 . . . . . 2 2 
        2 2 2 . . . 2 2 2 
        . 2 2 2 . 2 2 2 . 
        . . 2 2 2 2 2 . . 
        . . . 2 2 2 . . . 
        . . 2 2 2 2 2 . . 
        . 2 2 2 . 2 2 2 . 
        2 2 2 . . . 2 2 2 
        2 2 . . . . . 2 2 
        `)
    PlayerSprite.setPosition(96, 264)
    controller.moveSprite(PlayerSprite, 100, 0)
    PlayerSprite.ay = 500
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    lastButton = "left"
})
let index2 = 0
let tempOptions: string[] = []
let NumberLocationsCoords: string[] = []
let NumberLocations: tiles.Location[] = []
let numberTextures: Image[] = []
let NPCoptionsSelected = 0
let playerOptionsSelected = 0
let temp1 = 0
let Item4Coin: Sprite = null
let Item3Coin: Sprite = null
let Item2Coin: Sprite = null
let Item1Coin: Sprite = null
let Lvl1NPCsprite: Sprite = null
let temp2 = 0
let CorrectCoinSprite: Sprite = null
let temp6: tiles.Location = null
let HiddenScore = 0
let lastButton = ""
let temp4 = 0
let pauseTme = 0
let scelta = 0
let Lvl2NPCsprite: Sprite = null
let MoveMode = 0
let LabelText3: TextSprite = null
let LabelText2: TextSprite = null
let LabelText: TextSprite = null
let textSprite2: TextSprite = null
let textSprite1: TextSprite = null
let dialogButtonUI: Sprite = null
let playerDialogUI: Sprite = null
let PlayerSprite: Sprite = null
let temp5 = 0
let RunningLevel = 0
let Temp3list: string[] = []
Temp3list = [""]
RunningLevel = 0
temp5 = 0
PlayerSprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
playerDialogUI = sprites.create(img`
    ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..
    .bd111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111db.
    bd1dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbd1db
    b1dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbd1b
    b1bd1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111db1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111b1b
    b1bd1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111db1b
    bd1bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1db
    bbd111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111dbb
    .bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.
    ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..
    `, SpriteKind.UI)
dialogButtonUI = sprites.create(img`
    . . . . 6 6 6 6 6 6 6 . . . . 
    . . 6 6 7 7 7 7 7 7 7 6 6 . . 
    . 6 6 7 7 7 8 8 8 7 7 7 6 6 . 
    . 6 7 7 7 8 8 7 8 8 7 7 7 6 . 
    . c 7 7 8 8 8 8 8 8 8 7 7 c . 
    . c 9 7 8 7 7 7 7 7 8 7 9 c . 
    . c 9 9 7 7 7 7 7 7 7 9 9 c . 
    . c 6 6 9 9 9 9 9 9 9 6 6 c . 
    c c 6 6 6 6 6 6 6 6 6 6 6 c c 
    c d c c 6 6 6 6 6 6 6 c c d c 
    c d d d c c c c c c c d d d c 
    c c b d d d d d d d d d b c c 
    c c c c c b b b b b c c c c c 
    c c b b b b b b b b b b b c c 
    . c c b b b b b b b b b c c . 
    . . . c c c c c c c c c . . . 
    `, SpriteKind.UI)
textSprite1 = textsprite.create("", 1, 15)
textSprite2 = textsprite.create("", 1, 15)
LabelText = textsprite.create("", 1, 15)
LabelText2 = textsprite.create("", 1, 15)
LabelText3 = textsprite.create("", 1, 15)
playerDialogUI.setFlag(SpriteFlag.Invisible, true)
dialogButtonUI.setFlag(SpriteFlag.Invisible, true)
textSprite1.setFlag(SpriteFlag.Invisible, true)
textSprite2.setFlag(SpriteFlag.Invisible, true)
LabelText.setFlag(SpriteFlag.Invisible, true)
LabelText2.setFlag(SpriteFlag.Invisible, true)
LabelText3.setFlag(SpriteFlag.Invisible, true)
playerDialogUI.setPosition(80, 93)
animation.runImageAnimation(
    dialogButtonUI,
    [img`
    ..........666666666666..........
    ........6667777777777666........
    ......66677777777777777666......
    .....6677777779999777777766.....
    ....667777779966669977777766....
    ....677777799668866117777776....
    ...66777779966877861197777766...
    ...66777799668677686699777766...
    ...88777796688888888669777788...
    ...88777788888888888888777788...
    ...88977888679999997688877988...
    ...88977886777777777768877988...
    ...88997777777777777777779988...
    ...88799777777777777777711788...
    ...88679997777777777779117688...
    ..cc866679999999999999976668cc..
    .ccbc6666679999999999766666cbcc.
    .fcbcc66666666666666666666ccbcf.
    .fcbbcc666666666666666666ccbdcf.
    .f8bbbccc66666666666666cccbddcf.
    .f8cbbbbccccccccccccccccbdddbcf.
    .f8ccbbbbbccccccccccccb111ddccf.
    .f6ccccbbbddddddddddddd111dcccf.
    .f6ccccccbbddddddddddddddbbcccf.
    .f6cccccccccccccbbbbbbbbbdbcccf.
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..ff6ccccccccbbbbbbbbbbbddbcff..
    ...ff6cccccccbbbbbbbbbbbddbff...
    ....ffcccccccbbbbbbbbbbbdbff....
    ......ffccccbbbbbbbbbbbbff......
    ........ffffffffffffffff........
    `, img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ..........888888888888..........
    ........8887777777777888........
    ......88877666666666677888......
    .....8877666667777666667788.....
    ....887666667788887766666788....
    ....866666677888888996666678....
    ...88666667788877889976666688...
    ...88666677888677688877666688...
    ...88666778888888888887766688...
    ...88667788888888888888776688...
    ..cc866788866777777668887668cc..
    .ccbc8668866666666666688668cbcc.
    .fcbcc86666666666666666668ccbcf.
    .fcbbcc886666666666666688ccbdcf.
    .f8bbbccc88888888888888cccbddcf.
    .f8cbbbbccccccccccccccccbdddbcf.
    .f8ccbbbbbccccccccccccb11dddccf.
    .f6ccccbbbdddddddddddd111ddcccf.
    .f6ccccccbbddddddddddd11dbbcccf.
    .f6cccccccccccccbbbbbbbbbdbcccf.
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..ff6ccccccccbbbbbbbbbbbddbcff..
    ...ff6cccccccbbbbbbbbbbbddbff...
    ....ffcccccccbbbbbbbbbbbdbff....
    ......ffccccbbbbbbbbbbbbff......
    ........ffffffffffffffff........
    `],
    300,
    true
)
dialogButtonUI.setPosition(138, 97)
InitializeLvl1NPC()
game.onUpdate(function () {
    if (RunningLevel == 2 || RunningLevel == 1) {
        LabelText3.setText("")
        if (HiddenScore == 4 && temp5 == 0) {
            sprites.destroy(LabelText3)
            LabelText3 = textsprite.create("", 1, 7)
            LabelText3.setBorder(1, 3, 1)
            temp5 = 1
        }
        LabelText.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 45)
        LabelText2.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 55)
        LabelText3.setPosition(scene.cameraProperty(CameraProperty.X) + 61, scene.cameraProperty(CameraProperty.Y) - 55)
        LabelText3.setText("" + HiddenScore + "/4")
    } else if (RunningLevel == 3 || RunningLevel == 4) {
        if (HiddenScore == 1 && temp5 == 0) {
            temp5 = 1
            LabelText3.setIcon(img`
                . . . . . . . . . 
                . . . . . . . . 7 
                . . . . . . . 7 7 
                7 . . . . . 7 7 7 
                7 7 . . . 7 7 7 . 
                7 7 7 . 7 7 7 . . 
                . 7 7 7 7 7 . . . 
                . . 7 7 7 . . . . 
                . . . 7 . . . . . 
                `)
        }
        LabelText.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 45)
        LabelText2.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 55)
        LabelText3.setPosition(scene.cameraProperty(CameraProperty.X) + 75, scene.cameraProperty(CameraProperty.Y) - 55)
    } else if (RunningLevel == 5) {
        LabelText3.setText("")
        if (HiddenScore == 10 && temp5 == 0) {
            sprites.destroy(LabelText3)
            LabelText3 = textsprite.create("", 1, 7)
            LabelText3.setBorder(1, 3, 1)
            temp5 = 1
        } else if (HiddenScore == 10) {
            LabelText3.setPosition(scene.cameraProperty(CameraProperty.X) + 50, scene.cameraProperty(CameraProperty.Y) - 55)
        } else {
            LabelText3.setPosition(scene.cameraProperty(CameraProperty.X) + 55, scene.cameraProperty(CameraProperty.Y) - 55)
        }
        LabelText.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 45)
        LabelText2.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 55)
        LabelText3.setText("" + HiddenScore + "/10")
    }
})
game.onUpdateInterval(500, function () {
    if (temp2 == 0) {
        dialogButtonUI.setFlag(SpriteFlag.Invisible, true)
    }
})
game.onUpdateInterval(100, function () {
    temp2 = 0
})
